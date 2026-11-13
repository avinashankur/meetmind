import { TESTIMONIALS } from "../../../constants";
import { RevealGroup, RevealItem } from "../motion/reveal";
import { SectionHeader, TitleAccent } from "../section-header";
import { TestimonialCard } from "./testimonial-card";

export const TestimonialsSection = () => (
  <section id="reviews" className="py-20 lg:py-32">
    <SectionHeader
      label="Teams running custom meeting agents"
      title={
        <>
          What teams say <TitleAccent>after</TitleAccent> their first call
        </>
      }
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
