#!/usr/bin/env node
/**
 * MX Routing — activa/desactiva el MX Router de Arc XP para un path del site Foodit,
 * enrutándolo al Micro Experience donde vive el bundle `foodit-mx-1.0.0` o
 * devolviéndolo al bundle `default` del monolito (rollback).
 *
 * El MX se identifica por `{ENV}_MX_SLUG` (NO es "foodit-mx": el bundle se deploya
 * dentro de un MX existente — ej. `devlab-ln` en sandbox). Un mismo MX puede servir
 * varias secciones: cada `--path` es un prefijo que se agrega/quita de sus
 * `siteMappings`. Correr una vez por subárbol (`/recetas`, luego `/postres`, etc.).
 *
 * Mecanismo (MX Management API de Arc XP):
 *   - GET   /pagebuilder/mx/{slug}         → siteMappings actuales (+ guard de provisioning)
 *   - PATCH /pagebuilder/mx/{slug}         → siteMappings COMPLETO (agrega o quita el mapeo)
 *   Doc: https://dev.arcxp.com/micro-experiences/how-to-guides/how-to-update-traffic-routes-between-multiple-experiences/
 *
 * El rollback SOLO cambia el routing: el bundle deployado NO se toca.
 *
 * ⚠️ Rutear un path SIN que su código esté migrado+deployado en el bundle sirve
 *    tráfico real a un bundle que no sabe renderizarlo. Orden: migrar → deployar → rutear.
 *
 * Uso:
 *   node ./scripts/mx-routing.js --activate   --env sandbox --path /recetas
 *   node ./scripts/mx-routing.js --deactivate --env sandbox --path /recetas
 *   node ./scripts/mx-routing.js --activate   --env prod    --path /postres --site foodit
 *   node ./scripts/mx-routing.js --activate   --env sandbox --path /recetas --dry-run
 *
 * Flags:
 *   --activate | --deactivate   (requerido, mutuamente excluyentes)
 *   --env <develop|sandbox|staging|prod>   (requerido)
 *   --path <path-prefix>        (requerido, debe empezar con "/")
 *   --site <site>              (opcional, default "foodit")
 *   --dry-run                  (opcional, hace el GET pero omite el PATCH)
 *
 * Env vars requeridas (donde {ENV} ∈ DEVELOP | SANDBOX | STAGING | PROD):
 *   {ENV}_DEPLOYER_ENDPOINT         ej. api.sandbox.lanacionar.arcpublishing.com
 *                                   (host de Arc, compartido con el deployer)
 *   {ENV}_MX_ROUTING_ACCESS_TOKEN   token DEDICADO del Developer Center con scope
 *                                   MX Management / PageBuilder. ⚠️ NO reutilizar el
 *                                   token del deployer: ese tiene scope deployment-only
 *                                   y NO puede modificar siteMappings (PATCH /pagebuilder/mx).
 *   SANDBOX_MX_SLUG / PROD_MX_SLUG  slug del MX (ej. "devlab-ln" en sandbox — verificá con GET /pagebuilder/mx/).
 *                                   dev/staging reusan SANDBOX_MX_SLUG (comparten el MX de sandbox, igual que
 *                                   el deployer con {ENV}_MX_ID). La API usa el SLUG, no el id numérico.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

// ── Configuración del MX ────────────────────────────────────────────────────
const DEFAULT_SITE = 'foodit'; // site por defecto del siteMapping
const MX_BUNDLE = 'foodit-mx-1.0.0'; // bundle target cuando el routing está activo
const DEFAULT_BUNDLE = 'default'; // bundle target tras el rollback

const VALID_ENVS = ['develop', 'sandbox', 'staging', 'prod'];
const LOG_FILE = path.resolve(__dirname, 'logs/mx-routing.log');
const BUNDLE_DIR = path.join(__dirname, '..', 'apps', 'foodit-mx');

// ── Carga de apps/foodit-mx/.env (mismo parser propio que deployer.js) ───────
// Las variables ya presentes en el shell tienen prioridad sobre el archivo.
const loadEnvFile = envPath => {
    if (!fs.existsSync(envPath)) return;
    const alreadyInShell = new Set(Object.keys(process.env));
    const parsed = {};
    fs.readFileSync(envPath, 'utf8')
        .split('\n')
        .forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIndex = trimmed.indexOf('=');
            if (eqIndex === -1) return;
            parsed[trimmed.slice(0, eqIndex).trim()] = trimmed
                .slice(eqIndex + 1)
                .trim();
        });
    Object.entries(parsed).forEach(([key, value]) => {
        if (!alreadyInShell.has(key)) process.env[key] = value;
    });
};
loadEnvFile(path.join(BUNDLE_DIR, '.env'));

// ── Parseo de flags ─────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const has = flag => argv.includes(flag);
const flagValue = flag => {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : undefined;
};

const activate = has('--activate');
const deactivate = has('--deactivate');
const dryRun = has('--dry-run');
const env = (flagValue('--env') || '').toLowerCase();
const routePath = flagValue('--path');
const site = flagValue('--site') || DEFAULT_SITE;

function die(msg) {
    console.error(`✗ ${msg}`);
    process.exit(1);
}

// ── Validación de argumentos (fail fast) ────────────────────────────────────
if (activate === deactivate) {
    die('Especificá exactamente uno: --activate o --deactivate');
}
if (!VALID_ENVS.includes(env)) {
    die(`--env inválido o ausente. Usá uno de: ${VALID_ENVS.join(', ')}`);
}
if (!routePath || !routePath.startsWith('/')) {
    die('--path es requerido y debe empezar con "/" (ej. --path /recetas)');
}

// ── Validación de env vars (fail fast) ──────────────────────────────────────
const ENV_KEY = env.toUpperCase();
const endpoint = process.env[`${ENV_KEY}_DEPLOYER_ENDPOINT`]; // host de Arc (compartido)
const token = process.env[`${ENV_KEY}_MX_ROUTING_ACCESS_TOKEN`]; // token MX-scoped, dedicado
// El MX se identifica por SLUG (ej. "devlab-ln"), NO por el id numérico del deployer.
// dev/staging COMPARTEN el MX de sandbox → reusan SANDBOX_MX_SLUG (mismo criterio que
// deployer.js getMxId, que reusa SANDBOX_MX_ID). Solo PROD usa su propio slug.
const slugKey = ENV_KEY === 'PROD' ? 'PROD' : 'SANDBOX';
const mxSlug = process.env[`${slugKey}_MX_SLUG`];

if (!endpoint) die(`Falta la variable de entorno ${ENV_KEY}_DEPLOYER_ENDPOINT`);
if (!token) {
    die(
        `Falta la variable de entorno ${ENV_KEY}_MX_ROUTING_ACCESS_TOKEN — ` +
            'token del Developer Center con scope MX Management (NO el del deployer, que es deployment-only)'
    );
}
if (!mxSlug) {
    die(
        `Falta la variable de entorno ${slugKey}_MX_SLUG — slug del MX en Arc (ej. "devlab-ln"; verificá con GET /pagebuilder/mx/). ` +
            'dev/staging reusan SANDBOX_MX_SLUG (comparten el MX de sandbox, igual que el deployer).'
    );
}

const baseUrl = `https://${endpoint.replace(/^https?:\/\//, '')}/pagebuilder/mx/${mxSlug}`;
const maskedToken = `…${token.slice(-4)}`;
const operator = process.env.USER || os.userInfo().username || 'unknown';

// ── Log de auditoría ─────────────────────────────────────────────────────────
function writeLog(action, resultingBundle) {
    const entry = {
        timestamp: new Date().toISOString(),
        action, // 'activate' | 'deactivate'
        path: routePath,
        site,
        resultingBundle, // bundle que servirá el path tras la operación
        env,
        mxSlug,
        operator,
        token: maskedToken,
        dryRun
    };
    const line = JSON.stringify(entry);
    console.info(`📝 ${line}`);
    try {
        fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
        fs.appendFileSync(LOG_FILE, `${line}\n`);
    } catch (err) {
        console.warn(`⚠  no se pudo escribir el log en disco: ${err.message}`);
    }
}

// ── Llamadas a la MX Management API ─────────────────────────────────────────
const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
};

async function fetchMx() {
    const res = await fetch(baseUrl, { method: 'GET', headers });
    if (res.status === 404) {
        die(
            `GET ${baseUrl} → 404: no se pudo resolver el MX "${mxSlug}" (${env}). Causas posibles:\n` +
                `  1) el MX no está provisionado en Arc (US #173238, Equipo Plataforma);\n` +
                `  2) el slug es incorrecto (la MX Service API usa el SLUG, ej. "devlab-ln" en sandbox — verificá con GET /pagebuilder/mx/, no el id numérico del deployer);\n` +
                `  3) el token no tiene scope PageBuilder/MX (Arc puede devolver 404 para recursos fuera de scope).\n` +
                'Confirmá los tres con Plataforma antes de rutear.'
        );
    }
    if (res.status === 401 || res.status === 403) {
        die(
            `Credenciales inválidas o sin scope para ${env} (HTTP ${res.status}). ` +
                `Revisá ${ENV_KEY}_MX_ROUTING_ACCESS_TOKEN — debe tener scope MX Management (no deployment-only).`
        );
    }
    if (!res.ok) {
        die(`GET ${baseUrl} falló con HTTP ${res.status}: ${await res.text()}`);
    }
    return res.json();
}

async function patchSiteMappings(siteMappings) {
    if (dryRun) {
        console.info(
            '🧪 --dry-run: se omite el PATCH. siteMappings que se enviarían:'
        );
        console.info(JSON.stringify({ siteMappings }, null, 2));
        return;
    }
    const res = await fetch(baseUrl, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ siteMappings })
    });
    if (!res.ok) {
        die(
            `PATCH ${baseUrl} falló con HTTP ${res.status}: ${await res.text()}`
        );
    }
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
    const action = activate ? 'activate' : 'deactivate';
    console.info(
        `▶ ${action} MX Router — ${routePath} (site ${site}, ${env}) ${dryRun ? '[dry-run]' : ''}`
    );

    const mx = await fetchMx(); // también actúa como guard de provisioning
    const current = Array.isArray(mx.siteMappings) ? mx.siteMappings : [];
    const isMapped = current.some(m => m.path === routePath && m.site === site);

    let next;
    let resultingBundle;

    if (activate) {
        if (isMapped) {
            console.info(
                `ℹ  ${routePath} ya está enrutado a ${MX_BUNDLE} — no-op`
            );
        }
        next = isMapped ? current : [...current, { path: routePath, site }];
        resultingBundle = MX_BUNDLE;
    } else {
        if (!isMapped) {
            console.info(
                `ℹ  ${routePath} no estaba enrutado al MX — no-op (ya lo sirve ${DEFAULT_BUNDLE})`
            );
        }
        next = current.filter(m => !(m.path === routePath && m.site === site));
        resultingBundle = DEFAULT_BUNDLE;
    }

    await patchSiteMappings(next);
    writeLog(action, resultingBundle);

    console.info(
        `✓ ${dryRun ? '[dry-run] ' : ''}${routePath} → ${resultingBundle} (${env})`
    );
    if (!dryRun) {
        console.info(
            '⏳ La propagación de CDN puede tardar ~10-20 min (o ~5 min con purga manual).'
        );
    }
}

main().catch(err => die(err.message));
