import 'babel-polyfill';

const PROD_BASE_PATH = 'https://www.lanacion.com.ar';
const SANDBOX_BASE_PATH = 'https://sandbox.lanacion.com.ar';
const PREVIEW_BASE_PATH =
    'http://lanacionar-{{WEBSITE}}-{{ENV}}.cdn.arcpublishing.com{{PATH}}?d={{VERSION}}';
const LOCAL_BASE_PATH = 'http://localhost/pf{{PATH}}?_website={{WEBSITE}}';

jest.retryTimes(3);
jest.setTimeout(25000);

const getPreviewUrl = (env, version, path, website = 'la-nacion-ar') => {
    return PREVIEW_BASE_PATH.replace(
        '{{ENV}}',
        env === 'SANDBOX' ? 'sandbox' : 'prod'
    )
        .replace('{{WEBSITE}}', website)
        .replace('{{PATH}}', path)
        .replace('{{VERSION}}', version);
};

const getLocalUrl = (path, website = 'la-nacion-ar') => {
    return LOCAL_BASE_PATH.replace('{{PATH}}', path).replace(
        '{{WEBSITE}}',
        website
    );
};

const addSandboxCookieAsync = async url => {
    const credential = process.env.SANDBOX_TOKEN;
    if (!credential)
        throw new Error(
            "La variable 'SANDBOX_TOKEN' es obligatoria en modo SANDBOX_PREVIEW"
        );
    const uri = new URL(url);
    await context.addCookies([
        {
            name: 'el_arc',
            value: credential,
            domain: uri.host,
            path: '/'
        }
    ]);
};

const getPreviewVersion = () => {
    const previewVersion = process.env.ARC_PREVIEW_VERSION;
    if (!previewVersion)
        throw new Error(
            "La variable 'ARC_PREVIEW_VERSION' es obligatoria en modo PREVIEW"
        );
    return previewVersion;
};

const goto = async ({
    path,
    sandboxPath,
    params = { timeout: 25000, waitUntil: 'load' },
    website = 'la-nacion-ar'
}) => {
    const arcEndpoint = process.env.ARC_ENDPOINT;
    let url;
    switch (arcEndpoint) {
        case 'PROD_PREVIEW': {
            const previewVersion = getPreviewVersion();
            url = getPreviewUrl('PROD', previewVersion, path, website);
            break;
        }
        case 'SANDBOX_PREVIEW': {
            const previewVersion = getPreviewVersion();
            url = getPreviewUrl(
                'SANDBOX',
                previewVersion,
                sandboxPath || path,
                website
            );
            await addSandboxCookieAsync(url);
            break;
        }
        case 'LOCAL': {
            url = getLocalUrl(sandboxPath || path, website);
            break;
        }
        case 'SANDBOX': {
            url = `${SANDBOX_BASE_PATH}${sandboxPath || path}`;
            await addSandboxCookieAsync(url);
            break;
        }
        case 'PROD':
        default: {
            url = `${PROD_BASE_PATH}${path}`;
            break;
        }
    }

    if (process.env.DEBUG) {
        console.debug('Realizando request contra url: ', url);
    }
    const resp = await page.goto(url, params);
    if (!resp.ok())
        throw new Error(
            `Error al obtener la url ${url}. StatusCode: ${resp.status()}, ${resp.statusText()}`
        );

    return page.mainFrame();
};

global.e2e = { goto };
