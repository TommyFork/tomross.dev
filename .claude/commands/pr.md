---
description: Generate title/description and create a PR
allowed-tools: Bash(gh *), Bash(git *)
---
# Context
- Branch: !`git branch --show-current`
- Diff: !`git diff main...HEAD`

# Instructions
1. Analyze the differences between the current branch and main.
2. Draft a PR Title (conventional format) and a Description (bullet points of changes).
3. Present them to me for confirmation.
4. If I approve, run:
   `gh pr create --title "YOUR_TITLE" --body "YOUR_DESCRIPTION" --web`