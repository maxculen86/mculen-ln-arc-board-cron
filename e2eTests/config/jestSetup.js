import 'babel-polyfill';

const PROD_BASE_PATH = 'https://www.lanacion.com.ar';
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

const goto = async ({
    path,
    sandboxPath,
    params = { timeout: 25000, waitUntil: 'load' },
    website = 'la-nacion-ar'
}) => {
    const arcEndpoint = process.env.ARC_ENDPOINT;
    switch (arcEndpoint) {
        case 'PROD_PREVIEW': {
            const previewVersion = process.env.ARC_PREVIEW_VERSION;
            if (!previewVersion)
                throw new Error(
                    "La variable 'ARC_PREVIEW_VERSION' es obligatoria en modo PREVIEW"
                );
            const url = getPreviewUrl('PROD', previewVersion, path, website);
            await page.goto(url, params);
            return page.mainFrame();
        }
        case 'SANDBOX_PREVIEW': {
            const previewVersion = process.env.ARC_PREVIEW_VERSION;
            if (!previewVersion)
                throw new Error(
                    "La variable 'ARC_PREVIEW_VERSION' es obligatoria en modo PREVIEW"
                );
            const credential = process.env.SANDBOX_TOKEN;
            if (!credential)
                throw new Error(
                    "La variable 'SANDBOX_TOKEN' es obligatoria en modo SANDBOX_PREVIEW"
                );
            const url = getPreviewUrl(
                'SANDBOX',
                previewVersion,
                sandboxPath || path,
                website
            );
            const uri = new URL(url);
            context.addCookies([
                {
                    name: 'el_arc',
                    value: credential,
                    domain: uri.host,
                    path: '/'
                }
            ]);
            await page.goto(url, params);
            return await page.mainFrame();
        }
        case 'LOCAL': {
            const url = getLocalUrl(sandboxPath || path, website);
            await page.goto(url, params);
            return page.mainFrame();
        }
        case 'PROD':
        default: {
            const url = `${PROD_BASE_PATH}${path}`;
            await page.goto(url, params);
            return page.mainFrame();
        }
    }
};

global.arc = { goto };
