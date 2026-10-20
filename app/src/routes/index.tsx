import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { CopyIntro } from "@/components/site/copy-intro";
import { ChapterInlineCta } from "@/components/site/ctas";
import { ChapterForm, InvitationForm } from "@/components/site/forms";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  component: Index,
});

const pillars = [
  {
    name: "Education",
    text: "Practical, plain-language sessions on what owners care about most: cash, people, growth, funding, and building something that lasts.",
  },
  {
    name: "Community",
    text: "Owners who sit in the same seat, sharing wins, lessons and encouragement in a room built on trust.",
  },
  {
    name: "Resources",
    text: "A trusted network of specialists, programs and funding paths, ready whenever an owner wants an introduction.",
  },
];

const chapters = [
  {
    name: "Connecticut",
    state: "active" as const,
    status: "Founding chapter",
    detail: "The first council table. Owner-operators across Connecticut, meeting in person.",
  },
  {
    name: "Greater Boston",
    state: "active" as const,
    status: "Active",
    detail:
      "Serving the Asian business-owner community of greater Boston. Designed and facilitated by 41 Legacy, hosted in partnership with PNC Private Bank.",
  },
  {
    name: "New York City and Westchester",
    state: "forming" as const,
    status: "Open for a host",
    detail: "Seeking a founding advisor host.",
  },
  {
    name: "Northern New Jersey",
    state: "forming" as const,
    status: "Open for a host",
    detail: "Seeking a founding advisor host.",
  },
  {
    name: "Rhode Island",
    state: "forming" as const,
    status: "Open for a host",
    detail: "Seeking a founding advisor host.",
  },
  {
    name: "Central and Western Massachusetts",
    state: "forming" as const,
    status: "Open for a host",
    detail: "Seeking a founding advisor host.",
  },
  {
    name: "New Hampshire, Vermont and Maine",
    state: "forming" as const,
    status: "Open for a host",
    detail: "Seeking a founding advisor host.",
  },
];

const youBring = [
  "A trusted relationship with owners worth convening",
  "A room, a table and a standing date on the calendar",
  "Introductions to 10 to 12 owners you would vouch for",
  "A seat at the table as a peer, not a vendor",
];

const weBring = [
  "Session design and facilitation, start to finish",
  "Private walk-away reports for every member",
  "The CEO workshop curriculum",
  "Vetted guest speakers and the resource network",
  "The ground rules, the chapter playbook and the follow-through",
];

const steps = [
  {
    title: "A first conversation",
    text: "We talk through your client base, your market and whether a chapter fits.",
  },
  {
    title: "Define the founding seat",
    text: "Together we write the profile of the owners the room is built for.",
  },
  {
    title: "A founding working lunch",
    text: "A few champions fill the seats and choose the first topics.",
  },
  {
    title: "The first council session",
    text: "We design and facilitate. You host. Owners leave with something useful.",
  },
];

function Index() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <ScrollScrub className="oc-journey" scenes={scrollScrubScenes} theme={scrollScrubTheme} />

        <section aria-labelledby="thesis-title" className="oc-section" id="thesis">
          <div className="oc-wrap oc-thesis">
            <div className="oc-thesis__copy">
              <h2 className="oc-h2" id="thesis-title">
                Built on education and community.
              </h2>
              <p className="oc-lede">
                The council helps owners make the business easier to run, reduce the chaos, get out
                of the day-to-day, and turn the business from a job into an asset. We do it by
                learning together, three ways.
              </p>
              <ul className="oc-pillars">
                {pillars.map((pillar) => (
                  <li key={pillar.name}>
                    <h3>{pillar.name}</h3>
                    <p>{pillar.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="oc-thesis__figure">
              <img
                alt="Business owners in conversation around a long table in a brick-walled meeting room at dusk"
                height={1024}
                loading="lazy"
                src="/assets/img/council.webp"
                width={1536}
              />
            </figure>
          </div>
        </section>

        <section aria-labelledby="members-title" className="oc-section oc-section--tint" id="members">
          <div className="oc-wrap">
            <h2 className="oc-h2" id="members-title">
              What members gain.
            </h2>
            <p className="oc-lede">
              Membership is the learning, the insight and the people. Nothing to buy and nothing to
              sign.
            </p>
            <div className="oc-bento">
              <article className="oc-bento__cell oc-bento__cell--report">
                <img
                  alt="A bound private report with an orange tab on a walnut table"
                  height={1600}
                  loading="lazy"
                  src="/assets/img/report.webp"
                  width={1280}
                />
                <div className="oc-bento__copy">
                  <h3>Private walk-away reports</h3>
                  <p>
                    After key sessions each owner receives a confidential, plain-language read on
                    where the business stands today and how much growth and change it is ready for
                    next. Yours alone.
                  </p>
                </div>
              </article>
              <article className="oc-bento__cell oc-bento__cell--workshop">
                <img
                  alt="Owners working through printed worksheets at a large table"
                  height={1024}
                  loading="lazy"
                  src="/assets/img/workshop.webp"
                  width={1536}
                />
                <div className="oc-bento__copy">
                  <h3>CEO workshops</h3>
                  <p>
                    Hands-on working sessions built around what members want to learn next.
                  </p>
                </div>
              </article>
              <article className="oc-bento__cell oc-bento__cell--speaker">
                <img
                  alt="A guest specialist speaking to a small group in a library room"
                  height={1600}
                  loading="lazy"
                  src="/assets/img/speaker.webp"
                  width={1280}
                />
                <div className="oc-bento__copy">
                  <h3>Specialized guest speakers</h3>
                  <p>Experts on funding, certifications, lending, succession and more, here to teach.</p>
                </div>
              </article>
              <article className="oc-bento__cell oc-bento__cell--resources">
                <h3>A resource of resources</h3>
                <p>
                  When an owner needs a specialist, a grant path or a certification, the council
                  knows who to call and makes the introduction.
                </p>
              </article>
              <article className="oc-bento__cell oc-bento__cell--peers">
                <h3>A room of peers</h3>
                <p>
                  Owners cheering each other on, trading what works, and building friendships that
                  last well beyond the meeting. The most valuable thing in the room is the room.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section aria-label="Council ground rule" className="oc-section oc-rule">
          <div className="oc-wrap">
            <figure className="oc-rule__quote">
              <blockquote>
                <p>“This is a room for learning, not selling. Everyone comes to give and to grow.”</p>
              </blockquote>
              <figcaption>Council ground rule, every chapter</figcaption>
            </figure>
            <p className="oc-rule__note">
              41 Legacy designs and facilitates every council and is open about what it does outside
              of it. One-on-one conversations happen only when an owner asks.
            </p>
          </div>
        </section>

        <section aria-labelledby="chapters-title" className="oc-section" id="chapters">
          <div className="oc-wrap oc-chapters">
            <div className="oc-chapters__head">
              <h2 className="oc-h2" id="chapters-title">
                Chapters across New England and the tri-state area.
              </h2>
              <p className="oc-lede">
                Every chapter runs on the same design, the same ground rules and the same standard of
                facilitation. What changes is the room.
              </p>
              <figure className="oc-chapters__figure">
                <img
                  alt="A New England harbor town main street at blue hour"
                  height={900}
                  loading="lazy"
                  src="/assets/img/harbor.webp"
                  width={1600}
                />
              </figure>
            </div>
            <ul className="oc-chapter-list">
              {chapters.map((chapter) => (
                <li className="oc-chapter" data-state={chapter.state} key={chapter.name}>
                  <div>
                    <h3>{chapter.name}</h3>
                    <p>{chapter.detail}</p>
                  </div>
                  <span className="oc-chapter__status">{chapter.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="advisors-title" className="oc-section oc-section--tint" id="advisors">
          <div className="oc-wrap">
            <p className="oc-eyebrow">For CPAs, attorneys, bankers and advisors</p>
            <h2 className="oc-h2" id="advisors-title">
              Bring the council to your clients.
            </h2>
            <p className="oc-lede">
              You already have the relationships. A chapter gives your clients a place to learn and
              connect, and gives you a meaningful reason to bring them together.
            </p>
            <ChapterInlineCta />

            <div className="oc-split">
              <div className="oc-split__col">
                <h3>What you bring</h3>
                <ul>
                  {youBring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="oc-split__col oc-split__col--accent">
                <h3>What 41 Legacy brings</h3>
                <ul>
                  {weBring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <ol className="oc-steps">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true" className="oc-steps__num">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="oc-advisor-tools">
              <div className="oc-question">
                <p className="oc-question__label">One question to start the conversation</p>
                <p className="oc-question__text">
                  “What would make your business easier to run a year from now?”
                </p>
                <p className="oc-question__why">
                  Why it matters: a business that runs well without its owner is easier to grow, easier to
                  finance and worth more to whoever comes next.
                </p>
              </div>
              <CopyIntro />
            </div>

            <div className="oc-advisor-form" id="chapter-form">
              <figure className="oc-advisor-form__figure">
                <img
                  alt="Three advisors planning over coffee by a cafe window"
                  height={1024}
                  loading="lazy"
                  src="/assets/img/advisors.webp"
                  width={1536}
                />
              </figure>
              <div>
                <h3 className="oc-h3">Start a chapter with Mike.</h3>
                <p className="oc-form-intro">
                  Tell us about your practice and the owners you serve. The first step is a
                  conversation, not a contract.
                </p>
                <ChapterForm />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="invitation-title" className="oc-section" id="invitation">
          <div className="oc-wrap oc-invite">
            <div className="oc-invite__copy">
              <h2 className="oc-h2" id="invitation-title">
                Request an invitation.
              </h2>
              <p className="oc-lede">
                Membership is by invitation, ten to twelve owners per chapter, for owner-operators of
                established companies, generally $1M to $25M in annual revenue.
              </p>
              <p className="oc-invite__note">
                Tell us a little about you and your business. We would love to meet you, and the
                chapter host will be in touch personally.
              </p>
            </div>
            <InvitationForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
