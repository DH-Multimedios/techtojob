import type { Messages } from "@/lib/messages";

export type TestimonialId = keyof Messages["testimonials"]["items"];

type Testimonial = {
  id: TestimonialId;
  avatarVariant: "north" | "east" | "south" | "west";
  profileUrl?: string | null;
};

export const testimonials = [
  { id: "pending-01", avatarVariant: "north", profileUrl: null },
  { id: "pending-02", avatarVariant: "east", profileUrl: null },
  { id: "pending-03", avatarVariant: "south", profileUrl: null },
  { id: "pending-04", avatarVariant: "west", profileUrl: null },
] as const satisfies ReadonlyArray<Testimonial>;
