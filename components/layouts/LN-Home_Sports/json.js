import bitacora from '../../private/LN/api/v1/bitacora';
import Consumer from 'fusion:consumer';
import home from '../../private/LN/api/v1/home';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
/* 
const LNMainHome = ({ children }) => {
    const listItems = [];
    const ArticlesbyBox = bitacora(children);

    listItems.push({
        // fecha_foto: dateToday, //Data pendiente de añadir
        // usuario_publica: 'XX', //Data pendiente de añadir
        cajas: ArticlesbyBox
    });

    return Array.isArray(listItems) ? listItems : null;
};

LNMainHome.sections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Cabezal',
    'Apertura',
    'Cuerpo',
    'Aside'
];

export default LNMainHome;
 */

import {
    checkIfValid,
    findSectionChildren
} from '../../private/common/utils/validateSectionHome';

const homeMobileSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Cabezal',
    'Apertura',
    'Cuerpo',
    'Aside'
];

const validateSections = (section, name, position, renderables) => {
    const sectionChildren = findSectionChildren(renderables, position);
    const result =
        checkIfValid(name, sectionChildren) === true ? section : null;
    return result;
};

const getHomeElements = props => {
    const { children, renderables, arcSite } = props;
    const configurations = {
        arcSite
    };
    return pageBuilderSections.reduce((r, e, i) => {
        const child = children[i];
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
    // return [homeSections];
    return bitacora(homeSections) || null;
};

export default Consumer(LNMainHome);
