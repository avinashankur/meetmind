import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockCallEnd = vi.fn().mockResolvedValue({});
const mockCall = vi.fn().mockReturnValue({
  end: mockCallEnd,
});
const mockVerifyWebhook = vi.fn();
const mockConnectOpenAi = vi.fn();

vi.mock("@/lib/stream-video", () => ({
  streamVideo: {
    verifyWebhook: (...args: unknown[]) => mockVerifyWebhook(...args),
    video: {
      call: (...args: unknown[]) => mockCall(...args),
      connectOpenAi: (...args: unknown[]) => mockConnectOpenAi(...args),
    },
  },
}));

const mockWhere = vi.fn();
const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
const mockSelect = vi.fn().mockReturnValue({ from: mockFrom });

vi.mock("@/db", () => ({
  db: {
    select: () => mockSelect(),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([]),
      }),
    }),
  },
}));

vi.mock("@/inngest/client", () => ({
  inngest: {
    send: vi.fn(),
  },
}));

vi.mock("@/lib/stream-chat", () => ({
  streamChat: {},
}));

vi.mock("openai", () => {
  return {
    default: class OpenAI {
      chat = {
        completions: {
          create: vi.fn(),
        },
      };
    },
  };
});

// Import POST handler after mocks are set up
import { POST } from "../route";

describe("Webhook POST handler - call.session_participant_left", () => {
  const meetingId = "meeting-123";
  const hostUserId = "host-user-456";
  const agentUserId = "agent-user-789";
  const guestUserId = "guest-user-999";

  const fakeMeeting = {
    id: meetingId,
    userId: hostUserId,
    agentId: agentUserId,
    status: "active",
  };

  const createRequest = (
    body: Record<string, unknown>,
    validSignature = true,
  ) => {
    mockVerifyWebhook.mockReturnValue(validSignature);
    return new NextRequest("http://localhost:3000/api/webhook", {
      method: "POST",
      headers: {
        "x-signature": validSignature ? "valid-sig" : "invalid-sig",
        "x-api-key": "stream-api-key",
      },
      body: JSON.stringify(body),
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockCallEnd.mockResolvedValue({});
    mockCall.mockReturnValue({ end: mockCallEnd });
    mockWhere.mockResolvedValue([fakeMeeting]);
  });

  it("ends the call when the host leaves", async () => {
    const req = createRequest({
      type: "call.session_participant_left",
      call_cid: `default:${meetingId}`,
      participant: {
        user: { id: hostUserId },
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockCall).toHaveBeenCalledWith("default", meetingId);
    expect(mockCallEnd).toHaveBeenCalledTimes(1);
  });

  it("does not end the call and logs when the Agent leaves", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const req = createRequest({
      type: "call.session_participant_left",
      call_cid: `default:${meetingId}`,
      reason: "connection_dropped",
      participant: {
        user: { id: agentUserId },
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockCallEnd).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
    const loggedMessage = warnSpy.mock.calls.flat().join(" ");
    expect(loggedMessage).toContain(agentUserId);
    expect(loggedMessage).toContain(meetingId);

    warnSpy.mockRestore();
  });

  it("does not end the call when another participant leaves", async () => {
    const req = createRequest({
      type: "call.session_participant_left",
      call_cid: `default:${meetingId}`,
      participant: {
        user: { id: guestUserId },
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockCallEnd).not.toHaveBeenCalled();
  });

  it("does not end the call and responds safely when the Meeting is not found", async () => {
    mockWhere.mockResolvedValue([]);

    const req = createRequest({
      type: "call.session_participant_left",
      call_cid: `default:${meetingId}`,
      participant: {
        user: { id: hostUserId },
      },
    });

    const res = await POST(req);

    expect(res.status).toBeLessThan(500);
    expect(mockCallEnd).not.toHaveBeenCalled();
  });

  it("returns 401 and ends nothing when the signature is invalid", async () => {
    const req = createRequest(
      {
        type: "call.session_participant_left",
        call_cid: `default:${meetingId}`,
        participant: {
          user: { id: hostUserId },
        },
      },
      false, // invalid signature
    );

    const res = await POST(req);

    expect(res.status).toBe(401);
    expect(mockCallEnd).not.toHaveBeenCalled();
  });

  it("passes model: gpt-realtime when connecting agent on call.session_started", async () => {
    const fakeAgent = {
      id: agentUserId,
      instructions: "Be helpful",
    };

    // First query is for meeting, second query is for agent
    mockWhere
      .mockResolvedValueOnce([fakeMeeting])
      .mockResolvedValueOnce([fakeAgent]);

    const mockUpdateSession = vi.fn();
    mockConnectOpenAi.mockResolvedValue({
      updateSession: mockUpdateSession,
    });

    const req = createRequest({
      type: "call.session_started",
      call: {
        custom: {
          meetingId,
        },
      },
    });

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(mockConnectOpenAi).toHaveBeenCalledWith(
      expect.objectContaining({
        agentUserId,
        model: "gpt-realtime",
      }),
    );
    expect(mockUpdateSession).toHaveBeenCalledWith({
      instructions: fakeAgent.instructions,
    });
  });
});
