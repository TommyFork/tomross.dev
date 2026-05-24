---
description: Stage changes, generate a commit message, commit, and push
allowed-tools: Bash(git add .), Bash(git status), Bash(git log -1 --format='%an %ae'), Bash(git commit -m *), Bash(git push)
---
# Context
- Status: !`git status`
- Diff: !`git diff HEAD`

# Instructions
1. Check if there are changes to commit. If not, stop.
2. Stage all changes using `git add .`
3. Generate a concise, conventional commit message based on the diff. Use the required prefix (feat, fix, chore, etc.) but keep the description lowercase (e.g. `feat: add dark mode`, not `feat: Add dark mode`).
4. Commit the changes using that message.
5. Push the changes to the current branch.