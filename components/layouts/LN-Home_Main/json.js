import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/bitacora';
import home from '../../private/LN/api/v1/home';
import browser from '../../private/common/utils/browser';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import {
    checkIfValid,
    findSectionChildren
} from '../../private/common/utils/validateSectionHome';

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

const validateSectionHome = (section, name, position, renderables) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const message = checkIfValid(name, sectionChildren);

    return message === true ? section : null;
};

const getHomeElements = props => {
    const { children, renderables } = props;

    return pageBuilderSections.reduce((r, e, i) => {
        const child = validateSectionHome(children[i], e, i, renderables);
        if (child && Array.isArray(child) && child.length > 0) {
            return r.concat(
                [].concat(
                    child
                        .filter(
                            b => b && b.information && !b.information.hideCaja
                        )
                        .map(b => {
                            return {
                                feature: homeMobileSections[i],
                                ...b
                            };
                        })
                ) || []
            );
        }
        return r;
    }, []);
};

const LNMainHome = props => {
    const { requestUri } = props;
    const homeSections = getHomeElements(props);
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
