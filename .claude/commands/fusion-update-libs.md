---
name: "Fusion: Update Library"
description: Update npm dependencies with structured verification
category: Arc XP
tags: [fusion, dependencies, libs, update]
---

Update npm library/dependency version with proper verification and testing guidance.

**Input**: Library name and target version (e.g., "@ln/user.client.libs 7.6.0")

**When to use this vs OpenSpec:**
- ✅ Use `/fusion-update-libs`: Single library update, minor/patch version bump, known library
- ⚠️ Use `/opsx:new`: Multiple libraries, major version bump, unknown breaking changes, complex migration

**Steps**

1. **Verify current state**
   ```bash
   # Check current version
   grep -A 2 "LIBRARY_NAME" package.json

   # Check if library is in dependencies or devDependencies
   cat package.json | grep -E "(dependencies|devDependencies)" -A 50
   ```

2. **Research changes**
   - Check changelog/releases between current and target version
   - Look for breaking changes, deprecations, new features
   - Note migration steps if mentioned
   - Use GitHub releases, npm page, or official docs

3. **Identify critical areas** based on library:
   - `@ln/user.client.libs` → Login (LN + foodit), token rotation
   - `@ln/ui` → UI components usage across app
   - `react`/`react-dom` → All components, render behavior
   - `styled-components` → All styling, theming
   - `fusion:*` → Arc XP integration, content/data sources
   - Testing libs → Test suite execution
   - Build tools → Build process, bundle output

4. **Update package.json**
   ```bash
   # Edit package.json to update version
   # Use Edit tool to change version
   ```

5. **Install and verify**
   ```bash
   npm install
   npm run build-dev
   ```

6. **Identify stakeholders** (if applicable):
   - UCL updates → Lucas Barbosa (Pocho) for token rotation
   - UI libs → Design team for visual regression
   - Arc XP libs → Arc XP team for Fusion compatibility
   - Security libs → Security team for validation

7. **Recommend testing plan**
   Create specific, actionable testing checklist:
   - [ ] Build passes (`npm run build-dev`)
   - [ ] Relevant tests pass (specify which)
   - [ ] Manual testing areas (be specific)
   - [ ] Stakeholder validation (if needed)
   - [ ] No console errors in dev

   **Don't run full test suite** - recommend user runs in external terminal

8. **Check for additional steps**
   - Any new peer dependencies?
   - Config changes needed?
   - Code changes required for compatibility?
   - New features to adopt?

**Guardrails**
- **Single library only** - for multiple libs, use `/opsx:new`
- **Check semver** - major bumps (x.0.0) warrant more caution
- **Don't update without research** - always check changelog first
- **Don't skip install** - lockfile must be updated
- **Don't assume backwards compatibility** - verify breaking changes
- **Identify testing scope** - be specific about what to test
- **Mention stakeholders** - some libs have designated owners
- If changelog shows complex migration → suggest `/opsx:new` instead

**Examples**

Good use cases:
- `@ln/user.client.libs` 7.3.0 → 7.6.0 (minor bump)
- `lodash` 4.17.20 → 4.17.21 (patch bump)
- `@ln/ui` 2.1.0 → 2.3.0 (minor bump, known lib)

Should use OpenSpec:
- `react` 17 → 18 (major bump, breaking changes)
- Multiple libs at once (10+ libraries)
- Library with unknown impact on codebase
- Major version bumps with migration guides
