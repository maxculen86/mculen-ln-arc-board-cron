import { addForwardSlash } from '../../../../private/LN/common/utils/addForwardSlash';

export const transformUrl = inputUrl => {
    try {
        const url = new URL(inputUrl);
        const validDomain = 'canchallena.lanacion.com.ar';
        const includesPath = url.pathname && url.pathname !== '/';

        if (url.hostname !== validDomain || !includesPath) {
            return '';
        }

        const newDomain = 'widget-canchallena.clanacion.com.ar';
        let newPath = url.pathname;
        addForwardSlash(newPath);

        if (!newPath.endsWith('widget/')) {
            newPath += 'widget/';
        }

        const searchParams = new URLSearchParams(url.search);

        if (!searchParams.has('isHome')) {
            searchParams.set('isHome', 'true');
        }

        return `https://${newDomain}${newPath}?${searchParams.toString()}`;
    } catch {
        return '';
    }
};
