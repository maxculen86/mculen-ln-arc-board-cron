import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/general/v1/bitacora';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';

const homeMobileSections = [
    'Banner-Megatop',
    'Sticky-Mobile',
    'Cabezal',
    'Apertura',
    'Cuerpo',
    'Aside'
];

const getHomeElements = props => {
    const { children, arcSite } = props;
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

const LNSportsHome = props => {
    const homeSections = getHomeElements(props);
    return bitacora(homeSections) || null;
};

LNSportsHome.sections = homeMobileSections;

export default Consumer(LNSportsHome);
