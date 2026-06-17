/**
 * ln-arc-lib — local Nx generator
 *
 * Scaffolds an internal lib under libs/<scope>/<type>/<name> applying the repo
 * conventions defined in the `monorepo-shared-libs` spec:
 *   - importPath  @ln/arc-<name>
 *   - tags        ["scope:<scope>", "type:<type>"]
 *   - targets     build / lint / test
 *   - buildable but NOT publishable (no npm publish target, no `publishable` flag)
 *   - registers the path alias in tsconfig.base.json automatically
 *
 * NOTE: authored in plain JS (not the .ts named in the spec) on purpose: this
 * workspace has no TS transpiler for generators (@swc/core, ts-node and
 * @swc-node/register are all absent), so a .ts generator cannot be executed by
 * `nx g`. Behaviour and output are identical to the spec'd contract.
 *
 * Usage:
 *   npx nx g ln-arc-lib --name=<name> --scope=<shared|foodit> --type=<ui|util|data-access>
 */
// @nx/devkit lo provee el runtime de Nx para generators (dep transitiva, no directa).
/* eslint-disable import/no-extraneous-dependencies */
const {
    formatFiles,
    updateJson,
    joinPathFragments,
    names
} = require('@nx/devkit');

const SCOPES = ['shared', 'foodit'];
const TYPES = ['ui', 'util', 'data-access'];

module.exports = async function lnArcLibGenerator(tree, options) {
    const rawName = (options.name || '').trim();
    const { scope, type } = options;

    // --- Validation: fail fast with descriptive messages -------------------
    if (!rawName) {
        throw new Error(
            'ln-arc-lib: --name is required (kebab-case), e.g. --name=format-date'
        );
    }
    if (!SCOPES.includes(scope)) {
        throw new Error(
            `ln-arc-lib: --scope must be one of [${SCOPES.join(', ')}], received "${scope}"`
        );
    }
    if (!TYPES.includes(type)) {
        throw new Error(
            `ln-arc-lib: --type must be one of [${TYPES.join(', ')}], received "${type}"`
        );
    }

    const name = names(rawName).fileName; // normalize to kebab-case
    const importPath = `@ln/arc-${name}`;
    const projectRoot = `libs/${scope}/${type}/${name}`;
    const indexPath = `${projectRoot}/src/index.ts`;

    if (tree.exists(`${projectRoot}/project.json`)) {
        throw new Error(`ln-arc-lib: a lib already exists at ${projectRoot}`);
    }

    // --- project.json — exact shape, buildable & non-publishable -----------
    const projectConfig = {
        $schema: '../../../../node_modules/nx/schemas/project-schema.json',
        name,
        projectType: 'library',
        sourceRoot: `${projectRoot}/src`,
        importPath,
        tags: [`scope:${scope}`, `type:${type}`],
        targets: {
            build: {
                executor: 'nx:run-commands',
                options: {
                    command: `echo "ln-arc-lib: ${name} is consumed via tsconfig path alias; no compile step in MVP1"`,
                    cwd: projectRoot
                }
            },
            lint: {
                executor: 'nx:run-commands',
                options: {
                    command: 'eslint --ext=ts,tsx,js,jsx .',
                    cwd: projectRoot
                }
            },
            test: {
                executor: 'nx:run-commands',
                options: {
                    command: 'jest --passWithNoTests',
                    cwd: projectRoot
                }
            }
        }
    };
    tree.write(
        `${projectRoot}/project.json`,
        `${JSON.stringify(projectConfig, null, 4)}\n`
    );

    // --- Public API entry point --------------------------------------------
    tree.write(
        indexPath,
        `// Public API for ${importPath}\n// Re-export the lib's surface from here. Nothing else should be imported directly.\nexport {};\n`
    );

    // --- README template ---------------------------------------------------
    tree.write(
        `${projectRoot}/README.md`,
        [
            `# ${importPath}`,
            '',
            `Internal ${type} lib (scope: \`${scope}\`). Generated with \`ln-arc-lib\`.`,
            '',
            '## Import',
            '',
            '```ts',
            `import { /* ... */ } from '${importPath}';`,
            '```',
            '',
            '## Conventions',
            '',
            `- **importPath**: \`${importPath}\``,
            `- **tags**: \`scope:${scope}\`, \`type:${type}\` (enforced by \`@nx/enforce-module-boundaries\`)`,
            '- **Buildable, not publishable** — internal to this monorepo only.',
            `- Public API lives in \`src/index.ts\`; consume only through the \`${importPath}\` alias.`,
            ''
        ].join('\n')
    );

    // --- Register path alias in tsconfig.base.json -------------------------
    updateJson(tree, 'tsconfig.base.json', json => {
        const compilerOptions = json.compilerOptions || {};
        const paths = compilerOptions.paths || {};
        return {
            ...json,
            compilerOptions: {
                ...compilerOptions,
                paths: {
                    ...paths,
                    [importPath]: [
                        joinPathFragments(projectRoot, 'src/index.ts')
                    ]
                }
            }
        };
    });

    await formatFiles(tree);

    return () => {
        // eslint-disable-next-line no-console
        console.info(`\n✔ Created ${importPath} at ${projectRoot}`);
        // eslint-disable-next-line no-console
        console.info(
            `  tsconfig.base.json path alias registered → ${projectRoot}/src/index.ts\n`
        );
    };
};
