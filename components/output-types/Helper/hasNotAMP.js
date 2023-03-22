import Redirect from '../../../content/sources/utils/redirect';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const hasNotAMP = (layout = '', requestUri = '') => {
    const { Home, HomeLN10, Acumulado, Deportes } = layoutsName;
    const layoutsWithoutAmp = [Home, HomeLN10, Acumulado, Deportes];

    const [group1 = ''] = requestUri.match(/(\/.+\/)/g) || [];

    if (typeof window === 'undefined' && layoutsWithoutAmp.includes(layout)) {
        throw new Redirect(`${group1}?outputType=default`, 301);
    }
};

export default hasNotAMP;
