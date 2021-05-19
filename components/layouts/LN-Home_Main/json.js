import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v1/home';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import getProperties from 'fusion:properties';
import {
    checkIfValid,
    findSectionChildren
} from '../../private/common/utils/validateSectionHome';

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
        if (child && Array.isArray(child) && child.length > 0) {
            return r.concat(
                [].concat(
                    child
                        .filter(
                            b => b && b.information && !b.information.hideCaja
                        )
                        .map(b => {
                            const addedInfo = { ...b, configurations };
                            return {
                                feature: homeMobileSections[i],
                                ...addedInfo
                            };
                        })
                ) || []
            );
        }
        return r;
    }, []);
};

const LNMainHome = props => {
    const homeSections = getHomeElements(props);
    return home(homeSections) || null;
};

export default Consumer(LNMainHome);
