import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/bitacora';
import mobile from '../../private/LN/api/v1/mobile';
import browser from '../../private/common/utils/browser';
// Url regex TODO: Mejorar la regular expression.
// ^\/api\/v([1]+)\/home\/(.*\/)$

const versions = {
    1: {
        bitacora,
        LN: bitacora
    }
};

const LNMainHome = props => {
    const { children, requestUri } = props;
    const homeType = browser.getParamFrom('params', 'tipo', requestUri);
    const diagramation =
        browser.getParamFrom('params', 'diagramacion', requestUri) ||
        'completa';

    const homeModels = versions[browser.getApiVersion(requestUri)];

    if (homeModels[homeType])
        return homeModels[homeType](children, diagramation) || null;

    throw new Error(`Se solicito una diagramacion inexistente`);
};

// LNMainHome.sections = [
//     'Banner-Megatop',
//     'Sticky-Mobile',
//     'Pre-Apertura',
//     'Apertura',
//     'Anexo-2',
//     'Breaking-1',
//     'Breaking-2',
//     'Breaking-3',
//     'Anexo-3',
//     'Opinion',
//     'Breaking-4',
//     'Breaking-5',
//     'Comercial-1',
//     'Bloque-2',
//     'Comercial-2',
//     'Bloque-3',
//     'Bloque-4',
//     'Bloque-5',
//     'Bloque-6',
//     'Bloque-7',
//     'Bloque-8',
//     'Aside'
// ];

export default Consumer(LNMainHome);
