# Prototype feedback interview

Source set: four Keeps and seven Maybes from `make-wordpress-prototype-feedback.json`.

This is an evidence ledger, not a prototype specification. Preserve Corey's reactions until all eleven concepts have been discussed before synthesizing new directions.

## Current shortlist

Corey's explicit status update supersedes the downloaded review-board statuses:

- **Keep:** 01, 03, 05, 06, 10, 11, 12, 13, 14, 15
- **Kill:** 02
- The shortlist contains ten concepts. Keep status means the concept remains source material for the interview; it does not yet mean all of its parts should appear in a synthesized prototype.

## 01 · My Make pulse · Keep

### Why the complete concept survived

- The quick switch between **Your selected teams** and **Browse all teams** is valuable.
- It covers the expected basics in one place: manually selected teams, upcoming meetings, and recently published posts from those teams.
- Its generic quality is useful here. It feels like a credible baseline that meets the criteria without overcommitting to one unusual presentation.

### Problems to address

- The hero heading wraps poorly: “making” is orphaned while substantial space remains to the right.
- Treat that heading and its layout as unresolved rather than as a default for the next iteration.

### Ingredients noticed in other concepts

Capture these now and revisit them when their source concept is discussed:

- **02 · Agenda first:** the date card.
- **09 · Calendar ribbon:** the blue calendar ribbon, but not the complete concept.
- **10 · Contributor dashboard:** the Customize control.
- **11 · Make newsroom:** the “newsroom” heading and its departure from the familiar presentation.
- **13 · Find your way:** the “Where do you want to go?” search-oriented section.
- **14 · Favorites rail:** the rail's relationship to handbooks and contributor pathways.

### Open question

- The personalized team set should be the default returning view.
- For now, treat **selected teams** and **favorite teams** as the same underlying set: teams Corey is actively interested in contributing to.
- Do not introduce a second tier of “super-favorite” starred teams without evidence that the extra distinction is useful.
- The user-facing name is unresolved. **Your selected teams** is understandable but may be more mechanical than **Your teams** or **My teams**.
- Use an inline **star** on a team to add or remove it from this personalized set.
- The star represents membership in **Your teams**. It is not a separate super-favorite state.

## 02 · Agenda first · Kill (changed from Maybe)

### What survives

- The date treatment at the top is visually useful.
- Meetings should remain easy to find and scan.

### Why the complete concept was killed

- The concept does not provide a sufficiently distinct or useful homepage model.
- Meetings do not need to be the first or dominant thing on the page.
- Preserve the date treatment as an ingredient that another direction can use rather than keeping a meeting-first prototype.

## 03 · Team cards · Keep (changed from Maybe)

- Corey upgraded this complete concept to Keep during the interview.
- Its value is functional rather than merely visual: one bounded area brings together a team's next meeting, latest post, and links to the team's destinations.
- Treat each card as a compact team workspace or status summary.
- Required card ingredients so far: next meeting, latest post, and direct team-resource links.
- Use the same detailed card pattern in both scopes.
- Show **Your teams** by default. Provide a control that toggles to cards for **All teams** on demand.
- The toggle mechanism and exact labels remain open, but the two scopes should not require learning different card patterns.

## 05 · Layered home · Keep (restored by explicit shortlist update)

### Identified ingredient

- The **New to contributing? Find a place to begin** block is valuable.
- It gives newcomers an explicit entrance without forcing the whole homepage to become newcomer onboarding.

### Earlier interview finding

- The rest of Layered home does not warrant a separate direction once the newcomer block is removed.
- Carry the newcomer block forward as a portable ingredient for another surviving model.
- Corey subsequently restored #05 to Keep in an explicit ten-concept shortlist. The reason for retaining the complete direction remains unresolved.

## 06 · Audience views · Keep (confirmed after functional test)

### Liked composition

- Corey identified the upper audience-view composition as the part to preserve.
- It pairs the **One network. Your view.** introduction with an explicit **New contributor / My Make / All teams** switcher.
- The selected **My Make** view leads directly into personalized team cards with an edit control.
- Those cards reinforce the already identified compact-team-workspace pattern: star state, next meeting, latest published signal, and team destination links.

### Open question

- Determine whether the three-view audience switcher is essential, or whether the primary value is the personalized team-card area beneath it.
- The prototype's three switcher buttons are visual only and do not currently change the page. Corey has not yet evaluated the actual behavior.
- Intended meanings, still unvalidated: **New contributor** would expose a beginning/pathways view; **My Make** would show starred team cards; **All teams** would show the complete team-card directory.
- A functional section iteration now exists at `mockups/audience-views/functional-switcher.html` so Corey can evaluate those meanings before deciding whether #06 remains a Keep.
- The iteration preserves the original #06 rather than overwriting it. It defaults to **My Make**, exposes the saved newcomer block in **New contributor**, and reuses the detailed card pattern in **All teams**.
- After using the three working states, Corey confirmed the concept should remain a Keep.

## 10 · Contributor dashboard · Keep (changed from Maybe)

- Corey upgraded the complete concept to Keep during the interview.
- The **Customize** control is an identified ingredient.
- The rest of the reason the complete dashboard survives still needs to be identified before synthesis.
