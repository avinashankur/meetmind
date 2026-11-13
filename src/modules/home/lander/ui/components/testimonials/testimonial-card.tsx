import { Box, Link2, Sun, type LucideIcon } from "lucide-react";

import type { Testimonial, TestimonialIcon } from "../../../constants";

const contextIcons: Record<TestimonialIcon, LucideIcon> = {
  link: Link2,
  box: Box,
  sun: Sun,
};

export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  const Icon = contextIcons[testimonial.icon];

  return (
    <figure className="flex w-full flex-col rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 lg:min-h-104">
      <div className="flex justify-end">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
          <Icon aria-hidden="true" className="size-3.5 flex-none" />
          {testimonial.context}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="font-playfair mt-8 mb-2.5 text-5xl leading-none font-semibold text-blue-600"
      >
        &ldquo;
      </span>
      <blockquote className="font-tight max-w-xs text-xl leading-tight font-medium tracking-tight text-slate-900 xl:text-2xl">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-auto border-t border-slate-200 pt-5">
        <b className="font-tight block text-sm font-semibold text-slate-900">
          {testimonial.name}
        </b>
        <small className="mt-1 block text-sm text-slate-400">
          {testimonial.role}
        </small>
        <small className="mt-1 block text-sm text-slate-400">
          {testimonial.location}
        </small>
      </figcaption>
    </figure>
  );
};
