import { useAppContext } from 'fusion:context';
import siteConfig from '../../../../../properties/sites/la-nacion-ar';

const useAppData = () => {
    const {
        isAdmin,
        arcSite,
        renderables,
        layout: layoutPageBuilder
    } = useAppContext();

    const { layoutsName = {} } = siteConfig || {};

    return {
        isAdmin,
        arcSite,
        renderables,
        layoutPageBuilder,
        isHome: layoutPageBuilder === layoutsName.HomeLN10
    };
};

export default useAppData;
