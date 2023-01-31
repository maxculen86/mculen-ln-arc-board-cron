import Redirect from '../../../content/sources/utils/redirect';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const hasNotAMP = (layout, requestUri) => {
    const { Home, HomeLN10, Acumulado, Deportes } = layoutsName;
    const layoutsWithoutAmp = [Home, HomeLN10, Acumulado, Deportes];
    if (typeof window === 'undefined' && layoutsWithoutAmp.includes(layout)) {
        throw new Redirect(
            `${requestUri.replace(/[&|?]outputType=amp/, '')}`,
            301
        );
    }
};

export default hasNotAMP;
