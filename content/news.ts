import type { Messages } from "@/lib/messages";

export type NewsId = keyof Messages["news"]["items"];

type IsoDate = `${number}-${number}-${number}`;

type NewsItem = {
  id: NewsId;
  accent: "curve" | "steps" | "signal";
  dateTime: IsoDate;
};

export const newsItems = [
  { id: "community-guide", accent: "curve", dateTime: "2026-09-10" },
  { id: "tournament-piece", accent: "steps", dateTime: "2026-09-12" },
  { id: "beyond-cv", accent: "signal", dateTime: "2026-09-14" },
] as const satisfies ReadonlyArray<NewsItem>;
