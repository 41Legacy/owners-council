/**
 * Single source of truth for chapters. Used by the chapter list, both form
 * dropdowns and GHL routing. To activate a chapter, change its status here.
 */
export type ChapterStatus = "founding" | "active" | "open";

export type Chapter = { name: string; area: string; status: ChapterStatus; note?: string };

export type ChapterGroup = { state: string; chapters: Chapter[] };

export const CHAPTER_GROUPS: ChapterGroup[] = [
  {
    state: "Connecticut",
    chapters: [
      { name: "Middlesex County, CT", area: "Middletown, Old Saybrook and the Connecticut River Valley", status: "founding" },
      { name: "New Haven County, CT", area: "New Haven, Milford, Wallingford and the shoreline", status: "open" },
      { name: "Hartford County, CT", area: "Hartford, West Hartford, Glastonbury and Farmington", status: "open" },
      { name: "Fairfield County, CT", area: "Stamford, Norwalk, Westport and Danbury", status: "open" },
      { name: "New London County, CT", area: "New London, Norwich, Mystic and the eastern shore", status: "open" },
      { name: "Litchfield County, CT", area: "Torrington, Litchfield and the Northwest Hills", status: "open" },
      { name: "Tolland and Windham Counties, CT", area: "Vernon, Storrs and the Quiet Corner", status: "open" },
    ],
  },
  {
    state: "Massachusetts",
    chapters: [
      {
        name: "Greater Boston: Asian Business Owners",
        area: "Serving the Asian business-owner community of greater Boston",
        status: "active",
        note: "Designed and facilitated by 41 Legacy, hosted in partnership with PNC Private Bank.",
      },
      { name: "Boston Metro West", area: "Newton, Waltham, Framingham and the Route 128 corridor", status: "open" },
      { name: "Boston North Shore", area: "Salem, Peabody, Beverly and Burlington", status: "open" },
      { name: "Boston South Shore", area: "Quincy, Braintree, Hingham and Plymouth", status: "open" },
      { name: "Central Massachusetts", area: "Worcester and the surrounding region", status: "open" },
      { name: "Western Massachusetts", area: "Springfield and the Pioneer Valley", status: "open" },
      { name: "Southeastern Massachusetts and the Cape", area: "New Bedford, Fall River and Cape Cod", status: "open" },
    ],
  },
  {
    state: "Rhode Island",
    chapters: [
      { name: "Providence Metro, RI", area: "Providence, Cranston, Warwick and Pawtucket", status: "open" },
      { name: "Newport and South County, RI", area: "Newport, Narragansett and Westerly", status: "open" },
    ],
  },
  {
    state: "New York",
    chapters: [
      { name: "Manhattan, NY", area: "New York City owner-operators", status: "open" },
      { name: "Westchester County, NY", area: "White Plains, Yonkers and the Sound Shore", status: "open" },
      { name: "Long Island: Nassau County", area: "Garden City, Mineola and the North Shore", status: "open" },
      { name: "Long Island: Suffolk County", area: "Melville, Hauppauge and the East End", status: "open" },
      { name: "Hudson Valley, NY", area: "Poughkeepsie, Newburgh and Kingston", status: "open" },
    ],
  },
  {
    state: "New Jersey",
    chapters: [
      { name: "Bergen and Passaic Counties, NJ", area: "Hackensack, Paramus and Wayne", status: "open" },
      { name: "Essex and Morris Counties, NJ", area: "Morristown, Livingston and Montclair", status: "open" },
      { name: "Middlesex and Monmouth Counties, NJ", area: "New Brunswick, Edison and Red Bank", status: "open" },
    ],
  },
  {
    state: "Northern New England",
    chapters: [
      { name: "Southern New Hampshire", area: "Manchester, Nashua and Concord", status: "open" },
      { name: "New Hampshire Seacoast", area: "Portsmouth and the Seacoast", status: "open" },
      { name: "Southern Maine", area: "Portland and the southern coast", status: "open" },
      { name: "Vermont", area: "Burlington and Chittenden County", status: "open" },
    ],
  },
];

export const ALL_CHAPTERS: Chapter[] = CHAPTER_GROUPS.flatMap((g) => g.chapters);

export const ACTIVE_CHAPTER_NAMES: string[] = ALL_CHAPTERS.filter((c) => c.status !== "open").map((c) => c.name);

export const OTHER_AREA = "Somewhere else";

export function isActiveChapter(name: string): boolean {
  return ACTIVE_CHAPTER_NAMES.includes(name);
}
