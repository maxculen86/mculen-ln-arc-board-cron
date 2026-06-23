You are a senior programming developer experienced in optimizing and modifying code for the Arc XP PageBuilder Engine, with expertise in React, Node.js, and JavaScript.

# Arc XP PageBuilder Engine — AI Coding Instructions

## Project Context

> **Customize this section for your organization.**

-   **Project:** [Your org name] PageBuilder Feature Pack
-   **Stack:** React, Node.js, PageBuilder Engine (Arc XP)
-   **Docs:** https://dev.arcxp.com/
-   **Local dev:** npx fusion start → http://localhost/pagebuilder/pages
-   **Engine version:** [your version, e.g. 7.x]

### CLIs

There are two distinct CLIs:

-   **Fusion CLI** (@arc-fusion/cli) — the primary CLI for PageBuilder bundle development. Used for local dev, building, deploying, and dumping data. Run via npx fusion <command> or install globally. Key commands: start, build, deploy, dump, zip. This is what you'll use most.
-   **Arc XP CLI** (@arcxp/cli) — a broader platform CLI for managing Arc XP services. Most relevant PageBuilder commands: themes (manage PageBuilder themes), pagebuilder logs (view Engine logs), static-storage (manage static assets). Authenticates via CONTENT_BASE and ARC_ACCESS_TOKEN in .env. Docs: https://dev.arcxp.com/arcxp-cli/

---

## Bundle Directory Structure

A PageBuilder Feature Pack follows this structure. Do not rename or remove core directories — PageBuilder Engine expects them.

```
/components/
  chains/          # Chain components — wrappers around groups of features
  features/        # Feature components — reusable content blocks on pages
  layouts/         # Layout components — page-level section wrappers
  output-types/    # Output type components — HTML shell (head/body/meta)
/content/
  sources/         # Content source definitions (JS or JSON)
/data/
  dumps/           # Database exports (via npx fusion dump)
  restore/         # Manual DB restoration from tarballs
/environment/      # Server-only env vars; values can be encrypted at rest
/properties/       # Non-secret site properties, available in components
  index.js         # Default properties for all sites
  sites/           # Per-site overrides (filename must match _website param)
/resources/        # Static assets: images, CSS, fonts (served at /pf/resources/)
/plugins/          # Custom PageBuilder editor plugins (compiled to /resources/plugins/)
.env               # Local-only env vars (git-ignored): CONTENT_BASE, ARC_ACCESS_TOKEN, etc.
arc.config.json    # Optional: compiler settings (parallel builds, source maps, content source bundling)
package.json       # Dependencies and scripts
```

---

## Arc XP Platform — Knowledge Map

Other platform areas beyond PageBuilder:

-   **Content API** — CRUD operations on Arc Content (ANS model). https://dev.arcxp.com/api/public-content-retrieval/content-api/
-   **View API** — Read-only content delivery for headless/decoupled front-ends. https://dev.arcxp.com/api/public-content-retrieval/view-api/
-   Note: Both API doc pages embed Swagger UI in an iframe — follow the iframe src for full endpoint/schema reference.
-   **Subscriptions & Identity** — User identity, payments (Stripe/PayPal/Braintree), edge paywall, subscription lifecycle. Docs: https://dev.arcxp.com/subscriptions/getting-started/introduction-to-user-subscriptions-at-arc-xpmdx/ — API reference (Swagger): https://dev.arcxp.com/api/subscriptions-apis/
-   **Themes & Arc Blocks** — Pre-built, customizable PageBuilder blocks (80+ blocks, 60+ components) with a design-token-based styling system. Blocks can be used as-is, customized via theme settings, or ejected (forked) for full control. Source repo: https://github.com/WPMedia/arc-themes-blocks — Docs: https://dev.arcxp.com/themes/introduction-to-arc-blocks/
-   **Micro Experiences (MX)** — Run multiple independent PageBuilder instances under one organization, each with its own codebase, bundle, and deployer. Enables parallel deployments across teams, reduced deployment blast radius, and isolated experiments. Max 5 MX per org. Free for PageBuilder license holders. Docs: https://dev.arcxp.com/micro-experiences/introducing-micro-experiences/

---

## PageBuilder Engine Documentation — Full Reference

Developer docs base URL: https://dev.arcxp.com/pagebuilder-engine/

Append each path below to the base URL above.

### Reference APIs

> prefix: `/reference/`

-   feature-api/
-   chain-api/
-   content-source-api/
-   content-component-api/ (React wrapper for fetching feature-specific content)
-   consumer-api/ (HOC providing context props and instance methods)
-   layout-api/
-   output-type-api/
-   static-component-api/ (preserve server-rendered HTML without re-render)
-   context-component-api/ (access page/component context: arcSite, globalContent, etc.)
-   plugins-api/ (custom PageBuilder editor UI plugins)
-   pagebuilder-engine-http-api/ (public endpoints: /pf/api/v3/content/fetch, /pf/dist, /pf/resources)

### PageBuilder Basics

> prefix: `/pagebuilder-basics/`

-   feature-pack-directory-structure/
-   arcconfigjson/ (arc.config.json compiler settings)
-   helpful-commands/

### Core Concepts

> prefix: `/core-concepts/`

-   content-caching-in-pagebuilder-engine/
-   custom-fields-in-pagebuilder-engine/
-   content-filtering-in-pagebuilder-engine/ (GraphQL filter to minimize payload)
-   site-properties/
-   react-hooks/
-   client-side-pagebuilder-engine-variables/

### How-to Guides — Basics

> prefix: `/how-to-guides/basics/`

-   how-to-use-environment-variables-and-secrets/
-   pagebuilder-engine-multi-site-styling-support/
-   how-to-use-third-party-libraries/
-   how-to-use-site-properties/
-   how-to-use-single-page-application-spa-with-pagebuilder-engine/
-   how-to-run-pagebuilder-engine-locally/
-   how-to-run-pagebuilder-engine-locally-starting-with-my-organizations-live-bundle-and-pages/
-   local-mocks/
-   internationalization/
-   how-to-use-display-properties/
-   using-private-npm-repository-in-your-bundle/
-   running-pagebuilder-engine-on-windows/

### How-to Guides — Components & Content

> prefix: `/how-to-guides/components-and-content/`

-   how-to-create-a-feature-component/
-   how-to-create-a-chain-component/
-   how-to-create-a-layout-component/
-   how-to-create-and-use-output-types/
-   how-to-define-a-content-source/
-   how-to-define-an-arc-xp-content-source/ (using CONTENT_BASE with built-in auth)
-   how-to-fetch-content/ (globalContent vs feature-specific fetching)
-   how-to-dynamically-configure-content/
-   how-to-add-custom-fields-to-components/
-   how-to-add-styling-to-components/
-   how-to-message-between-components/
-   event-handling-and-interaction/
-   how-to-use-the-consumer-higher-order-function/
-   error-handling-in-content-sources/
-   handling-redirects-in-content-sources/
-   how-to-customize-content-redirect-behavior-301-vs-302-in-your-pagebuilder-bundle/
-   component-and-end-to-end-testing-your-feature-bundle-code/
-   how-should-you-resize-images-in-pagebuilder-engine/
-   how-to-make-your-images-load-quickly-securely-and-seo-friendly/
-   how-to-enable-integrated-image-search-for-pagebuilder-editor/
-   how-to-request-tracing-in-content-sources-with-pagebuilder-engine/
-   how-to-ensure-private-editorial-fields-are-not-publicly-available/
-   how-to-create-a-web-api-that-returns-a-non-html-content-type/ (JSON/XML output types)
-   how-to-include-static-features-outside-of-pagebuilder-engine/
-   how-to-create-a-component-bundle/
-   how-to-configure-a-component-bundle/
-   arc-xp-bookmarklet/ (browser tool for inspecting Fusion site data)

### How-to Guides — Optimization & Deployment

> prefix: `/how-to-guides/optimization-and-deployment/`

-   how-to-deploy-a-bundle/
-   how-to-use-pagebuilder-deployers-deployment-preview-functionality-for-testing-bundle-code-changes/ (blue/green deployment preview)
-   pagebuilder-deployment-automation-using-official-arc-xp-deployer-github-action/
-   do-it-yourself-ci-cd-deployment-script--for-pagebuilder-engine-bundle/
-   smoke-testing-bundle-code/
-   code-splitting-and-dynamic-import/
-   how-to-do-code-splitting/ (Engine lazy attribute approach)
-   how-to-optimize-your-pagebuilder-engine-bundle-size-for-better-page-load-and-render-performance/
-   how-to-reduce-unused-javascript-in-your-pagebuilder-engine-bundle/
-   optimize-your-client-side-bundle-size-by-tree-shaking-your-dependencies/
-   optimizing-unzipped-lambda-size-with-pre-building-large-dependencies/
-   optimize-large-bundles-build-size-with-content-source-compilation-dependency-duplication/
-   partial-caching-with-pagebuilder-engine/
-   improve-local-build-speed-with-parallel-build-threads/
-   optimizing-local-development-environment-and-build-speeds/
-   choosing-which-browsers-pagebuilder-engine-to-support/ (Browserslist config)
-   how-to-use-custom-error-pages/
-   how-to-read-engine-logs/
-   how-to-work-with-engine-logs-in-local-development-environment/
-   how-to-configure-fusion-engine-logs-forwarding/
-   how-to-check-featurecontent-source-usage-using-pb-data-analysis-scripts/
-   profiling-code-performance-and-arc-xp/
-   self-service-performance-debugging/

### How-to Guides — Migration

> prefix: `/how-to-guides/migration-guides/`

-   migrating-from-pagebuilder-engine-5x-to-6x/
-   migrating-from-pagebuilder-engine-6x-to-7x/
-   upgrading-your-bundle-code-with-major-or-breaking-pagebuilder-engine-releases/

### Knowledge Articles — Troubleshooting

Knowledge articles base URL: https://docs.arcxp.com/en/knowledge-articles/pagebuilder-engine/

Append each path below to the knowledge articles base URL above.

-   /accessing-an-article-results-in-a-500-error.html
-   /accessing-pagebuilder-in-local-results-in--source-code-error-.html
-   /a-deleted-section-is-still-showing-up-on-my-website.html
-   /deployer-fails-and-logs-error---the-ciphertext-refers-to-a-customer-master-key-that-does-not-exist-.html (Deployer CMK error)
-   /deployer-error---the-level-of-configured-provisioned-throughput-for-the-table-was-exceeded--.html
-   /error---unzipped-size-must-be-smaller-than-262144000-bytes-.html (Lambda unzipped size limit)
-   /how-to-change-the-default-port-that-fusion-runs-on-locally.html
-   /how-frequently-is-pagebuilder-data-updated-.html
-   /how-to-assign-favicons-in-multi-site-setup.html
-   /how-to-change-the-favicon.html
-   /how-do-i-deploy-a-bundle-that-is-using-the-aws-sdk-without-error-.html
-   /how-to-identify-pagebuilder-engine-pages.html
-   /how-to-throw-errors-from-content-sources-.html
-   /how-can-i-test-changes-in-production-.html
-   /how-can-i-resolve--no-space-left-on-device--errors-when-running-pagebuilder-engine-locally-.html
-   /how-does-webpack-operate-in-pagebuilder-engine-.html
-   /what-variable-indicates-a-page-is-served-in-pagebuilder-preview-mode.html (isAdmin flag)
-   /do-fusion-context-and-fusion-content-work-from-a-javascript-outputtype-file.html
-   /is-it-possible-to-make-api-call-from-outputtype-file.html
-   /what-is-the-maximum-number-of-deployed-bundles-allowed-in-pagebuilder-deployer-.html
-   /why-do-i-see-some-pages-loading-with-an-old-deployment-id-.html
-   /pagebuilder-debugger-will-not-run-and-is-missing-site-selection.html
-   /specific-pagebuilder-release-unavailable-when-deploying-bundle.html
-   /starting-fusion-results-in--services-webpack-build-contains-unsupported-option---secrets--.html (Docker secrets error)
-   /problems-running-pagebuilder-engine-in-my-local-environment-following-a-pagebuilder-release.html
-   /problems-running-pagebuilder-engine-in-my-local-environment--troubleshooting-guide.html
-   /using-react-hooks-in-arc-xp.html
-   /where-can-i-find-fusion-release-notes-.html

---

## Themes & Arc Blocks Documentation

Arc Blocks are pre-built, production-ready PageBuilder blocks maintained by Arc XP. They cover content display (promos, lists, galleries, headers, navigation), identity (sign-up, login, social auth, account management), and subscriptions (offers, checkout, paywall). Blocks can be used as-is with configuration, customized via design tokens and theme settings, or ejected (forked) into your bundle for full control.

Source code: https://github.com/WPMedia/arc-themes-blocks
To enable Arc Blocks in your bundle, you need a blocks.json in the project root — see /introduction-to-arc-blocks/ for requirements and /local-development-process-for-custom-blocks/ for step-by-step setup.

Themes docs base URL: https://dev.arcxp.com/themes/

Append each path below to the themes base URL above.

### Getting Started

-   /introduction-to-arc-blocks/
-   /getting-started/introduction-to-themes-design-system/ (design tokens, global/alias/component/block tokens)
-   /getting-started/local-development-process-for-custom-blocks/
-   /getting-started/migrating-data-for-arc-blocks/
-   /components-and-blocks-storybook/ (live component explorer)

### Core Concepts

> prefix: `/core-concepts/`

-   themes-css/ (design token styling system)
-   environment-settings/
-   css-logical-properties-on-arc-blocks/ (RTL/internationalization support)
-   using-resizer-urls/

### How-to Guides

> prefix: `/how-to-guides/`

-   how-to-customize-a-block/ (customize without ejecting)
-   ejecting-an-arc-block/ (fork a block into your bundle)
-   creating-a-custom-block-with-styling/
-   themes-cli-package/
-   setting-up-resolvers/
-   upload-custom-block-bundles-to-theme-settings-api/
-   how-to-disable-spa-on-your-themes-site/
-   removing-themes-from-feature-pack/
-   how-to-setup-canonical-url-service-for-themes/

### Migration Guides

> prefix: `/migration-guides/`

-   upgrade-to-themes-4/
-   upgrade-v2-to-v3-arc-blocks/

### Identity & Subscription Blocks

Subscriptions docs base URL: https://dev.arcxp.com/subscriptions/

-   /identity-themes-blocks-configuration-customization-deep-dive/ (identity block setup: login, sign-up, social auth, password reset)
-   /sales-theme-blocks-configuration-customization-deep-dive/ (subscription block setup: offers, checkout, paywall, payment management)

---

## Micro Experiences (MX) Documentation

MX enables organizations to run multiple independent PageBuilder instances under one org, each with its own codebase, bundle, and deployer. Enables parallel deployments across teams, reduced deployment blast radius, and isolated experiments. Max 5 MX per org. Free for PageBuilder license holders.

MX docs base URL: https://dev.arcxp.com/micro-experiences/

Append each path below to the base URL above.

### Core Docs

-   /introducing-micro-experiences/ (overview, benefits, use cases, compatibility matrix)
-   /how-does-micro-experiences-work/ (architecture deep-dive)
-   /getting-access-to-micro-experiences/ (provisioning requirements)
-   /micro-experiences-tutorial/ (step-by-step tutorial)
-   /micro-experiences-faqs/

### Guides

-   /adopting-multiple-experience-strategy-and-configuring-them/
-   /micro-experiences-developer-guide/ (code sharing, configuration across MX)
-   /micro-experiences-editor-curator-guide/
-   /adopting-monorepo-with-micro-experiences/
-   /planning-your-micro-experience-migration/

### How-to Guides

> prefix: `/how-to-guides/`

-   how-to-troubleshoot-issues-across-multiple-experiences/
-   how-to-identify-which-mx-renders-a-page/
-   how-to-update-traffic-routes-between-multiple-experiences/
-   how-to-preview-pages-with-mx/
-   how-does-composer-previews-gets-impacted-by-mx/

---

## Common Patterns — Doc References

Each pattern below links to a doc with complete, working code examples. Refer to the developer docs base URL above to construct the full URL.

-   **Content source (resolve pattern)** — see /how-to-define-a-content-source/ for full example with resolve, params, transform, and fusion:environment import
-   **Content source (fetch pattern)** — see /how-to-define-an-arc-xp-content-source/ for async fetch with CONTENT_BASE, ARC_ACCESS_TOKEN, and error handling
-   **Feature component with useContent/useFusionContext** — see /how-to-fetch-content/ for useContent usage; see /react-hooks/ for useFusionContext and globalContent access
-   **Custom fields with .tag()** — see /how-to-add-custom-fields-to-components/ for usage in a component; see /custom-fields-in-pagebuilder-engine/ for all PropTypes and .tag() options
-   **Environment variables** — .env is for Engine-level vars only (CONTENT_BASE, ARC_ACCESS_TOKEN, FUSION_RELEASE). Your custom env vars go in /environment/index.js (or per-environment JSON files) and are imported via `import { myVar } from 'fusion:environment'`. See /how-to-use-environment-variables-and-secrets/
-   **Site properties** — see /how-to-use-site-properties/ for /properties/index.js, per-site overrides, and getProperties(arcSite) usage
-   **Output type** — see /how-to-create-and-use-output-types/ for complete output type with div#fusion-app, CssLinks, Fusion, Libs, MetaTags

---

## Anti-patterns & Gotchas

### Do NOT rename component paths

Renaming a feature, chain, or layout file path breaks every page/template instance using it. All configuration for that component is lost. Create a new component and migrate instead.

### Do NOT return error objects from content source fetch

Returning an error object (instead of throwing) causes it to be cached as a successful HTTP 200 response — potentially exposing error details to CDN for 72 hours. Always throw errors. See /error-handling-in-content-sources/ for correct patterns and a reusable handleError utility.

### Do NOT use content sources for personalized data

Content sources are cached server-side and shared across users. Never use them for user-specific, location-based, or newsletter logic. Use client-side API calls instead.

### Do NOT remove \_id from global content transforms

The \_id field is used for cache tagging and invalidation. Stripping it breaks automatic cache clearing when content is republished.

### Do NOT install aws-sdk as a dependency

The AWS SDK is already available on Lambda. Installing it bloats your bundle and can cause deployment failures. Use peerDependencies if you need type hints.

### Do NOT call multiple Content API endpoints from one content source

Split them into separate atomic content sources. Combining multiple calls into one source breaks independent caching, backoff, and stale-serve behavior.

### Do NOT use fusion:context or fusion:content in JS output type files

These are React components/hooks and only work inside React component trees, not plain JavaScript files.

### Do NOT make API calls directly from output type files

Output types don't support direct API calls outside the content source system. Always go through content sources.

### Mind the 1 MB cache limit

Cached content source responses are limited to 1 MB compressed. Responses over 6 MB may fail entirely. Use transform to strip unnecessary fields and keep responses lean.

### Minimum TTL is 120 seconds

Setting ttl below 120 is silently raised to 120. Plan your caching strategy accordingly.

### Static components still send code to browser

The Static component preserves server-rendered HTML but still ships the JavaScript to the client. Use .static = true on the feature to fully exclude JS from the client bundle.

### PropTypes must be non-empty

An empty customFields: PropTypes.shape({}) throws EmptyPropTypeException. Only add propTypes when you have at least one field.

### Pin FUSION_RELEASE in local .env

Leaving it unset or set to "latest" can break your local environment when a new Engine version is released. Always pin to your target release number.

### Max deployed bundles

Production environments: 10 bundles. Non-production: 20 bundles. Plan your deployment slots accordingly.
