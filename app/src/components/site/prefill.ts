/**
 * Chapter buttons prefill the right form's region and scroll to it.
 * Only ever called from click handlers, so it is SSR-safe.
 */
export type PrefillTarget = "owner" | "advisor";

export const PREFILL_EVENT = "oc:prefill";

export type PrefillDetail = { target: PrefillTarget; region: string };

export function prefillAndScroll(target: PrefillTarget, region: string) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { target, region } }));
  const anchor = target === "owner" ? "invitation" : "chapter-form";
  document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
