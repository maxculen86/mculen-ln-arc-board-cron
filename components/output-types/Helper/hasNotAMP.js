import Redirect from '../../../content/sources/utils/redirect';
import config from '../../../properties/sites/la-nacion-ar';

const { layoutsName = {} } = config || {};

const hasNotAMP = (layout = '', requestUri = '') => {
    const { Home, HomeLN10, Acumulado, Deportes } = layoutsName;
    const layoutsWithoutAmp = [Home, HomeLN10, Acumulado, Deportes];

    const rgx1 = /(\/.+\/)/g;
    const rgx2 = /(\?.+)/g;

    const [group1 = ''] = requestUri.match(rgx1) || [];
    const [group2 = ''] = requestUri.match(rgx2) || [];

    const urlSplit = group2.split(/&|\?/g);

    const queryFilter = urlSplit.filter(
        query =>
            query && query !== 'outputType=amp' && !query.startsWith('variant')
    );

    const isValidArrayLength = queryFilter.length ? '?' : '';
    const newQueryString = queryFilter.join('&');

    const newUrl = `${group1}${isValidArrayLength}${newQueryString}`;

    if (typeof window === 'undefined' && layoutsWithoutAmp.includes(layout)) {
        throw new Redirect(newUrl, 301);
    }
};

export default hasNotAMP;
