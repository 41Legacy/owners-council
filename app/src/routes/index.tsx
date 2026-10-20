import { createFileRoute } from "@tanstack/react-router";

import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { CopyIntro } from "@/components/site/copy-intro";
import { ChapterInlineCta, InviteCta } from "@/components/site/ctas";
import { ChapterForm, InvitationForm } from "@/components/site/forms";
import { prefillAndScroll } from "@/components/site/prefill";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  component: Index,
});

const facts = [
  { label: "Who it is for", value: "Owner-operators of established companies, generally $1M to $25M in revenue" },
  { label: "What it is", value: "A council of 10 to 12 owners per chapter, meeting in person" },
  { label: "What it costs", value: "Nothing to buy and nothing to sign. Membership is by invitation" },
  { label: "Who runs it", value: "Hosted by a trusted local advisor, designed and facilitated by 41 Legacy" },
];

const tracks = [
  {
    name: "Market education",
    text: "What buyers, lenders and investors look for, what businesses like yours are worth, and how the market is moving in your industry.",
  },
  {
    name: "Growth strategy",
    text: "Pricing, cash, people and systems: how to grow with less chaos and make the business easier to run.",
  },
  {
    name: "Exit and succession planning",
    text: "Your options, from selling to passing it on, the timing, and what makes a business transferable years before you need it to be.",
  },
];

const ownerSteps = [
  { title: "Request an invitation", text: "Tell us about you, your business and the chapter you would like to join." },
  { title: "A welcome call", text: "The chapter host calls to get to know you and answer your questions." },
  { title: "Take your seat", text: "Join the next session with 10 to 12 fellow owners. Nothing to prepare." },
  { title: "Learn and grow", text: "Sessions, workshops, expert guests and your private reports, all year." },
];

const chapters = [
  {
    name: "Connecticut",
    state: "active" as const,
    status: "Founding chapter",
    detail: "Owner-operators across Connecticut, meeting in person.",
  },
  {
    name: "Greater Boston",
    state: "active" as const,
    status: "Active",
    detail:
      "Serving the Asian business-owner community of greater Boston. Designed and facilitated by 41 Legacy, hosted in partnership with PNC Private Bank.",
  },
  { name: "New York City and Westchester", state: "forming" as const, status: "Forming", detail: "Seeking a founding advisor host." },
  { name: "Northern New Jersey", state: "forming" as const, status: "Forming", detail: "Seeking a founding advisor host." },
  { name: "Rhode Island", state: "forming" as const, status: "Forming", detail: "Seeking a founding advisor host." },
  {
    name: "Central and Western Massachusetts",
    state: "forming" as const,
    status: "Forming",
    detail: "Seeking a founding advisor host.",
  },
  {
    name: "New Hampshire, Vermont and Maine",
    state: "forming" as const,
    status: "Forming",
    detail: "Seeking a founding advisor host.",
  },
];

const hostBenefits = [
  "Give your best clients something valuable that no competitor offers",
  "Become the advisor who brings owners together in your market",
  "Meet the other owners in the room, who come to know and trust you",
  "Nothing to sell, no fee-sharing, no supervision and no compliance exposure",
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
  "Vetted guest speakers and the professional network",
  "The ground rules, the chapter playbook and the follow-through",
];

const hostSteps = [
  { title: "A first conversation", text: "We talk through your client base, your market and whether a chapter fits." },
  { title: "Define the founding seat", text: "Together we write the profile of the owners the room is built for." },
  { title: "A founding working lunch", text: "A few champions fill the seats and choose the first topics." },
  { title: "The first council session", text: "We design and facilitate. You host. Owners leave with something useful." },
];

const faqs = [
  {
    q: "What exactly is The Owners Council?",
    a: "A small, invite-only group of business owners in your area who meet in person to learn from experts and from each other: market education, growth strategy and exit planning, with private reports on your own business.",
  },
  {
    q: "Does it cost anything?",
    a: "There is nothing to buy and nothing to sign. Each chapter's host and partners cover the room and the coffee.",
  },
  {
    q: "Is anyone going to sell me something?",
    a: "No. It is a room for learning, not selling, and that rule covers the host, the guest speakers and 41 Legacy. One-on-one conversations happen only when an owner asks for one.",
  },
  {
    q: "How often does a chapter meet?",
    a: "Chapters meet in person on a regular schedule set with each chapter's members, typically monthly, with CEO workshops and guest sessions through the year.",
  },
  {
    q: "Who should join?",
    a: "Owner-operators of established companies, generally $1M to $25M in annual revenue, who want to grow, reduce the chaos, and plan for what comes next.",
  },
  {
    q: "How do I join an existing chapter?",
    a: "Choose your chapter below and request an invitation. The chapter host will call you personally to welcome you and find you a seat.",
  },
  {
    q: "There is no chapter near me yet. What now?",
    a: "Request an invitation for the closest forming chapter. You will be among the first invited when it opens, and you may know an advisor who would like to host it.",
  },
  {
    q: "I am an advisor. How do I host a chapter?",
    a: "Tell us about your practice in the chapter form. We start with a conversation about your clients and your market. You host, and 41 Legacy designs and runs every session.",
  },
  {
    q: "What is 41 Legacy's role?",
    a: "41 Legacy designs and facilitates every council and is open about the advisory work it does outside of it. The council itself stands apart from that work.",
  },
];

function Index() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <ScrollScrub className="oc-journey" scenes={scrollScrubScenes} theme={scrollScrubTheme} />

        <section aria-labelledby="what-title" className="oc-section" id="what">
          <div className="oc-wrap oc-thesis">
            <div className="oc-thesis__copy">
              <h2 className="oc-h2" id="what-title">
                What is The Owners Council?
              </h2>
              <p className="oc-lede">
                A peer council where business owners learn, plan and grow together. Members make the
                business easier to run, reduce the chaos, get out of the day-to-day, and turn the
                business from a job into an asset.
              </p>
              <dl className="oc-facts">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
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

        <section aria-labelledby="paths-title" className="oc-section oc-section--tint" id="paths">
          <div className="oc-wrap">
            <h2 className="oc-h2" id="paths-title">
              Two ways in.
            </h2>
            <div className="oc-paths">
              <article className="oc-path oc-path--owner">
                <p className="oc-path__who">I own a business</p>
                <h3>Join a chapter.</h3>
                <p>
                  Take a seat with 10 to 12 fellow owners near you. Learn what drives value, plan your
                  growth and your exit, and leave every session with something useful.
                </p>
                <ul>
                  <li>Market education, strategy and exit planning</li>
                  <li>Private reports on your own business</li>
                  <li>CEO workshops and expert guest speakers</li>
                  <li>Access to trusted professionals when you need them</li>
                </ul>
                <div className="oc-path__actions">
                  <InviteCta />
                  <a className="cta-text" href="#chapters">
                    See the chapters
                  </a>
                </div>
              </article>
              <article className="oc-path oc-path--advisor">
                <p className="oc-path__who">I advise business owners</p>
                <h3>Host a chapter.</h3>
                <p>
                  CPAs, attorneys, bankers and advisors: bring the council to your clients. You host,
                  41 Legacy designs and runs every session.
                </p>
                <ul>
                  {hostBenefits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="oc-path__actions">
                  <ChapterInlineCta />
                  <a className="cta-text" href="#advisors">
                    How hosting works
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section aria-labelledby="members-title" className="oc-section" id="members">
          <div className="oc-wrap">
            <h2 className="oc-h2" id="members-title">
              What members gain.
            </h2>
            <p className="oc-lede">
              Three learning tracks run through every chapter, backed by reports, workshops, experts
              and the people in the room.
            </p>
            <ol className="oc-tracks">
              {tracks.map((track, index) => (
                <li key={track.name}>
                  <span aria-hidden="true" className="oc-tracks__num">
                    {index + 1}
                  </span>
                  <h3>{track.name}</h3>
                  <p>{track.text}</p>
                </li>
              ))}
            </ol>
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
                  <h3>Private reports on your business</h3>
                  <p>
                    After key sessions each owner receives a confidential, plain-language read on
                    where the business stands today, what it is worth to the market, and how much
                    growth and change it is ready for next. Yours alone.
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
                  <p>Hands-on working sessions on the decisions members are facing right now.</p>
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
                  <h3>Expert guest speakers</h3>
                  <p>Funding, lending, certifications, valuation, succession and more, here to teach.</p>
                </div>
              </article>
              <article className="oc-bento__cell oc-bento__cell--resources">
                <h3>Access to trusted professionals</h3>
                <p>
                  CPAs, attorneys, bankers, valuation and M&amp;A specialists, plus grant and funding
                  programs. Vetted by the council and introduced only when you ask.
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

        <section aria-labelledby="how-title" className="oc-section oc-section--tint" id="how">
          <div className="oc-wrap">
            <h2 className="oc-h2" id="how-title">
              How joining works.
            </h2>
            <ol className="oc-steps">
              {ownerSteps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true" className="oc-steps__num">
                    {index + 1}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
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
                Find your chapter.
              </h2>
              <p className="oc-lede">
                Join an active chapter, get on the list for one that is forming, or host one for your
                clients. Every chapter runs on the same design and the same ground rules.
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
                  <div className="oc-chapter__body">
                    <div className="oc-chapter__top">
                      <h3>{chapter.name}</h3>
                      <span className="oc-chapter__status">{chapter.status}</span>
                    </div>
                    <p>{chapter.detail}</p>
                    <div className="oc-chapter__actions">
                      <button
                        className="cta-join"
                        onClick={() => prefillAndScroll("owner", chapter.name)}
                        type="button"
                      >
                        {chapter.state === "active" ? "Join this chapter" : "Join the waitlist"}
                      </button>
                      {chapter.state === "forming" ? (
                        <button
                          className="cta-host"
                          onClick={() => prefillAndScroll("advisor", chapter.name)}
                          type="button"
                        >
                          Host this chapter
                        </button>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="advisors-title" className="oc-section oc-section--tint" id="advisors">
          <div className="oc-wrap">
            <p className="oc-eyebrow">For CPAs, attorneys, bankers and advisors</p>
            <h2 className="oc-h2" id="advisors-title">
              Host a chapter for your clients.
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
              {hostSteps.map((step, index) => (
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
                <h3 className="oc-h3">Host a chapter with Mike.</h3>
                <p className="oc-form-intro">
                  Tell us about your practice and the owners you serve. The first step is a
                  conversation, not a contract.
                </p>
                <ChapterForm />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="oc-section" id="faq">
          <div className="oc-wrap oc-faq">
            <h2 className="oc-h2" id="faq-title">
              Questions owners and advisors ask.
            </h2>
            <div className="oc-faq__list">
              {faqs.map((item) => (
                <details className="oc-faq__item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="invitation-title" className="oc-section oc-section--tint" id="invitation">
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
                Choose the chapter you would like to join, or the closest forming chapter. The chapter
                host will call you personally to welcome you.
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
