import { ABOUT_QUOTE, ABOUT_STATS } from "../../../constants";
import { CountUp } from "../motion/count-up";

/** Customer testimonial: quote first, author and a supporting stat below. */
export const AboutQuoteTile = () => (
  <figure className="flex w-full flex-col rounded-3xl border border-slate-200 bg-white p-6 max-lg:min-h-80">
    <span
      aria-hidden="true"
      className="font-playfair text-7xl leading-none font-semibold text-blue-600"
    >
      &ldquo;
    </span>

    <blockquote className="font-tight my-auto py-6 text-xl leading-snug font-medium tracking-tight text-slate-900">
      {ABOUT_QUOTE.lead}{" "}
      <em className="font-playfair font-medium tracking-normal text-blue-600 italic">
        {ABOUT_QUOTE.accent}
      </em>
    </blockquote>

    <figcaption className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-linear-to-br from-blue-400 to-blue-600 text-sm font-semibold text-white">
          {ABOUT_QUOTE.initials}
        </span>
        <div>
          <b className="font-tight block text-sm font-semibold text-slate-900">
            {ABOUT_QUOTE.name}
          </b>
          <small className="block text-xs text-slate-500">
            {ABOUT_QUOTE.role}
          </small>
        </div>
      </div>
      <div className="text-right">
        <b className="font-tight block text-2xl leading-none font-semibold tracking-tight text-slate-900">
          <CountUp {...ABOUT_STATS.accuracy} />
        </b>
        <small className="text-xs whitespace-nowrap text-slate-500">
          speakers identified
        </small>
      </div>
    </figcaption>
  </figure>
);
