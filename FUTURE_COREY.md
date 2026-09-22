# Make WordPress network exploration: pickup note

Status: paused on September 22, 2026. The exploration is shareable and the current implementation is stable. The next useful move is feedback and synthesis, not another round of unguided concepts.

## Start here

1. Open the live overview at <https://make-network-exploration.view.fast/>. Spacefast may require the access-bearing share URL, which is intentionally not committed to this public repository.
2. Read [`README.md`](README.md) for scope, local commands, implementation sources, and the WordPress Playground decision.
3. Read [`docs/research/2026-09-17-design-review.md`](docs/research/2026-09-17-design-review.md) for the unresolved navigation risks.
4. Run `npm install`, `npm run build:share`, and `npm run check`, then use `npm start` for local review.

## What this is

This work explores two related problems:

- a clearer front door for `make.wordpress.org`, especially for seeing teams, their next meetings, and their latest posts
- a shared second-row Make WordPress navigation that always provides a route home and makes switching teams easy

It does not redesign individual team landing pages or their contribution guidance. That stays separate from Shane/Cheyne's team-page work.

## Current artifact

- Public source: <https://github.com/coreyhall93/make-wordpress-network>
- Local source of truth: `/Users/coreyhall/Sol/02-Projects/make-wordpress-network-prototypes`
- Team Comet mirror: `/Users/coreyhall/Sol/02-Projects/team-comet/prototypes/make-wordpress-network`
- Spacefast space: `spc_9f05fc41770d463db57250047b2fe4ed`
- Five synthesized directions: `mockups/synthesis/`
- Team-facing overview generator: `scripts/generate-share-site.mjs`

The published overview uses static preview images in a looping carousel because the hosted site refuses iframe embedding. Each preview links to its full interactive prototype.

## Decisions already made

- Keep the WordPress.org global navigation as row one and Make WordPress navigation as row two. Do not add a third row.
- `Make WordPress` is the home link. The current team name opens a full-width team switcher.
- `Your teams` means teams explicitly selected by the contributor. It is not inferred from badges or activity, and it is not a separate favorites system.
- The switcher shows `Your teams` first and every other team alphabetically, with team names doing the identification work and icons supporting scanning.
- Team cards show the next meeting, latest post, and direct links to the team home, handbook, and meetings.
- Detailed cards use two columns rather than a cramped four-column layout.
- Use existing published sources for V1. No Slack ingestion or AI summarization is required.
- Decorative eyebrow labels were removed. Small labels stay only when they explain content or state.
- Existing team-page content is represented by an intentional placeholder rather than redesigned.

## Five directions

- A, My Make workbench: a practical dashboard for the contributor's selected teams, with an all-teams view.
- B, Audience gateway: explicit views for new contributors, selected teams, and all teams.
- C, Find and follow: search-led access to teams, handbooks, meetings, pathways, and posts.
- D, Network newsroom: recent publishing and activity across the contributor network.
- E, Contribution cockpit: a compact operational view with a persistent sidebar. Its earlier sidebar styling was preferred; future changes should add useful content, not restyle it for novelty.

## Next questions

1. Ask reviewers which problem each direction solves best, rather than asking for one overall favorite.
2. Identify the elements worth carrying forward across concepts: audience switching, selected-team cards, all-team browsing, search, newsroom content, and the full-width switcher.
3. Decide whether the next artifact is one narrowed direction, two contrasting directions, or a WordPress Playground implementation.
4. If the question becomes implementation fidelity rather than information architecture, move the leading direction into a small block theme or plugin plus a Playground Blueprint.
5. Have a WordPress designer challenge the team-switcher hierarchy, icon mapping, narrow viewport behavior, keyboard focus, and trustworthiness of meeting/post data.

## Done when

This exploration can be considered resumed when reviewer feedback has been summarized into a decision about which one or two directions to take forward and whether the next test belongs in static HTML or WordPress Playground.
