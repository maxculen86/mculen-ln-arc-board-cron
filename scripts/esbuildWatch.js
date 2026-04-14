const fs = require('fs');
const path = require('path');
const glob = require('glob');
const esbuild = require('esbuild');

const SRC_DIR = path.resolve(__dirname, '../src/statics');
const OUT_DIR = path.resolve(__dirname, '../resources/js');

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function renameMinPlugin(outdir, entryFile) {
    const baseName = path.basename(entryFile, '.js');
    const minName = `${baseName}.min.js`;

    return {
        name: 'rename-to-min',
        setup(build) {
            build.onEnd(() => {
                const rawPath = path.join(outdir, `${baseName}.js`);
                const minPath = path.join(outdir, minName);
                if (fs.existsSync(rawPath)) {
                    fs.renameSync(rawPath, minPath);
                }

                const timestamp = new Date().toLocaleTimeString();
                const folderName = path.basename(outdir);
                console.info(
                    `${CYAN}[esbuild-watch]${RESET} ${GREEN}✔ rebuilt${RESET} resources/js/${folderName}/${minName} ${timestamp}`
                );
            });
        }
    };
}

function getEntryConfigs(folderName) {
    const folderPath = path.join(SRC_DIR, folderName);
    const jsSubdir = path.join(folderPath, 'js');
    const hasJsSubdir =
        fs.existsSync(jsSubdir) && fs.statSync(jsSubdir).isDirectory();

    const pattern = hasJsSubdir
        ? path.join(jsSubdir, '*.js').replace(/\\/g, '/')
        : path.join(folderPath, '*.js').replace(/\\/g, '/');

    const outdir = path.join(OUT_DIR, folderName);

    return glob.sync(pattern).map(entryPoint => ({ entryPoint, outdir }));
}

async function createEntryContext({ entryPoint, outdir }) {
    fs.mkdirSync(outdir, { recursive: true });

    const ctx = await esbuild.context({
        entryPoints: [entryPoint],
        bundle: true,
        minify: true,
        outdir,
        plugins: [renameMinPlugin(outdir, entryPoint)],
        logLevel: 'warning'
    });

    return ctx;
}

async function main() {
    const folders = fs.readdirSync(SRC_DIR).filter(name => {
        const p = path.join(SRC_DIR, name);
        return fs.statSync(p).isDirectory();
    });

    const entryConfigs = folders.flatMap(getEntryConfigs);

    if (entryConfigs.length === 0) {
        console.info('[esbuild-watch] No entry points found, exiting.');
        return;
    }

    const contexts = await Promise.all(entryConfigs.map(createEntryContext));

    await Promise.all(contexts.map(ctx => ctx.watch()));

    console.info(
        `[esbuild-watch] Watching ${contexts.length} script(s) across: ${folders.join(', ')}`
    );
    console.info('[esbuild-watch] Press Ctrl+C to stop');

    // NOTE: If a new .js file is added to src/statics/ after the watcher starts,
    // restart this script so esbuild picks up the new entry point.

    process.on('SIGINT', async () => {
        await Promise.all(contexts.map(ctx => ctx.dispose()));
        process.exit(0);
    });
}

main().catch(err => {
    console.error('[esbuild-watch] Fatal error:', err);
    process.exit(1);
});
