---
description: rigorous testing and documentation workflow using memory tools
---

# Test & Document Workflow

This workflow ensures that every feature and fix is rigorously tested for edge cases and documented in the memory system.

## 1. Context Acquisition
Before starting any task, understand the codebase context to avoid regressions.
- **Action**: Run `scan_repo` on the relevant directory.
- **Goal**: Identify dependencies, existing patterns, and potential conflict areas.

## 2. Branching
Always work in a sophisticated branching strategy.
- **Action**: Create a feature branch using `create_branch` (if available) or `git checkout -b feature/name`.
- **Naming Convention**: `feature/description` or `fix/issue-description`.

## 3. Implementation & Edge Case Identification
As you write code, simultaneously list potential edge cases.
- **Action**: Create a temporary `TEST_PLAN.md` in the current directory.
- **Content**:
    - [ ] Happy Path
    - [ ] Error State (Network failure, Invalid input)
    - [ ] Boundary Conditions (Empty lists, Max limits)
    - [ ] Concurrent usage (if applicable)

## 4. Verification & Testing
Execute the tests (manual or automated).
- **Action**: Run the app and verify each case in `TEST_PLAN.md`.
- **Constraint**: Do not proceed until all edge cases are handled.

## 5. Memory Documentation (The "Fix" Loop)
When a solution is verified or a tricky bug is solved, you MUST document it for the Hivemind.
- **Action**: Use `remember_fix` to save the pattern.
    - `error_message`: Describe the problem or the edge case (e.g., "Gallery masonry layout breaks on mobile resizing").
    - `solution`: The architectural pattern or code fix used.
    - `file_context`: The specific code snippet that fixed it.

## 6. Future Recall
Before starting the next similar task:
- **Action**: Use `recall_fix` with a query related to the current task to see if we've solved this before.

## 7. Committing
- **Action**: Commit changes with a descriptive message.
- **Action**: Push branch to origin.
