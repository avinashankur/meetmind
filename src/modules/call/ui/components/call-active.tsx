"use client";

import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";
import "@stream-io/video-react-sdk/dist/css/styles.css"; // Ensure styles are imported

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-zinc-950 text-white">
      {/* --- Header Overlay --- */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 flex w-full items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-6 py-4">
        {/* Logo & Home Link (Pointer events enabled for this child) */}
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl bg-white/10 p-2.5 backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={20}
              height={20}
              className="opacity-90"
            />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold tracking-wide text-white/95">
              {meetingName}
            </h1>
            <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Video Area --- */}
      <main className="flex h-screen w-full items-center justify-center">
        <div className="flex-1">
          {/* SpeakerLayout automatically manages the grid of participants */}
          <SpeakerLayout participantsBarPosition="bottom" />
        </div>
      </main>

      {/* --- Footer Controls --- */}
      <div className="pointer-events-none absolute right-0 bottom-8 left-0 z-20 flex justify-center">
        <div className="pointer-events-auto rounded-full border border-white/10 bg-zinc-900/90 px-2 py-1.5 shadow-2xl backdrop-blur-lg">
          <CallControls onLeave={onLeave} />
        </div>
      </div>
    </div>
  );
};
