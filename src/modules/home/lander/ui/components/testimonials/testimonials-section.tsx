import { ArrowLeft, ArrowRight } from "lucide-react";

import { TESTIMONIALS } from "../../../constants";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { SectionHeader, TitleAccent } from "../section-header";
import { TestimonialCard } from "./testimonial-card";

/** Decorative carousel arrows — all testimonials are visible at once. */
const CarouselArrows = () => (
  <div aria-hidden="true" className="flex gap-2.5 lg:pb-1.5">
    <span className="grid size-11 place-items-center rounded-full bg-slate-500 text-white">
      <ArrowLeft className="size-4" />
    </span>
    <span className="grid size-11 place-items-center rounded-full bg-zinc-900 text-white">
      <ArrowRight className="size-4" />
    </span>
  </div>
);

export const TestimonialsSection = () => (
  <section id="reviews" className="py-20 lg:py-32">
    <SectionHeader
      label="Teams running custom meeting agents"
      title={
        <>
          What teams say <TitleAccent>after</TitleAccent> their first call
        </>
      }
      aside={<CarouselArrows />}
    />
    <RevealGroup className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {TESTIMONIALS.map((testimonial) => (
        <RevealItem key={testimonial.name} className="flex">
          <TestimonialCard testimonial={testimonial} />
        </RevealItem>
      ))}
    </RevealGroup>
  </section>
);
