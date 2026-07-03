# Site improvement recommendations (post-preview)

Follow-up review of **vibeopsforum.com** after the recent preview improvements (mobile nav, upcoming events, community homepage shelf, join page, SEO/a11y polish). The site is in much better shape. Below are the next improvements worth considering, grouped by impact.

---

## Critical / operational

### 1. Static event filtering will go stale again

`isUpcoming()` runs at **build time**, not in the browser. After deploy, events stay listed as "upcoming" until the next build — even after they've passed.

**Options:**
- **Scheduled rebuilds** — GitHub Action cron (daily/weekly) that rebuilds and deploys
- **Client-side filter** — render all events, hide past ones with a small script using the visitor's date
- **Hybrid** — build-time filter + client script as a safety net

**Recommendation:** cron rebuild + client-side filter for a community calendar.

### 2. Stale Slack URL in GitHub issue config

`site.ts` uses one invite URL, but `.github/ISSUE_TEMPLATE/config.yml` still points to an older one:

```
https://join.slack.com/t/vibeopsforum/shared_invite/zt-3pgetqklv-_F1SDrDVKEFinIRg9PlQ3Q
```

**Fix:** Drive this from a single source in `site.ts` (or keep them manually in sync).

### 3. No CI pipeline

There is no `.github/workflows` — PRs are not automatically checked with `astro build` / `astro check`.

**Fix:** Add a simple workflow: `npm ci → npm run check → npm run build`

---

## High-impact product improvements

### 4. Recurring events model

The weekly standup is a single JSON file with one date. When it passes, someone has to manually bump it.

**Fix:** Add `recurring: "weekly"` (or an RRULE) and compute the next occurrence at build time.

### 5. Event submission template

Projects and community content have GitHub issue templates; events do not.

**Fix:** Add `.github/ISSUE_TEMPLATE/event.yml` and link it from `/events/`.

### 6. Community filter shareability

Tabs on `/community/` are client-only — no `?type=podcast` in the URL, so filtered views are not linkable.

**Fix:** Sync tab state to query params; restore the active tab on load.

### 7. Tag-based discovery

Projects, events, and community content all have tags, but there is no way to filter by them.

**Fix:** Tag filter chips on `/projects/` and `/community/`, or a simple `/topics/vibecoding/` page that aggregates across collections.

### 8. Onboarding path for newcomers

Resources exist, but there is no guided "start here" flow.

**Fix:** A "New builder path" on `/join/` or the homepage:
1. Read vibecoding primer
2. Browse project shelf
3. Join Slack with a first-post template

---

## Content and data quality

### 9. Resource articles are still thin

Primers are ~20 lines. They work as vocabulary, but not yet as a real field guide.

**Expand with:**
- Curated links (docs, repos, talks)
- Community examples (linked from Slack/GitHub issues)
- "Common mistakes" sections per topic

### 10. Static project metadata

Star counts and languages are hand-entered and go stale (e.g. Goose at 4,700 stars).

**Fix:** Fetch from GitHub API at build time (with caching), or drop stars and show only repo + tags.

### 11. Homepage community picks lack context

Cards show title/description but not type (YouTube vs podcast vs blog).

**Fix:** Reuse the type badges from `/community/` on homepage cards.

### 12. Curate homepage shelves

Homepage shows "latest 3" for events, projects, and community content.

**Fix:** Add optional `featured: true` in content schemas to hand-pick highlights.

---

## UX and design polish

### 13. Mobile menu stays open after navigation

The `<details>` menu does not close when a link is tapped.

**Fix:** Small script to close it on nav click.

### 14. Community tabs accessibility

Tabs have `role="tab"` but no `aria-controls`, no arrow-key navigation, and no `tabpanel` association.

**Fix:** Wire up the WAI-ARIA tabs pattern, or switch to filter buttons with `aria-pressed`.

### 15. Nav is getting crowded (6 items)

On desktop it is fine; on mobile the menu is long.

**Options:**
- Group under "Explore" (Resources, Projects, Community)
- Move About to the footer
- Keep top-level: Events, Community, Join

### 16. Footer is minimal

No GitHub link, submission links, copyright, or code of conduct.

**Fix:** Add GitHub repo link, "Submit a project" / "Suggest content", and © 2026 VibeOps Forum.

### 17. PNG social preview image

OG image is SVG. Twitter supports it; Facebook and LinkedIn often do not.

**Fix:** Export a 1200×630 PNG and point `og:image` at that.

---

## Architecture and maintainability

### 18. Extract shared components

Repeated patterns across pages: page header (kicker + title + intro), event card, community content card, project card.

**Fix:** `PageHeader.astro`, `EventCard.astro`, etc.

### 19. Centralize brand tokens in Tailwind

Many pages use raw hex values. CSS variables exist in `global.css` but are not used everywhere.

**Fix:** Define Tailwind theme tokens for `accent` and `accent-2`.

### 20. RSS feed

Useful for builders tracking new projects, events, and community picks.

**Fix:** `@astrojs/rss` for `/feed.xml` combining events + projects + community content.

---

## Growth and community features

| Feature | Why |
|--------|-----|
| **Member spotlights** | Short Q&A with active builders — social proof |
| **Session archive** | Link past event notes/recordings on the past-events section |
| **Slack channel map** | Which channel is for vibecoding vs MCP vs A2A |
| **Code of conduct** | Expected for a growing community |
| **Newsletter / digest** | Optional monthly "what we studied" from the shelves |

---

## Suggested next sprint

Recommended implementation order:

1. CI + fix Slack URL drift
2. Client-side event freshness
3. Recurring events + event issue template
4. Community URL filters + tag filters
5. PNG OG image + footer polish
6. Shared components + expand resources

---

## Done vs. still open

| Done (recent preview) | Still open |
|----------------------|------------|
| Mobile nav | CI pipeline |
| Upcoming event filter | Build-time staleness fix |
| Community on homepage | Recurring events |
| Join page + QR | Event submission template |
| OG image (SVG) | PNG for social |
| Topic labels | Tag filtering |
| GitHub URL fix | Slack URL in issue config |
| Focus styles + skip link | Tab accessibility |
| Brand color unification | Shared components |

---

*Prepared by site review — July 3, 2026*
