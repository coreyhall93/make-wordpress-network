# Make WordPress network prototypes

Twenty rough, working desktop-first concepts for the Make.WordPress.org network home and its shared navigation.

## Scope

- The first row remains the global WordPress.org navigation.
- The second row belongs to Make WordPress.
- `Make WordPress` always returns to the network home.
- The team control opens a full-width switcher with `Your teams` first and every other team in alphabetical order.
- The remaining second-row links belong to the current team and change with it.
- Every concept includes Community, Design, Documentation, and Training team states.
- Sixteen concepts stay within the current WordPress.org visual language. Four intentionally push beyond it.

This does not redesign individual team welcome pages, contribution pathways, or team-owned homepage content. That boundary keeps this work separate from Cheyne’s individual-team-home exploration.

## V1 data principle

The concepts assume inexpensive, source-linked signals already published by WordPress:

- meeting calendar data
- team blog posts and feeds
- agendas and recaps identified from published posts
- team updates
- contributor-selected teams

No Slack ingestion or AI summarization is required. Labels such as “latest agenda,” “recent recap,” and “team update” describe the source instead of pretending to know a team’s current focus.

## Navigation source fidelity

The prototype navigation is modeled on the current official code, not a screenshot-only approximation:

- [WordPress.org global header and footer blocks](https://github.com/WordPress/wporg-mu-plugins/tree/trunk/mu-plugins/blocks/global-header-footer)
- [WordPress.org local navigation bar block](https://github.com/WordPress/wporg-mu-plugins/tree/trunk/mu-plugins/blocks/local-navigation-bar)
- [Make blog theme in the WordPress.org Meta repository](https://github.com/WordPress/wordpress.org/tree/trunk/wordpress.org/public_html/wp-content/themes/pub/wporg-breathe-2024)
- [WordPress.org parent theme](https://github.com/WordPress/wporg-parent-2021)
- [WordPress icons package](https://github.com/WordPress/gutenberg/tree/trunk/packages/icons)

Only this local prototype project was changed. No WordPress.org source or production code was altered.

The live Make site still loads Dashicons and uses them for many team rows, alongside a few custom SVG masks. These prototypes use a locally vendored subset of `@wordpress/icons` instead. That makes the direction more realistic for a future implementation without pretending the live site has already completed that migration. Team names remain visible because icons are supporting wayfinding, not standalone labels.

## Run

```sh
npm run build
npm run check
npm start
```

Then open `http://127.0.0.1:4173`.

For pruning and feedback, open `http://127.0.0.1:4173/review-board.html`. The board stores Keep, Maybe, Kill, and note state in the current browser. Feedback can also be downloaded as JSON.

For the five directions synthesized from the surviving concepts, open `http://127.0.0.1:4173/mockups/synthesis/index.html`. Their evidence recipes are documented in `docs/logs/2026-09-17-keep-synthesis.md`.

## Share site

Build the concise, team-facing presentation with:

```sh
npm run build:share
```

The generated artifact lives at `/Users/coreyhall/Sol/06-Exports/make-wordpress-redesign/2026-09-17`. It is published to the existing authenticated Spacefast space `spc_9f05fc41770d463db57250047b2fe4ed` at `https://make-network-exploration.view.fast/`. Update that space rather than creating a new one for each revision. Share access is managed by Spacefast and its access-bearing URL must not be committed here.

## Prototype behavior

Open any concept, click `Make WordPress` to return home, or open `Choose a team` and select a representative team. The team page deliberately marks where unchanged team-owned content begins.

## Working with another agent

This folder is self-contained. A teammate or agent can clone it, run `npm run build:share`, and edit either the five synthesis sources in `mockups/synthesis/` or the share-site generator in `scripts/generate-share-site.mjs`. Run `npm run check` before sharing a revision.

The generated export is not the source of truth. Make edits in this repository, then rebuild it.

## WordPress Playground

Playground is a useful second-stage test bed once the team wants to evaluate these ideas inside WordPress rather than as static concepts. The practical shape is a small block theme or plugin containing:

- one page for the concept overview
- one page or template per direction
- the shared Make navigation as a reusable block or pattern
- a Playground Blueprint that installs the package and creates the pages

The current static prototype is still the faster format for comparing information architecture. Moving to Playground becomes worthwhile when the question changes to whether the navigation and layouts work with real WordPress blocks, theme constraints, focus behavior, and responsive rendering. See `docs/research/2026-09-17-design-review.md` for the current design risks.
