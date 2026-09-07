# Task Plan: Card detail URL actions

## Goal
Update the card detail page so the source URL is an underlined copy link with a copy icon, clicking it copies the URL and shows “已复制网址”; change the lower button to “点击跳转” with a navigation icon.

## Phases
- [x] Phase 1: Locate the card detail implementation and current behavior
- [x] Phase 2: Implement the minimal UI/interaction changes
- [x] Phase 3: Run focused verification and review the diff

## Key Questions
1. Which component renders the card detail URL and lower action?
2. What icon/toast/navigation conventions does the project already use?

## Decisions Made
- Preserve existing styling and interaction patterns unless the requested behavior requires a change.

## Errors Encountered
- Initial skill path under ~/.codex was unavailable; used the installed ~/.agents skill files.

## Status
**Complete** - build, unit tests, diff checks, and desktop/mobile rendered interaction all passed.
