---
project: DataDoodles — The 30-Day Findable Site
type: single-page landing site
stack: Astro 7 (SSR, Node adapter) + TypeScript + vanilla CSS
design-system: Precision Geo (adapted)
status: ready to build
---

# DataDoodles — Landing Page Build Spec

This file is the single source of truth. Build from it exactly. Where this file and your own instincts disagree, this file wins.

---

## 0. Agent setup — do this before writing any code

Install the three design skills, then run the init flow. Do not skip this step; it is the difference between a page that ships and a page that looks AI-generated.

```bash
# From the project root

# 1. Impeccable — design language + 23 commands (/polish, /audit, /critique)
npx impeccable install
# then, inside Claude Code:
#   /impeccable init

# Alternative install if the above fails:
#   /plugin marketplace add pbakaus/impeccable
# Source: https://github.com/pbakaus/impeccable  ·  Docs: https://impeccable.style

# 2. Emil Kowalski design-engineering skill — motion, easing, micro-interaction craft
npx -y skills add emilkowalski/skill --agent claude-code

# Alternative (Vercel Labs mirror):
#   npx skills add https://github.com/vercel-labs/open-agents --skill emil-design-eng

# 3. Taste — final quality pass, strips generic AI aesthetics
curl -sL 'https://leadgenjay.com/api/skills/install.sh?items=taste' | bash
```

> **Vet before you install.** These are community skills, not official Anthropic ones. Read the SKILL.md files after install the same way you'd read any dependency. If a command in this file has drifted, check the source repo — these move fast.

### Order of operations

1. Run `/impeccable init`. When it asks for design context, feed it Sections 1–3 of this file verbatim. Let it write `PRODUCT.md` and `DESIGN.md`.
2. Build the page section by section, following Section 6.
3. Run `/impeccable audit` on the full page. Fix everything it flags.
4. Invoke the **Emil Kowalski** skill on every animated element. Every transition must justify its duration and easing curve. Anything over 300ms on a UI interaction gets cut or shortened.
5. Run **Taste** as the final pass. If it flags a section as generic, rebuild that section — don't patch it.
6. Run `/impeccable polish` last. Ship.

---

## 1. Brief

**DataDoodles** rebuilds Malaysian SME websites so they get found in Google *and* in AI search — ChatGPT, Perplexity, Gemini, AI Overviews.

**Audience.** Malaysian business owners, 30–55, running RM500k–RM10m revenue businesses. Clinics, law firms, professional services, education, specialist trades. They already have customers and reviews. They are reading this on a phone, on mobile data, between two other things.

**The page's single job.** Get a four-field form submission for a quote. "Get your quote" is the one and only CTA — every button and link on the page leads here, worded identically everywhere.

**Why this page must be excellent.** The site sells web design. It is the product demo. If it doesn't visibly outclass what the visitor currently has, the offer collapses on contact.

---

## 2. Brand personality

Serious about outcomes, unserious about itself.

DataDoodles publishes its prices, refuses to guarantee rankings, and disqualifies bad-fit clients on the page. It is the specialist who takes something intimidating — AI search, schema, entity structure — and sketches it out on the table until a clinic owner actually gets it.

**Rigorous data, drawn by hand.** Data is the substance. Doodles are the delivery.

This resolves the brand name: the underlying page is a precision instrument; a thin layer of hand-drawn marks in Signal Red sits on top, like a consultant marking up a report in front of you. That annotation layer is the *only* place the brand gets playful.

---

## 3. Anti-brief — reject on sight

Do not produce any of the following. If the page drifts toward one, stop and rebuild.

- Dark hero with a purple-to-blue gradient glow
- Floating 3D shapes, abstract blobs, glassmorphism
- Warm cream background + high-contrast serif + terracotta accent (the current AI-design default)
- Cards nested inside cards
- Gray text on colored backgrounds
- A rounded-square icon tile above every heading
- Generic icon-set glyphs in circles
- Marquee logo scrollers
- Stock photography of anyone pointing at a laptop
- Neon "AI" branding, circuit boards, robot glyphs
- Crayon textures, Comic Sans, or anything that makes "Doodles" read as childish
- "Most popular" badges or gradient borders on the middle pricing tier

**The specific trap for this brand:** letting the doodle direction turn the page into a Notion clone or a fintech mascot site. Hand-drawn is an accent. It is never the foundation.

**Test:** if the page could belong to any agency in any country, start over.

---

## 4. Design tokens

Adapted from the Precision Geo system. Drop these into `globals.css` and reference them everywhere. No hardcoded hex values anywhere in the component tree.

```css
:root {
  /* Surfaces */
  --paper:            #FDFCFB;  /* page background — softer than pure white */
  --surface:          #FFFFFF;  /* cards, form */
  --surface-low:      #F4F3F2;
  --surface-container:#EEEEED;
  --inverse-surface:  #2F3130;  /* The Shift section */
  --inverse-on:       #F1F0F0;

  /* Ink */
  --ink:              #111111;  /* Deep Onyx — headlines, primary buttons */
  --ink-body:         #1A1C1C;
  --muted:            #444748;  /* secondary text */
  --data-gray:        #666666;  /* mono labels */

  /* Structure */
  --rule:             #C4C7C7;
  --rule-light:       #E5E5E5;
  --outline:          #747878;

  /* Accent */
  --signal:           #E21E35;  /* Signal Red — THE PEN. All doodle marks. */
  --signal-deep:      #BB0024;  /* hover state only */

  /* Utility */
  --live:             #25D366;  /* WhatsApp button only. Never as brand colour. */
  --error:            #BA1A1A;
}
```

### Colour discipline

- **Deep Onyx** carries all structural weight: headlines, primary buttons, the inverted section.
- **Signal Red** appears in exactly three roles and nowhere else: hand-drawn annotation marks, case-study result figures, and the focus ring on form inputs. It is a scalpel. Every extra use halves its power.
- Surfaces are defined by **1px borders, not fills**. No drop shadows anywhere except the 2px/10% active-state lift on interactive elements.
- **WhatsApp green is not a brand colour.** It appears only on the WhatsApp button and the sticky mobile bar, because users recognise it as a system affordance.

---

## 5. Typography

```css
--font-display: 'Satoshi', 'Inter', sans-serif;   /* Fontshare */
--font-body:    'Inter', system-ui, sans-serif;
--font-mono:    'JetBrains Mono', monospace;
--font-hand:    'Caveat', cursive;                /* annotations only */
```

**Note on the display face.** The supplied system specifies Inter for everything. Inter-for-everything is the single most recognisable AI-generated design tell, and Impeccable will flag it. Satoshi at 700 is close enough in feel to keep the system's technical character while breaking the tell. If you must stay 100% on the supplied tokens, use Inter 800 with `-0.03em` tracking for display and accept that the page will read a little more generic.

### Scale

| Role | Desktop | Mobile | Face / weight | Tracking |
|---|---|---|---|---|
| Display (H1) | 68px / 72px | 38px / 44px | Display 700 | -0.03em |
| Section (H2) | 44px / 52px | 30px / 36px | Display 700 | -0.02em |
| Sub (H3) | 24px / 32px | 21px / 28px | Display 600 | -0.01em |
| Body large | 18px / 28px | 17px / 26px | Body 400 | — |
| Body | 16px / 24px | 16px / 24px | Body 400 | — |
| Mono label | 14px / 20px | 13px / 18px | Mono 500 | 0.02em |
| Caps eyebrow | 12px / 16px | 11px / 16px | Body 700 UPPER | 0.05em |
| Annotation | 17px | 16px | Hand 400 | — |

### Rules

- **Monospace means "we measure things."** Use it for: section eyebrows, timeline week labels, screenshot captions, form field labels, all price figures, and case-study data labels. Never for narrative prose.
- **The hand face is a spice, not an ingredient.** Maximum **6 instances on the entire page**. If it appears in a headline, it's wrong. Set at -2° to -3° rotation, always in `--signal`.
- The hero headline is the emotional core. Give it room. Nothing competes beside it except the form.

---

## 6. Layout system

- 12-column grid, `max-width: 1280px`
- Gutters 24px
- Margins: 64px desktop / 16px mobile
- Vertical rhythm on an 8px base
- Section padding: 120px desktop / 64px mobile
- Sections separated by **1px rules** in `--rule-light`, never by alternating background fills

Break the grid deliberately in two or three places — one full-bleed section, one screenshot overhanging its column — so the page doesn't read as a template. Corner radius is **4px** throughout. No pills, no fully-rounded buttons.

> **CSS warning:** watch selector specificity on section padding. It is easy to generate `.section` and `.cta` rules that cancel each other out. Use a single spacing utility and don't override it per-section.

---

## 7. The signature element

**The circled recommendation.**

Every AI screenshot on this page carries one hand-drawn Signal Red ellipse around the client's business name where the model recommends it, with a short arrow and a two-word annotation in the hand face.

That single mark is the entire brand thesis in one image: rigorous data, drawn by hand. It is the logo mark, the favicon, and the proof device. It appears nowhere else.

**Implementation:** inline SVG with genuine path irregularity — a hand-drawn ellipse is not a perfect ellipse. Never raster. Never a "sketchy" JS library that redraws it. Hand-author the path or trace a real pen stroke.

---

## 8. Section-by-section build

Copy below is final. Build it as written.

---

### 8.1 — Hero

**Layout.** Two columns on desktop: headline block 7 cols, form 5 cols. Stacked on mobile with the form directly below the tick list. Full viewport height is *not* required — let the next section peek above the fold.

**H1**
> Your competitors are not always better. They are just easier to choose online.

A hand-drawn Signal Red underline sweeps beneath **easier to choose**. Single imperfect stroke.

**Tick row** — mono uppercase, three items, horizontal on desktop / stacked on mobile. Hand-drawn Signal Red checkmarks, not icon-set glyphs.

- Remove trust friction
- Generate quality leads
- Easier to close for sales people

**Sub** (body large, `--muted`, max 60ch)
> We rebuild websites so customers find you in Google and ChatGPT, trust you in 10 seconds, and reach you in one tap. Live in 30 days.

**Visual.** One AI screenshot with the circled recommendation, positioned to break the fold edge — half-visible, pulling the scroll.

---

### 8.2 — The four fears

**Eyebrow (mono):** `THE COST OF BEING HARD TO CHOOSE`

**H2**
> Four ways you're losing customers you never knew you had.

Numbered `01`–`04` in mono at 80px in `--rule-light`, left-aligned, stacked, thin rules between. No icons, no cards. The numbering is legitimate here: this is a diagnostic sequence the reader walks through, not decoration.

**01 — They didn't know what you actually do.**
Someone landed on your homepage. Ten seconds later they left, still unsure whether you were the right fit for their exact problem. They didn't ask. They just went back to Google.

**02 — They couldn't tell if you were any good.**
No case studies. No real faces. No numbers. Just words claiming you're professional and trusted. So they picked the competitor who *showed* them instead of telling them.

**03 — They never found you in the first place.**
They asked ChatGPT for the best options in their area. They searched Google Maps. Your business exists — but the search engines and AI models couldn't understand you well enough to recommend you. Someone else got named.

**04 — They wanted to contact you and gave up.**
The form asked for nine fields. The WhatsApp button was buried at the bottom. Nobody replied for two days. They were ready to buy, and the friction cost you the sale.

**Closing line** — set larger, indented, with one Signal Red annotation arrow pointing to it:
> None of these mean your service is worse. They mean you're harder to choose.

---

### 8.3 — The shift

**Full-bleed, inverted.** `--inverse-surface` background, `--inverse-on` text. This is the highest-contrast moment on the page and the argument no competitor can make.

**H2**
> Search changed. Your website didn't.

Your customers stopped typing keywords. They started asking questions — to ChatGPT, to Gemini, to the AI Overview sitting above every Google result.

These models don't rank websites. They *recommend businesses.* One name, maybe three. No page two.

To get recommended, an AI model has to understand exactly what you do, who you do it for, where you operate, and whether anyone can verify it. Most Malaysian SME websites give it nothing to work with. Pretty design, zero structure.

That's the gap we build for.

**Visual.** Two or three AI screenshots laid out as evidence exhibits. Each: 1px border, subtle offset, mono caption below with model name and date, and the circled client name. These must be real and dated. Never crop them into abstract decoration. Never fake them.

---

### 8.4 — Three pillars

**H2**
> Easy to find. Easy to trust. Easy to contact.

**Sub:** Every page we build is judged against these three. Nothing else matters.

Three columns. Each has a 1px top rule, a display-face heading, and deliverables as plain unbulleted lines with tight leading. **No cards. No borders on the sides. No icons.** Typographic separation only.

**EASY TO FIND**
Your visibility mapped across Google, ChatGPT, Perplexity and AI Overviews — against three named competitors. Our in-house AI keyword planner turns that into a topic map, and the topic map becomes your actual site structure. Schema and entity setup so machines know who you are. Google Business Profile aligned. Built to be cited, not just crawled.

**EASY TO TRUST**
Case studies with real numbers. Your team's actual faces. Licences and credentials where buyers look for them. Live Google reviews. An FAQ built from the objections your salespeople hear every week. And a pricing signal — because silence on price loses more deals than a high price ever will.

**EASY TO CONTACT**
WhatsApp-first, one tap, pre-filled message, on every section. Maximum three form fields. A response-time promise you can keep. Every lead tagged by the page it came from, routed into your CRM. Full tracking, so you finally know what's working.

---

### 8.5 — Timeline

**H2**
> Live in 30 days. Here's exactly how.

Horizontal on desktop: one continuous line, five nodes. Week label in mono above, description below. Vertical stack on mobile with a connecting left rule.

**The connecting line is drawn** — a slightly wobbly Signal Red pen stroke, not a perfect 1px rule. This is the strongest doodle placement on the page.

| | |
|---|---|
| `WEEK 00` | Findability Audit delivered. 90-minute kickoff. |
| `WEEK 01` | Topic map, sitemap and wireframes approved. |
| `WEEK 02` | Design and copy across all pages. |
| `WEEK 03` | Build, schema, integrations, tracking. |
| `WEEK 04` | QA, launch, handover training. |

**Below:** Your total time investment: three calls and two rounds of feedback.

**Guarantee block** — bordered, quiet:
> **Our guarantee:** live in 30 days, or you don't pay the final instalment. We guarantee our delivery speed — not rankings. Anyone promising you page-one results by a fixed date is guessing.

---

### 8.6 — Proof

**H2**
> What happened after.

Three case studies, identical four-line structure. Two-column table, mono labels left. **Uniformity is what makes them credible** — do not let one be longer or prettier than the others.

```
[BUSINESS TYPE — LOCATION]
WAS       [what was broken]
BUILT     [what we did]
30 DAYS   [result]
90 DAYS   [result]
```

Result figures set large in `--signal`. Do not publish without real numbers.

---

### 8.7 — Pricing

**H2**
> No quotes. No discovery-call ambush.

Three tiers side by side, plain. Prices in mono, large. No badges, no strikethroughs, no gradient border on the middle option.

**Findability Audit — RM980**
Where you stand in Google and AI search versus three competitors, plus the exact gaps costing you leads. Fully credited if you proceed to the build.

**The 30-Day Findable Site — RM14,800**
Everything above. Up to 10 pages. Paid across three milestones.

**Findability Retainer — RM3,200/month**
Monthly content from your topic map, AI citation monitoring, schema maintenance, conversion reporting. Six-month minimum. Optional — but this is where compounding happens.

---

### 8.8 — Disqualifier

Small, quiet, centred, narrow measure (max 52ch). Its power comes from looking like an aside rather than a sales section.

**H3**
> This isn't for everyone.

We're not the right fit if you're pre-revenue, need e-commerce or custom app development, want brand identity and logo work, or are looking for the cheapest option available.

We work best with established businesses that already have customers and reviews — and a website that reflects neither.

---

### 8.9 — FAQ

Accordion, 1px rules between items, no card containers. Chevron rotates 200ms on open. First item closed by default.

**Do I need to rewrite all my content?**
No. We audit what you have, keep what works, and rebuild what doesn't map to your topic plan.

**I already pay for SEO. Is this different?**
Yes. Traditional SEO optimises for ranking positions. We build for citation — being the business an AI model names when someone asks for a recommendation. Related, but not the same job.

**Do you guarantee rankings?**
No, and be careful with anyone who does. Rankings depend on your market, competitors and time. What we guarantee is a site that's structurally ready to be found, delivered in 30 days. Our case studies show what that's produced so far.

**What happens after launch?**
You own everything — domain, hosting, content, code. The retainer is optional.

**Why 30 days?**
Because scope creep kills websites. A fixed window forces decisions, and a site that launches in 30 days starts earning before a "perfect" one ever goes live.

**Can you work in Bahasa Malaysia or Chinese?**
Yes — multilingual structure is part of the topic map where it makes commercial sense.

---

### 8.10 — Final CTA

**H2**
> Find out what it takes to get you found.

Tell us about your business and we'll come back with a straight quote — where you stand in Google and AI search today, and what it costs to fix it.

Repeat the identical form component.

---

## 9. The form — highest-priority component

Appears twice: hero and final CTA. Same component, same validation, different `source` value.

### Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | yes | placeholder: `Your name` |
| Industry | select | yes | dropdown, not free text — see options below |
| Email | email | yes | HTML5 validation + regex |
| Mobile number | tel | yes | Malaysian format, placeholder `01X-XXX XXXX` |

**Industry options:** Clinic / Healthcare · Legal & Professional Services · Education & Training · Property & Construction · Retail & F&B · Financial Services · Beauty & Wellness · Other

A dropdown gives clean segmentation for follow-up and removes a thinking step for the visitor. Do not make this free text.

### Styling

- `--surface` background, 1px `--rule` border, 4px radius, **no shadow**
- Labels above inputs: mono uppercase 11px, `--data-gray`
- Inputs 52px tall, 17px text — large enough to type on a phone without triggering iOS zoom
- Focus: border thickens to 2px and shifts to `--signal`. This is the third and last legitimate use of the accent.
- Button: full width, `--ink` fill, white text, 56px, 4px radius
  **Label:** `Get your quote →`
- Micro-copy under button, 13px `--muted`:
  *We'll get back to you on WhatsApp. No cold calls.*

That last line is not optional. The mobile number is the highest-friction field on the page; name the fear before they feel it.

### Behaviour

- `POST` **straight from the browser** to the n8n webhook → Supabase `leads` table. There is no server route in between, so the webhook URL ships in the page bundle and is public by design; n8n echoes any `Origin`, so CORS passes from localhost and production alike.
- Payload includes `source` (`hero` | `footer`), `utm_*`, `referrer`, `timestamp`
- Button enters loading state immediately, then **redirects to `/thank-you`** on success. No modal. `/thank-you` is `noindex` and stays out of `sitemap.xml`.
- The thank-you page leads with: *Got it. We'll be in touch within 24 hours.*
- With no server route behind the form, the client-side checks are the only validation — they cannot be relaxed.
- Errors are specific and actionable, never vague, and never apologise. "Enter a valid Malaysian mobile number" — not "Oops, something went wrong."
- Honeypot field for spam. No CAPTCHA.

### Sticky mobile bar

Appears after the first scroll past the hero. Two buttons: WhatsApp (`--live`) and `Get my score` (`--ink`). Never covers content — add matching bottom padding to the page. Slides up 200ms, once.

---

## 10. Motion

Run every item here past the **Emil Kowalski** skill before shipping.

**Global rules**
- No UI interaction animates for longer than **300ms**
- Never use `ease-in` on an entrance. Use a custom curve: `cubic-bezier(0.32, 0.72, 0, 1)`
- Scroll reveals: fade + 12px rise, 400ms, **once only**, never re-triggering
- `prefers-reduced-motion: reduce` disables everything except opacity

**The one exception.** The hero underline may draw itself in over 600ms on load, using `stroke-dasharray`. It's a page-load moment, not a UI interaction, and it earns the extra time because it *is* the brand. Nothing else on the page gets this budget.

**Explicitly banned:** parallax, scroll-jacking, counting-number animations, typewriter effects, anything that delays reading.

---

## 11. Technical requirements

**Performance** — the audience is on mobile data.
- LCP under 1.8s on 4G, CLS under 0.05
- Self-host all fonts, `font-display: swap`, subset to Latin
- Screenshots as WebP with explicit `width`/`height`, `priority` on the hero image only
- No client-side JS above the fold except the form
- Target Lighthouse 95+ across all four categories

**Accessibility** — the site must pass the audit it sells.
- Semantic HTML5, exactly one `<h1>`, no skipped heading levels
- Visible keyboard focus on every interactive element
- All contrast ratios ≥ 4.5:1 for body, ≥ 3:1 for large text
- Form labels properly associated; errors linked via `aria-describedby`
- Doodle SVGs are decorative: `aria-hidden="true"`

**SEO / GEO** — this page is a demonstration of the service.
- JSON-LD: `Organization`, `Service`, `FAQPage`, `LocalBusiness` (Klang Valley area served)
- Descriptive `alt` on every screenshot naming the model and what it shows
- OG + Twitter card images
- `sitemap.xml`, `robots.txt`, canonical URL
- Content structured so an LLM can extract: what DataDoodles does, who for, where, at what price. That last one is why pricing is public.

---

## 12. Build order

1. Tokens, fonts, base layout primitives
2. Form component (build first — it's the conversion point and everything else is scaffolding around it)
3. Hero
4. Four fears
5. The shift (inverted section)
6. Three pillars
7. Timeline
8. Proof
9. Pricing → Disqualifier → FAQ → Final CTA
10. Sticky mobile bar
11. Motion pass
12. Skill audit sequence (Section 0)

---

## 13. Ship checklist

- [ ] `/impeccable audit` clean
- [ ] Emil Kowalski pass complete — every animation under 300ms and justified
- [ ] Taste pass complete — no section flagged as generic
- [ ] Form submits end to end, lead lands in Supabase, WhatsApp notification fires
- [ ] Both form instances tagged with distinct `source` values
- [ ] Tested on a real Android device on 4G, not just DevTools throttling
- [ ] Every AI screenshot is real, dated, and legible at mobile width
- [ ] Case studies contain actual numbers
- [ ] Hand-face instances counted: **6 or fewer**
- [ ] Signal Red used only for annotations, result figures, and focus rings
- [ ] Zero drop shadows outside active states
- [ ] Lighthouse 95+ / LCP under 1.8s
- [ ] Schema validates in Google Rich Results Test

---

## 14. The final test

Cover the logo. Show the hero to a Malaysian clinic owner for five seconds. Can they say what you do and why it matters to them?

Uncover it. Does "DataDoodles" now feel obvious rather than random?

If the name still feels like a mismatch after seeing the page, the annotation layer is either too light or too heavy. Adjust and retest.
