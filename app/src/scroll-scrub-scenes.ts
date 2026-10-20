/**
 * Scene data for the scroll-scrub journey. Single-shot film, split into four
 * contiguous segments so each chapter owns a slice of the same continuous move.
 * Every poster is the exact first frame of its encoded clip.
 */
import { createElement } from "react";

import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
import { ChapterCta, FindChapterCta, InviteCta } from "@/components/site/ctas";

export const SITE_THEME_COLOR = "#111111";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#E9702D",
  background: "#111111",
  ink: "#FFFFFF",
  muted: "#D6D6D6",
};

const openingActions = createElement(
  "div",
  { className: "oc-hero-actions" },
  createElement(InviteCta),
  createElement(ChapterCta),
);

const closingActions = createElement(
  "div",
  { className: "oc-hero-actions" },
  createElement(FindChapterCta),
  createElement(ChapterCta),
);

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    actions: openingActions,
    body: "Owners of established companies meet in small local chapters to learn growth strategy, market trends and exit planning, from experts and from each other.",
    clip: "/assets/world/scene-01.mp4",
    id: "the-seat",
    kicker: "The Owners Council",
    label: "Welcome",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 1.3,
    title: "A peer council for business owners.",
  },
  {
    align: "right",
    body: "Ten to twelve owners per chapter, meeting in person, hosted by a trusted local advisor. Nothing to buy, and nothing is sold in the room.",
    clip: "/assets/world/scene-02.mp4",
    id: "the-room",
    label: "The table",
    mobileClip: "/assets/world/scene-02-mobile.mp4",
    mobilePoster: "/assets/world/scene-02-mobile-poster.png",
    poster: "/assets/world/scene-02-poster.png",
    tags: ["Invite only", "Nothing to buy"],
    title: "Small rooms. Real conversations.",
  },
  {
    body: "Market education, strategy and exit planning, plus private reports on your business, CEO workshops and expert guest speakers.",
    clip: "/assets/world/scene-03.mp4",
    id: "the-clarity",
    label: "The learning",
    mobileClip: "/assets/world/scene-03-mobile.mp4",
    mobilePoster: "/assets/world/scene-03-mobile-poster.png",
    poster: "/assets/world/scene-03-poster.png",
    tags: ["Private reports", "CEO workshops", "Guest experts"],
    title: "Leave every session with something useful.",
  },
  {
    actions: closingActions,
    align: "right",
    body: "Active in Connecticut and Greater Boston, with new chapters forming across New England and the tri-state area.",
    clip: "/assets/world/scene-04.mp4",
    id: "the-chapters",
    label: "The chapters",
    mobileClip: "/assets/world/scene-04-mobile.mp4",
    mobilePoster: "/assets/world/scene-04-mobile-poster.png",
    poster: "/assets/world/scene-04-poster.png",
    title: "Join a chapter near you, or host one.",
  },
];
