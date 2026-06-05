#!/usr/bin/env node
/**
 * Syncs apps/foodit-mx against the root (source of truth: origin/develop):
 *   1. @ln/* (and react/react-dom) versions in package.json
 *   2. Auth token block in .npmrc (needed by fusion start Docker build)
 *
 * Usage:
 *   npm run sync:mx              — update both + report
 *   npm run sync:mx -- --check   — report only, exit 1 if anything is out of sync
 *
 * When your Azure DevOps PAT expires:
 *   1. Update the token in root .npmrc (or ~/.npmrc if you keep it there too)
 *   2. Run: npm run sync:mx
 */

const fs = require('fs');
const path = require('path');

const CHECK_ONLY = process.argv.includes('--check');
const ROOT = path.resolve(__dirname, '..');
const ROOT_PKG = path.join(ROOT, 'package.json');
const MX_PKG = path.join(ROOT, 'apps/foodit-mx/package.json');
const ROOT_NPMRC = path.join(ROOT, '.npmrc');
const MX_NPMRC = path.join(ROOT, 'apps/foodit-mx/.npmrc');

let exitCode = 0;

// ── 1. Sync package.json versions ──────────────────────────────────────────

const root = JSON.parse(fs.readFileSync(ROOT_PKG, 'utf8'));
const mx = JSON.parse(fs.readFileSync(MX_PKG, 'utf8'));
const rootDeps = { ...root.dependencies, ...root.devDependencies };
const isTracked = k =>
    k.startsWith('@ln/') || k === 'react' || k === 'react-dom';

const pkgChanges = [];

['dependencies', 'devDependencies']
    .filter(section => mx[section])
    .forEach(section => {
        Object.entries(mx[section])
            .filter(
                ([pkg, ver]) =>
                    isTracked(pkg) && rootDeps[pkg] && rootDeps[pkg] !== ver
            )
            .forEach(([pkg, ver]) => {
                pkgChanges.push({ section, pkg, from: ver, to: rootDeps[pkg] });
                if (!CHECK_ONLY) {
                    mx[section][pkg] = rootDeps[pkg]; // eslint-disable-line no-param-reassign
                }
            });
    });

if (pkgChanges.length === 0) {
    console.info('✓ package.json — in sync');
} else if (CHECK_ONLY) {
    console.error(
        `✗ package.json — ${pkgChanges.length} version(s) out of sync:`
    );
    pkgChanges.forEach(({ pkg, from, to }) =>
        console.error(`    ${pkg}: ${from} → ${to}`)
    );
    exitCode = 1;
} else {
    fs.writeFileSync(MX_PKG, `${JSON.stringify(mx, null, 4)}\n`);
    console.info(`✓ package.json — updated ${pkgChanges.length} version(s):`);
    pkgChanges.forEach(({ pkg, from, to }) =>
        console.info(`    ${pkg}: ${from} → ${to}`)
    );
}

// ── 2. Sync .npmrc auth token ───────────────────────────────────────────────

const rootNpmrc = fs.readFileSync(ROOT_NPMRC, 'utf8');
const mxNpmrc = fs.readFileSync(MX_NPMRC, 'utf8');

const AUTH_RE = /; begin auth token[\s\S]*?; end auth token/;
const rootAuth = rootNpmrc.match(AUTH_RE)?.[0];
const mxAuth = mxNpmrc.match(AUTH_RE)?.[0];

if (!rootAuth) {
    console.warn(
        '⚠  .npmrc — no auth block found in root .npmrc, skipping token sync'
    );
} else if (rootAuth === mxAuth) {
    console.info('✓ .npmrc  — token in sync');
} else if (CHECK_ONLY) {
    console.error(
        '✗ .npmrc  — token out of sync (run without --check to update)'
    );
    exitCode = 1;
} else {
    const scopeLine = mxNpmrc.match(/@ln:registry=.+/)?.[0] ?? '';
    fs.writeFileSync(MX_NPMRC, `${scopeLine}\n${rootAuth}\n`);
    console.info('✓ .npmrc  — token synced from root .npmrc');
}

if (pkgChanges.length > 0 && !CHECK_ONLY) {
    console.info(
        '\nRun `npm install` in apps/foodit-mx/ to apply package changes.'
    );
}

process.exit(exitCode);
