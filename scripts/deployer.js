#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * deployer.js — deploy manual del bundle apps/foodit-mx a Arc XP.
 *
 * Adaptado del deployer.js de referencia (POC Ingala, repo lanacion-arcxp-mx).
 * Diferencias respecto a la referencia:
 *   - Build vía `fusion build` (no `webpack` — el bundle MX es JS+CSS, no solo CSS).
 *   - Empaquetado vía `fusion zip` (no depende del binario `zip` del sistema,
 *     que no está garantizado en toda máquina de desarrollo).
 *   - Valida variables de entorno requeridas ANTES de tocar build/zip/upload,
 *     para fallar rápido con un mensaje descriptivo en vez de un error de red
 *     genérico a mitad de camino.
 *   - Sin dependencias nuevas: usa `fetch`/`FormData`/`Blob` nativos de Node 22
 *     en vez de `axios`/`form-data`, y un parser de `.env` propio en vez de `dotenv`.
 *
 * Uso (desde la raíz del repo):
 *   node scripts/deployer.js --sandbox   (default si no se pasa flag)
 *   node scripts/deployer.js --dev
 *   node scripts/deployer.js --st
 *   node scripts/deployer.js --prod
 *   node scripts/deployer.js --sandbox --no-mxid   (excepcional, ver nota abajo)
 *   node scripts/deployer.js --sandbox --promote   (promueve la versión deployada a "live")
 *
 * "Development" es un ambiente de Arc XP distinto de "Sandbox" (son ambientes
 * hermanos dentro del mismo "sandbox tier" de Arc, no el mismo) — tiene su
 * propio endpoint y su propio token, que hay que generar en Developer Center
 * igual que se hizo para Sandbox.
 *
 * Por defecto el deploy NUNCA promueve automáticamente, en ningún ambiente: el
 * mxId de sandbox es compartido entre todo el equipo, y promover pisa sin aviso
 * la demo que esté live en ese momento para cualquiera que la esté mirando. El
 * flag `--promote` es opt-in explícito (lo usa deployerInteractive.mjs recién
 * después de preguntarle al usuario).
 *
 * Por diseño, este script SIEMPRE apunta al mxId de foodit-mx (no hace falta pasar
 * ningún flag para activarlo). Este script solo opera sobre apps/foodit-mx/, que
 * nunca debería deployarse como si fuera el bundle "default" de la organización —
 * hacerlo por accidente pisaría el bundle que sirve el monolito en producción.
 * `--no-mxid` es una vía de escape explícita para el caso excepcional de querer
 * saltear el targeting de MX; no es el camino recomendado.
 *
 * Variables de entorno requeridas en apps/foodit-mx/.env:
 *   {SANDBOX|DEVELOP|STAGING|PROD}_DEPLOYER_ENDPOINT
 *   {SANDBOX|DEVELOP|STAGING|PROD}_DEPLOYER_ACCESS_TOKEN
 *   {SANDBOX|DEVELOP|STAGING|PROD}_DEPLOYER_FUSION_RELEASE   (opcional, default "latest")
 *   SANDBOX_MX_ID / PROD_MX_ID                       (requeridas salvo que se pase --no-mxid;
 *                                                      DEVELOP y STAGING reusan SANDBOX_MX_ID)
 *
 * CI/CD en Azure DevOps está fuera de scope de MVP1 — este script es manual.
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { promisify } = require('util');

const sleep = promisify(setTimeout);
const BUNDLE_DIR = path.join(__dirname, '..', 'apps', 'foodit-mx');

process.chdir(BUNDLE_DIR);

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

            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed.slice(eqIndex + 1).trim();
            parsed[key] = value; // si la key se repite en el archivo, gana la última ocurrencia
        });

    Object.entries(parsed).forEach(([key, value]) => {
        // las variables ya seteadas en el shell (antes de leer el archivo) tienen prioridad
        if (!alreadyInShell.has(key)) process.env[key] = value;
    });
};
loadEnvFile(path.join(BUNDLE_DIR, '.env'));

const environment = (() => {
    if (process.argv.includes('--prod')) return 'PROD';
    if (process.argv.includes('--st')) return 'STAGING';
    if (process.argv.includes('--dev')) return 'DEVELOP';
    return 'SANDBOX';
})();

const useMxId = !process.argv.includes('--no-mxid');
const shouldPromote = process.argv.includes('--promote');

const fail = message => {
    console.error(`❌ ${message}`);
    process.exit(1);
};

const requireEnv = name => {
    const value = process.env[name];
    if (!value) {
        fail(
            `Falta la variable de entorno "${name}" en apps/foodit-mx/.env. Ver apps/foodit-mx/.env.example.`
        );
    }
    return value;
};

const endpoint = requireEnv(`${environment}_DEPLOYER_ENDPOINT`);
const authToken = requireEnv(`${environment}_DEPLOYER_ACCESS_TOKEN`);
const pbVersion =
    process.env[`${environment}_DEPLOYER_FUSION_RELEASE`] || 'latest';

const sandboxMxId = process.env.SANDBOX_MX_ID || '';
const prodMxId = process.env.PROD_MX_ID || '';

const getMxId = () => {
    if (!useMxId) return '';
    // DEVELOP y STAGING reusan SANDBOX_MX_ID: comparten mxId con Sandbox
    // (todavía no hay un mxId provisionado por separado para esos ambientes).
    return environment === 'PROD' ? prodMxId : sandboxMxId;
};
const mxId = getMxId();

if (useMxId && !mxId) {
    fail(
        `${environment === 'PROD' ? 'PROD_MX_ID' : 'SANDBOX_MX_ID'} está vacío. ` +
            'El mxId "foodit-mx" debe estar provisionado en Arc antes de deployar (ver US #173238). ' +
            'Si de verdad querés deployar sin apuntar a la MX (no recomendado), pasá --no-mxid explícitamente.'
    );
}

const delay = Number(process.env.POLLING_DELAY) || 10000;
const timeout = Number(process.env.TIMEOUT) || 30;
const baseURL = `https://${endpoint}/deployments/fusion/`;

console.log(`Entorno: ${environment}`);
console.log(`mxId: ${mxId || '(sin usar)'}`);
console.log(`Fusion release: ${pbVersion}`);

const mxIdQuery = mxId ? `?mxId=${mxId}` : '';
const mxIdParam = mxId ? `mxId=${mxId}&` : '';
const authHeaders = { Authorization: `Bearer ${authToken}` };

const fetchJson = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
            `${options.method || 'GET'} ${url} → ${response.status} ${response.statusText}${body ? `: ${body}` : ''}`
        );
    }
    return response.json();
};

let latestServiceVersion = null;
let services = null;

const setServiceValues = ({ lambdas = [] } = {}) => {
    services = lambdas;
    latestServiceVersion =
        lambdas.length > 0 ? lambdas[lambdas.length - 1].Version : 0;
    console.log('Última versión de servicio:', latestServiceVersion);
};

const buildAndZip = () => {
    console.log('Buildeando el bundle (fusion build)...');
    execSync('npx fusion build', { stdio: 'inherit' });

    console.log('Empaquetando el bundle (fusion zip)...');
    execSync('npx fusion zip', { stdio: 'inherit' });

    const zipFiles = fs.existsSync('dist')
        ? fs.readdirSync('dist').filter(f => f.endsWith('.zip'))
        : [];

    if (zipFiles.length === 0) {
        throw new Error(
            '`fusion zip` no generó ningún archivo .zip en dist/. Revisar el output de arriba.'
        );
    }

    const [newest] = zipFiles.sort(
        (a, b) =>
            fs.statSync(path.join('dist', b)).mtimeMs -
            fs.statSync(path.join('dist', a)).mtimeMs
    );

    const zipPath = path.join('dist', newest);
    console.log(`Bundle empaquetado: ${zipPath}`);
    return zipPath;
};

const upload = async zipPath => {
    const servicesData = await fetchJson(`${baseURL}services${mxIdQuery}`, {
        headers: authHeaders
    });
    setServiceValues(servicesData);

    const branchName = execSync('git rev-parse --abbrev-ref HEAD')
        .toString()
        .trim();
    const commitHash = execSync('git log -n 1 --pretty=format:%h')
        .toString()
        .trim();
    const sanitize = str => str.replace(/[^a-zA-Z0-9_-]/g, '-');
    const hhmmss = new Date().toISOString().slice(11, 19).replace(/:/g, '');
    const bundleName = `${sanitize(branchName)}_${hhmmss}_${commitHash}`;

    const form = new FormData();
    form.append('name', bundleName);
    form.append(
        'bundle',
        new Blob([fs.readFileSync(zipPath)]),
        path.basename(zipPath)
    );

    // No seteamos Content-Type a mano: fetch arma el boundary de
    // multipart/form-data solo cuando el body es un FormData nativo.
    const response = await fetch(`${baseURL}bundles${mxIdQuery}`, {
        method: 'POST',
        headers: authHeaders,
        body: form
    });
    if (!response.ok) {
        const body = await response.text().catch(() => '');
        throw new Error(
            `POST ${baseURL}bundles → ${response.status} ${response.statusText}${body ? `: ${body}` : ''}`
        );
    }

    console.log(`Bundle subido a ${endpoint}/bundles como "${bundleName}"`);
    return bundleName;
};

const deploy = async bundleName => {
    await fetchJson(
        `${baseURL}services?${mxIdParam}bundle=${bundleName}&version=${pbVersion}`,
        { method: 'POST', headers: authHeaders }
    );
};

const checkDeployment = async limit => {
    console.log('Esperando a que el deploy complete...');
    /* eslint-disable no-await-in-loop */
    for (let i = 0; i < limit; i += 1) {
        await sleep(delay);
        const { lambdas = [] } = await fetchJson(
            `${baseURL}services${mxIdQuery}`,
            { headers: authHeaders }
        );
        const currentVersion =
            lambdas.length > 0 ? lambdas[lambdas.length - 1].Version : null;

        if (currentVersion && currentVersion !== latestServiceVersion) {
            console.log(
                'Bundle deployado correctamente. Versión:',
                currentVersion
            );
            return currentVersion;
        }
    }
    /* eslint-enable no-await-in-loop */

    throw new Error(
        'El bundle no terminó de deployar en el tiempo esperado. Se puede aumentar TIMEOUT, ' +
            'o puede que haya deployado igual — verificar manualmente en el panel de Arc.'
    );
};

const promote = async version => {
    if (!version)
        throw new Error('promote() requiere un número de versión válido');
    console.log('Promoviendo versión:', version);
    await fetchJson(`${baseURL}services/${version}/promote${mxIdQuery}`, {
        method: 'POST',
        headers: authHeaders
    });
};

const terminateOldest = async () => {
    const nonLiveServices = (services || []).filter(
        service => !service.Aliases
    );
    if (!nonLiveServices.length) return;

    const oldest = nonLiveServices.reduce((currentOldest, currentService) =>
        currentOldest.LastModified.localeCompare(currentService.LastModified) >
        0
            ? currentService
            : currentOldest
    );

    console.log('Terminando el servicio no-live más viejo...');
    try {
        await fetchJson(
            `${baseURL}services/${oldest.Version}/terminate?${mxIdParam}`,
            { method: 'POST', headers: authHeaders }
        );
    } catch (e) {
        console.warn(
            'No se pudo terminar el servicio viejo (no bloqueante):',
            e.message
        );
    }
};

(async () => {
    const zipPath = buildAndZip();
    const bundleName = await upload(zipPath);

    if (environment === 'SANDBOX') {
        await terminateOldest();
    }

    await deploy(bundleName);
    const version = await checkDeployment(timeout);

    if (shouldPromote) {
        await promote(version);
        console.log(`✅ Deploy y promote completos (versión ${version}).`);
    } else {
        console.log(
            `✅ Deploy completo (versión ${version}). Promote NO ejecutado — hacerlo manualmente en ${environment}.`
        );
    }

    try {
        fs.unlinkSync(zipPath);
    } catch (e) {
        console.warn(
            `No se pudo borrar el zip local ${zipPath} (no bloqueante):`,
            e.message
        );
    }
})().catch(err => {
    fail(`Error en el deploy: ${err.message}`);
});
