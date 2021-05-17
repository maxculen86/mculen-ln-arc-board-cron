import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/bitacora';
import home from '../../private/LN/api/v1/home';
import browser from '../../private/common/utils/browser';
import validateSectionHome from '../../private/common/utils/validateSectionHome';

// Url regex TODO: Mejorar la regular expression.
// ^\/api\/v([1]+)\/home\/(.*\/)$

const versions = {
    1: {
        bitacora,
        LN: home
    }
};

const homeMobileSections = [
    'Anticipo',
    'Anexo',
    'Bomba',
    'Apertura',
    'Anexo',
    'Tema',
    'Tema',
    'Tema',
    'Anexo',
    'Opinion',
    'Tema',
    'Tema',
    'Tema',
    'Comercial',
    'Tema',
    'Comercial',
    'Tema',
    'Tema',
    'Tema',
    'Tema',
    'Tema',
    'Tema',
    'Tema'
];

const getHomeElements2 = props => {
    const { children, outputType, isAdmin, renderables } = props;

    homeMobileSections.reduce((res, elem, index) => {
        debugger;
        const test = validateSectionHome(
            children[index],
            elem,
            index,
            renderables,
            outputType,
            isAdmin
        );
        return res;
    }, []);
};

const getHomeElements = items => {
    const features = items.reduce((res, elem, index) => {
        if (elem && Array.isArray(elem) && elem.length > 0) {
            const filtered = elem.filter(
                e => e && e.information && !e.information.hideCaja
            );
            if (filtered && Array.isArray(filtered) && filtered.length > 0) {
                res.push({
                    feature: homeMobileSections[index],
                    elements: filtered
                });
            }
        }
        return res;
    }, []);
    return features;
};

// TODO: INTEGRAR CON LOS CAMBIOS DE FER
export const getChainsFromSections = (renderable = [], sectionPosition) => {
    return get(renderable, `[${sectionPosition}].children`, []);
};

const LNMainHome = props => {
    const { children, requestUri } = props;
    // getHomeElements2(props);
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
