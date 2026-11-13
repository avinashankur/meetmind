import Link from "next/link";

import { FOOTER_LINK_GROUPS } from "../../constants";
import { BrandLogo } from "./brand-logo";
import { FrameWrap } from "./frame-guides";

export const FooterLanding = () => (
  <footer className="pt-20 pb-8">
    <FrameWrap className="grid grid-cols-2 gap-8 lg:grid-cols-5">
      <div className="col-span-2 lg:col-span-2">
        <BrandLogo
          tone="dark"
          size={20}
          wordmarkClassName="text-sm text-slate-900"
        />
        <p className="mt-3 max-w-sm text-sm text-slate-500">
          Create custom AI agents with your own instructions that join your
          video calls — listening live, executing guidelines, and answering
          post-call questions.
        </p>
      </div>

      {FOOTER_LINK_GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="font-tight mb-3.5 text-sm font-semibold text-slate-900">
            {group.title}
          </h3>
          <ul>
            {group.links.map((link) => {
              const isExternal = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block py-1 text-sm text-slate-500 hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </FrameWrap>

    <FrameWrap className="mt-12 text-sm text-slate-400">
      © {new Date().getFullYear()} MeetMind. All rights reserved.
    </FrameWrap>
  </footer>
);
