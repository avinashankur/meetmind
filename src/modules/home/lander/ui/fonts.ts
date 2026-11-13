import {
  Caveat,
  DM_Mono,
  Inter_Tight,
  Playfair_Display,
} from "next/font/google";

// Landing typefaces. Scoped to the landing root and the auth layout (which
// shares the landing look) so dashboard routes don't download them. Inter and Instrument Serif come from the root layout.

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--lp-font-tight",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--lp-font-playfair",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: "600",
  variable: "--lp-font-hand",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--lp-font-mono",
});

export const landingFontVariables = [
  interTight.variable,
  playfair.variable,
  caveat.variable,
  dmMono.variable,
].join(" ");
