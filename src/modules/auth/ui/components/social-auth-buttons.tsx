import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

import { SOCIAL_DIVIDER_LABEL } from "@/modules/auth/constants";
import { SocialButton } from "../social-button";

interface SocialAuthButtonsProps {
  disabled?: boolean;
}

/** Google + GitHub buttons and the divider above the email form. */
export const SocialAuthButtons = ({ disabled }: SocialAuthButtonsProps) => (
  <>
    <div className="grid grid-cols-2 gap-3">
      <SocialButton provider="google" disabled={disabled}>
        <SiGoogle className="size-4" aria-hidden="true" />
        <span>Google</span>
      </SocialButton>
      <SocialButton provider="github" disabled={disabled}>
        <SiGithub className="size-4" aria-hidden="true" />
        <span>GitHub</span>
      </SocialButton>
    </div>

    <div className="my-4 flex items-center gap-3 text-xs text-slate-400">
      <span className="h-px flex-1 bg-slate-200" />
      {SOCIAL_DIVIDER_LABEL}
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  </>
);
