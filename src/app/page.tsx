import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/lander/ui/views/home-view";

export const metadata: Metadata = {
  title: "MeetMind | Create Custom AI Agents That Join Your Video Calls",
  description:
    "Build custom AI agents with your own prompts and guidelines. Send them into video calls to follow your instructions and answer questions in chat.",
};

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/meetings");
  }

  return <HomeView />;
}
