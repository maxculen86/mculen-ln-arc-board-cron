---
name: "Fusion: Debug Build"
description: Debug Fusion build issues with structured approach
category: Arc XP
tags: [fusion, debug, build]
---

Debug build or runtime issues in Fusion Engine app.

**Input**: Description of the error or issue

**When to use this vs OpenSpec:**
- ✅ Use `/fusion-debug`: Quick debugging, error investigation, build fixes
- ⚠️ Use `/opsx:explore`: Complex investigation, architectural issues, multiple unknowns

**Steps**

1. **Check for active OpenSpec change**
   ```bash
   openspec list --json 2>/dev/null || echo "No active changes"
   ```
   If debugging within active change context, mention it

2. **Gather context**

   Ask user:
   - When does it happen? (build, runtime, specific page)
   - Error message or behavior
   - Recent changes made
   - **Which site?** la-nacion-ar or foodit (affects debugging path)

3. **Read relevant specs**
   - Read `openspec/specs/build-system.md` for build process
   - Read `openspec/specs/styling.md` if CSS-related

4. **Run diagnostic commands**
   ```bash
   # Check current build status
   npm run build-dev 2>&1 | head -50

   # Check for common issues
   ls -la resources/dist/ 2>/dev/null || echo "No dist"
   ls -la .fusion/dist/ 2>/dev/null || echo "No fusion dist"

   # Check site-specific outputs if needed
   ls -la resources/dist/css/ln/ 2>/dev/null
   ls -la resources/dist/css/foodit/ 2>/dev/null
   ```

5. **Check common Arc XP issues**
   - Missing fusion imports
   - Invalid PropTypes
   - Circular dependencies
   - Missing content/data source config
   - CSS build errors (check src/statics/)
   - Tailwind scoping issues
   - Site mixing (LN vs Foodit components)
   - @ln lib CSS not copied (run `npm run ln:copycss`)

6. **Propose solution**
   Based on error:
   - Syntax error → show file + fix
   - Build error → check webpack config
   - Fusion error → check component patterns
   - Import error → verify paths + .fusion/
   - CSS error → check src/statics/ or @ln libs
   - Site-specific error → verify default.jsx vs foodit.jsx

7. **Verify fix**
   ```bash
   # Always verify build first
   npm run build-dev

   # Run tests ONLY for modified files (don't run full suite - it overloads IDE)
   # Extract test pattern from modified file paths
   # Examples:
   #   components/chains/utils/processLayoutItems.js → npm test -- processLayoutItems
   #   content/sources/utils/audioNews/helper.js → npm test -- audioNews

   # If multiple files: run each test pattern separately or recommend user runs in external terminal
   ```

   **Important**: Don't execute full `npm run test` - only run targeted tests for modified files. For comprehensive testing, recommend user runs full suite in external terminal.

**Guardrails**
- Always read error messages carefully
- Check .fusion/ is not corrupted
- **Don't modify webpack config** without approval
- **Don't modify output-types/** without site context
- Check site (la-nacion-ar vs foodit) before suggesting fixes
- Suggest `npm ci` if dependencies seem broken
- If issue is complex/architectural, suggest `/opsx:explore`
