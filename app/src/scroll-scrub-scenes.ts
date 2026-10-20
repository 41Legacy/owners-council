/**
 * Scene data for the scroll-scrub journey. Single-shot film, split into four
 * contiguous segments so each chapter owns a slice of the same continuous move.
 * Every poster is the exact first frame of its encoded clip.
 */
import { createElement } from "react";

import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
import { ChapterCta, InviteCta } from "@/components/site/ctas";

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
  createElement(ChapterCta),
);

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    actions: openingActions,
    body: "A welcoming circle of business owners who meet to learn, share what works, and build stronger companies side by side.",
    clip: "/assets/world/scene-01.mp4",
    id: "the-seat",
    kicker: "The Owners Council",
    label: "Welcome",
    mobileClip: "/assets/world/scene-01-mobile.mp4",
    mobilePoster: "/assets/world/scene-01-mobile-poster.png",
    poster: "/assets/world/scene-01-poster.png",
    scroll: 1.3,
    title: "Where owners learn and grow together.",
  },
  {
    align: "right",
    body: "Ten to twelve owners per chapter, meeting in person. Real conversations, practical learning, and no sales pitches.",
    clip: "/assets/world/scene-02.mp4",
    id: "the-room",
    label: "The table",
    mobileClip: "/assets/world/scene-02-mobile.mp4",
    mobilePoster: "/assets/world/scene-02-mobile-poster.png",
    poster: "/assets/world/scene-02-poster.png",
    tags: ["Invite only", "Peer community"],
    title: "A seat at the table for you.",
  },
  {
    body: "Members leave with fresh ideas and private, plain-language reports on what their business can take on next.",
    clip: "/assets/world/scene-03.mp4",
    id: "the-clarity",
    label: "The learning",
    mobileClip: "/assets/world/scene-03-mobile.mp4",
    mobilePoster: "/assets/world/scene-03-mobile-poster.png",
    poster: "/assets/world/scene-03-poster.png",
    tags: ["Private reports", "CEO workshops"],
    title: "Learning you can use on Monday.",
  },
  {
    actions: closingActions,
    align: "right",
    body: "Chapters across the tri-state area and New England, each hosted with a trusted local advisor.",
    clip: "/assets/world/scene-04.mp4",
    id: "the-chapters",
    label: "The chapters",
    mobileClip: "/assets/world/scene-04-mobile.mp4",
    mobilePoster: "/assets/world/scene-04-mobile-poster.png",
    poster: "/assets/world/scene-04-poster.png",
    title: "Growing across New England.",
  },
];
