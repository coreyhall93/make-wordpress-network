# Design review: shared Make navigation

## Current implementation evidence

- The live Make WordPress homepage still loads Dashicons.
- Most team rows still map to Dashicon glyphs.
- Openverse, Core Performance, Playground, and Core AI use custom SVG masks in the current Make theme.
- WordPress now has a core SVG Icon API, and the Gutenberg `@wordpress/icons` package provides a maintained SVG set.

For this prototype, each team has a distinct inline SVG from the WordPress icon set. The team name is always shown beside it. The icons are a coherent prototype mapping, not proposed permanent team identities.

## Adversarial take

1. A full-width switcher fixes discoverability, but it can easily become an oversized site directory. It needs a short path out, clear focus handling, and a compact information hierarchy.
2. Icons help people scan, but 24 team metaphors will never be equally obvious. The text label must do the identification work.
3. `Your teams` must be explicitly selected by the contributor. It should not imply membership, badge status, or inferred activity.
4. Search helps the experienced contributor. Alphabetical browsing helps everyone else. The switcher should preserve both rather than forcing one discovery model.
5. The real implementation risk is data trust, not visual polish. Missing meetings, stale posts, and unclear timestamps will damage confidence faster than an imperfect icon.
6. The five concepts should stay meaningfully different in hierarchy. Reusing identical team cards everywhere can make separate ideas feel like cosmetic variants.

## Current direction

The revised switcher uses a full-width surface with:

- an explicit `Switch teams` heading
- `Your teams` in the first group
- every other Make team in alphabetical order
- a search field for direct retrieval
- one SVG style and one size across the set
- Escape-to-close and keyboard focus on search when opened

This is a stronger working direction, not a final navigation recommendation. It still needs design review against real content, narrow viewports, and the actual WordPress.org header behavior.

## Primary references

- <https://make.wordpress.org/>
- <https://make.wordpress.org/wp-content/themes/wporg-make-2024/build/style/style-index.css>
- <https://github.com/WordPress/gutenberg/tree/trunk/packages/icons>
- <https://make.wordpress.org/core/2026/07/24/registering-and-rendering-svg-icons-in-wordpress-7-1/>
