import { get } from 'lodash';
import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v1/global/home';
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

const boxMovePosition = {
    App_Anexo_1: { type: 2, feature: 'Apertura_1', position: 'start' },
    App_Anexo_2: { type: 2, feature: 'Apertura_1', position: 'bottom' }
};

const homeMobileSections = [
    'Anticipo',
    'Anexo',
    'Bomba',
    'Apertura',
    'Apertura',
    'Multimedia',
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
    'AnexoMobile',
    'AnexoMobile'
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

const moveSections = (sections, name) => {
    const sectionToMove = boxMovePosition[name];
    if (sectionToMove) {
        const indexSectionTo = sections.findIndex(
            x => x.nameFeature === sectionToMove.feature
        );

        const indexSectionFrom = sections.findIndex(
            x => x.nameFeature === name
        );

        if (indexSectionFrom > -1 && indexSectionTo > -1) {
            const elementToMove = sections[indexSectionFrom];
            if (elementToMove) {
                sections.splice(indexSectionFrom, 1);
                elementToMove.type = sectionToMove.type;
                switch (sectionToMove.position) {
                    case 'bottom':
                        sections.splice(indexSectionTo + 1, 0, elementToMove);
                        break;
                    case 'start':
                        sections.splice(indexSectionTo, 0, elementToMove);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return sections;
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
            return moveSections(
                r.concat(
                    [].concat(
                        child.reduce((res, b) => {
                            if (b) {
                                if (b.information && !b.information.hideCaja) {
                                    return res.concat({
                                        type: 0,
                                        feature: homeMobileSections[i],
                                        ...b,
                                        configurations,
                                        nameFeature: e
                                    });
                                }
                                if (b.feature) {
                                    return res.concat(b);
                                }
                            }
                            return res;
                        }, [])
                    ) || []
                ),
                e
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

LNMainHome.sections = pageBuilderSections;

export default Consumer(LNMainHome);
