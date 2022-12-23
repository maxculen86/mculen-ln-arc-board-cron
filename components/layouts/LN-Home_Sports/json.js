import Consumer from 'fusion:consumer';
import bitacora from '../../private/LN/api/v1/global/bitacora';
import pageBuilderSections from '../config/LN-PageBuilder.config.json';
import pageSportsBuilderSections from '../config/LN-Home_Sports-PageBuilder.config.json';

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
                                feature: pageSportsBuilderSections[i],
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
    // limpieza de datos
    const propsHome = {
        children: props.children,
        renderables: props.renderables,
        arcSite: props.arcSite,
        pageSections: pageSportsBuilderSections,
        layout: 'LN-Home_Sports'
    };
    //const homeSections = getHomeElements(props);
    //return bitacora(homeSections) || null;
    return propsHome;
};

LNSportsHome.sections = pageSportsBuilderSections;

export default Consumer(LNSportsHome);
