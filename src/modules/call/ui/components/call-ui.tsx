import { CallingState, StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnd } from "./call-end";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();

  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) {
      setShow("ended");
      return;
    }

    const isAlreadyLeft = call.state.callingState === CallingState.LEFT;
    const isEnded = Boolean(call.state.endedAt);

    if (!isAlreadyLeft && !isEnded) {
      try {
        await call.endCall();
      } catch (error) {
        console.warn("Failed to end call cleanly:", error);
      }
    }

    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnd />}
    </StreamTheme>
  );
};
