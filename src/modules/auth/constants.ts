// Copy and routes for the sign-in and sign-up pages. Components stay
// presentational; edit wording here.

/** Where every successful sign-in or sign-up lands, including OAuth. */
export const AUTH_REDIRECT = "/meetings";

export const AUTH_ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

export const AUTH_NAV = {
  backHome: "Back to home",
} as const;

export interface AuthPageCopy {
  /** Heading text before the italic accent word. */
  title: string;
  titleAccent: string;
  description: string;
  submit: string;
  switchPrompt: string;
  switchAction: string;
}

export const SIGN_IN_COPY: AuthPageCopy = {
  title: "Welcome",
  titleAccent: "back.",
  description: "Sign in to get back to your meetings and agents.",
  submit: "Sign in",
  switchPrompt: "New to MeetMind?",
  switchAction: "Create an account",
};

export const SIGN_UP_COPY: AuthPageCopy = {
  title: "Create your",
  titleAccent: "account.",
  description: "Free to start, no credit card required.",
  submit: "Create account",
  switchPrompt: "Already have an account?",
  switchAction: "Sign in",
};

export const MIN_PASSWORD_LENGTH = 8;

export const SOCIAL_DIVIDER_LABEL = "or";
