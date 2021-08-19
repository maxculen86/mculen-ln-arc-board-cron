import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v1/home';
//import home from '../../private/LN/api/common/article/index';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';

import {
    checkIfValid,
    findSectionChildren
} from '../../private/common/utils/validateSectionHome';

const boxPosition = {
    Apertura_1: { id: 402, type: 1, feature: 'Banner', position: 'bottom' },
    Apertura_2: { id: 2000, type: 1, feature: 'Dolar', position: 'bottom' },
    Breaking_1: { id: 403, type: 1, feature: 'Banner', position: 'start' },
    Breaking_2: { id: 404, type: 1, feature: 'Banner', position: 'start' },
    Breaking_3: { id: 405, type: 1, feature: 'Banner', position: 'start' },
    Opinion: { id: 406, type: 1, feature: 'Banner', position: 'start' }
};

const homeMobileSections = [
    'Anticipo',
    'Anexo',
    'Bomba',
    'Apertura',
    'Apertura',
    'Anexo',
    'Tema1',
    'Tema2',
    'Tema3',
    'Anexo',
    'Opinion',
    'Tema4',
    'Tema5',
    'Tema6',
    'Comercial',
    'Tema7',
    'Comercial',
    'Tema8',
    'Tema9',
    'Tema10',
    'Tema11',
    'Tema12',
    'Tema13',
    'Tema14'
];

const validateSections = (section, name, position, renderables) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const elements =
        checkIfValid(name, sectionChildren) === true ? section : null;
    const banner = boxPosition[name];
    if (elements && elements.length > 0 && banner) {
        switch (banner.position) {
            case 'middle':
                elements.splice(Math.floor(elements.length / 2), 0, banner);
                break;
            case 'start':
                elements.unshift(banner);
                break;
            default:
                elements.push(banner);
                break;
        }
    }
    return elements;
};

const getHomeElements = props => {
    const { children, renderables, arcSite } = props;
    const configurations = {
        arcSite
    };
    return pageBuilderSections.reduce((r, e, i) => {
        const child = validateSections(children[i], e, i, renderables);
        const banner = boxPosition[e];
        if (child && Array.isArray(child) && child.length > 0) {
            return r.concat(
                [].concat(
                    child.reduce((res, b) => {
                        if (b) {
                            if (b.information && !b.information.hideCaja) {
                                const addedInfo = { ...b, configurations };
                                return res.concat({
                                    type: 0,
                                    feature: homeMobileSections[i],
                                    ...addedInfo
                                });
                            }
                            if (b.feature) {
                                return res.concat(b);
                            }
                        }
                        return res;
                    }, [])
                ) || []
            );
        }
        if (banner) {
            r.push(banner);
        }

        return r;
    }, []);
};

const LNMainHome = props => {
    const homeSections = getHomeElements(props);
    return home(homeSections) || [];
};

export default Consumer(LNMainHome);
