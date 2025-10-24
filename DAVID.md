# DAVID.md

Quick reference guide for working with Claude Code on the Revelationary Research project.

## Starting a Task

**Be specific about scope:**
- ✅ "Add a collapsible alphabet nav to the glossary page"
- ❌ "Make the glossary better"

**Provide context when needed:**
- Share screenshots, error messages, or URLs
- Reference existing components as templates
- Mention if it's for mobile, desktop, or both

**Trust the CLAUDE.md file:**
- Claude reads it automatically - you don't need to repeat what's already documented
- Update CLAUDE.md when you discover new patterns or preferences

## During Work

**Let Claude work autonomously:**
- Claude will use TodoWrite to track tasks - you'll see progress
- Claude reads files, searches code, and makes decisions
- Interrupt only if Claude is going in the wrong direction

**Provide feedback iteratively:**
- "This works, but the spacing feels off"
- "Good, now add the same pattern to the lectionary page"
- "Actually, let's try a completely different approach..."

**Don't over-explain:**
- Claude can explore the codebase and figure things out
- If Claude asks clarifying questions, answer them
- If Claude doesn't ask, assume it found what it needed

## Git Workflow

**After Claude pushes to a `claude/*` branch:**

Option 1 (Recommended):
1. Click the GitHub PR link from Claude's push output
2. Review the auto-populated PR description
3. Click "Create pull request" → "Merge pull request"

Option 2 (Command line):
```bash
git checkout main
git merge claude/<long-branch-name>
git push origin main
```

**Clean up afterward:**
- Delete merged `claude/*` branches (they're temporary)
- Only keep branches you're actively working on

## Testing

**Our workflow:**
- Commit and push to main
- Vercel deploys automatically (1-2 minutes)
- Test at revelationary.net
- Give feedback, iterate

**Don't expect:**
- Claude to run `npm run dev` and test locally (not our practice)
- Claude to test on your devices (it can't)
- Perfect first iterations (iteration is the process)

## When Things Go Wrong

**Build failures:**
- Check Vercel deployment logs
- Share error with Claude: "Build failed with [error message]"

**PWA issues:**
- Uninstalling may not clear localStorage
- Code fixes can clear stale data (migration patterns)
- Test on your devices after deployment

**Hydration warnings:**
- Browser extensions (Grammarly, etc.) cause harmless warnings
- Check if warnings appear in production or just localhost
- Share screenshot if unclear whether it's real or extension-related

## Communication Style

**What works well:**
- "Good. Now add X."
- "This doesn't work because Y."
- "Any questions before you start?"
- "Stop. Let's try a different approach."

**Less effective:**
- Long explanations of what Claude should already know
- Apologizing for iteration (it's expected!)
- Asking Claude to do things it cannot do (e.g., test on your phone)

## Project-Specific Notes

**Reports:**
- Follow established patterns in existing reports
- Monochrome only (no colors except presentations)
- Citations use Unicode superscripts, not `<sup>` tags
- Always include Change Log, never "Revision History"

**Interactive presentations:**
- 16:9 aspect ratio, no scrollbars
- Colors allowed (exception to monochrome rule)
- Use existing presentations as templates

**Lectionary:**
- Will be separate app eventually
- Excluded from "last place read" persistence
- Keep separate from main Rev Research workflow

## Remember

- Claude Code is a tool, not a person - no need for pleasantries
- Iteration is valuable, not a sign of failure
- Your stop hooks will prevent unsafe operations
- You control what goes to production (via PR merge or manual push)
- When in doubt, ask Claude "Can you do X?" before assuming it can't
