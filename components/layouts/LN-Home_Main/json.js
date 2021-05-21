import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v1/home';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';

import {
    checkIfValid,
    findSectionChildren
} from '../../private/common/utils/validateSectionHome';

const bannersPosition = {
    4: { id: 403, type: 1, feature: 'Banner' },
    5: { id: 404, type: 1, feature: 'Banner' },
    6: { id: 405, type: 1, feature: 'Banner' },
    7: { id: 406, type: 1, feature: 'Banner' },
    9: { id: 407, type: 1, feature: 'Banner' }
};

const homeMobileSections = [
    'Anticipo',
    'Anexo',
    'Bomba',
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
    return checkIfValid(name, sectionChildren) === true ? section : null;
};

const getHomeElements = props => {
    const { children, renderables, arcSite } = props;
    const configurations = {
        arcSite
    };
    return pageBuilderSections.reduce((r, e, i) => {
        const child = validateSections(children[i], e, i, renderables);
        const banner = bannersPosition[i];
        if (child && Array.isArray(child) && child.length > 0) {
            return r.concat(
                [].concat(
                    child.reduce((res, b) => {
                        if (b && b.information && !b.information.hideCaja) {
                            const addedInfo = { ...b, configurations };
                            return res.concat({
                                type: 0,
                                feature: homeMobileSections[i],
                                ...addedInfo
                            });
                        }
                        return res;
                    }, [])
                ) || [],
                banner || []
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
    return home(homeSections) || null;
};

export default Consumer(LNMainHome);
