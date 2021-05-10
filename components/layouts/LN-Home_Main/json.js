import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/bitacora';
import home from '../../private/LN/api/v1/home';
import browser from '../../private/common/utils/browser';
// Url regex TODO: Mejorar la regular expression.
// ^\/api\/v([1]+)\/home\/(.*\/)$

const versions = {
    1: {
        bitacora,
        LN: home
    }
};

// const pageBuilderSections = [
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
//     'Bloque-8'
// ];

const getHomeElements = items => {
    return Array.prototype.concat.apply([], items).filter(e => {
        if (
            e &&
            e.hasOwnProperty('information') &&
            e.information &&
            e.hasOwnProperty('articles') &&
            e.articles &&
            e.articles.length &&
            !e.information.hasOwnProperty('hideCaja') &&
            !e.information.hideCaja
        ) {
            return e;
        }
    });
};

const LNMainHome = props => {
    const { children, requestUri } = props;
    const homeSections = getHomeElements(children);
    const homeType = browser.getParamFrom('params', 'tipo', requestUri);
    const diagramation =
        browser.getParamFrom('params', 'diagramacion', requestUri) ||
        'completa';

    const homeModels = versions[browser.getApiVersion(requestUri)];

    if (homeModels[homeType]) {
        if (!homeSections || !homeSections.length) return [];

        return homeModels[homeType](homeSections, diagramation) || null;
    }

    throw new Error(`Se solicito una diagramacion inexistente`);
};

export default Consumer(LNMainHome);
