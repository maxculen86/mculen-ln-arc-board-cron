---
name: "Fusion: New Component"
description: Create a new Fusion component following Arc XP patterns
category: Arc XP
tags: [fusion, component, arc-xp]
---

Create a new Fusion Engine component following project conventions.

**Input**: Component name and type (layout, feature, or private)

**When to use this vs OpenSpec:**
- ✅ Use `/fusion-component`: Simple component, quick addition, < 30 min work
- ⚠️ Use `/opsx:new`: Complex feature, multiple components, needs planning

**Steps**

1. **Check for active OpenSpec change**
   ```bash
   openspec list --json 2>/dev/null || echo "No active changes"
   ```
   If there's an active change, ask: "Continue with `/opsx:continue` or create standalone?"

2. **Determine component details and site**

   If not provided, use AskUserQuestion to ask:
   - **Site:** la-nacion-ar or foodit? (CRITICAL - affects all naming)
   - Component type (layout, feature, private)
   - Component name (PascalCase)
   - Brief description of what it does

3. **Read the component patterns**
   ```bash
   # Read fusion-components spec for patterns
   ```
   Read `openspec/specs/fusion-components.md` for structure patterns

4. **Check if similar component exists**
   ```bash
   find components/{layouts,features} -type f -name "index.jsx" | head -10
   ```
   Show examples to user

5. **Ask for confirmation**
   Confirm with user:
   - Site: la-nacion-ar or foodit
   - Component path: `components/{type}/{Site-name}/`
   - Will create: index.jsx, {name}.test.js
   - Pattern to follow: consumer/presenter or simple component

6. **Create component structure**
   - Create directory following site naming:
     - la-nacion-ar: `LN-{name}` or `components/features/LN/{name}`
     - foodit: `Foodit-{name}` or `components/features/foodit-global/{name}`
   - Create index.jsx with proper Fusion imports
   - **DO NOT create styles.scss in component** (styling handled separately)
   - Create test file
   - Follow patterns from fusion-components.md

7. **Next steps**
   Suggest:
   - Run `npm run test` to verify
   - Add to layout if needed
   - Check if @ln/common-ui has similar component first
   - For styles, see `openspec/specs/styling.md`

**Guardrails**
- Check if OpenSpec change is active first
- Always read fusion-components.md spec first
- **NEVER create in output-types/** without explicit permission
- **NEVER mix sites** (LN vs Foodit naming)
- Verify component doesn't already exist
- Follow consumer/presenter pattern for features
- **DO NOT create styles.scss in component** - read styling.md spec
- For complex features (> 30min), suggest `/opsx:new` instead
