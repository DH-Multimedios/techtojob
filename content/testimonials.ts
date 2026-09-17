import type { Messages } from "@/lib/messages";

export type TestimonialId = keyof Messages["testimonials"]["items"];

type Testimonial = {
  id: TestimonialId;
  profileUrl?: string | null;
};

export const testimonials = [
  { id: "pending-01", profileUrl: null },
  { id: "pending-02", profileUrl: null },
  { id: "pending-03", profileUrl: null },
  { id: "pending-04", profileUrl: null },
] as const satisfies ReadonlyArray<Testimonial>;
