import { API_ENV } from 'fusion:environment';
import { addForwardSlash } from '../../../../private/LN/common/utils/addForwardSlash';

export const transformUrl = inputUrl => {
    try {
        const isProdARC = API_ENV === 'prod';
        const url = new URL(inputUrl);
        const isProdEmbedCLL = url.hostname === 'canchallena.lanacion.com.ar';
        const matchDetailCLLRegex = /\/futbol\/[^/]+\/[^/]+-[a-zA-Z0-9]{20,}/;

        if (
            (isProdARC && !isProdEmbedCLL) ||
            !matchDetailCLLRegex.test(url.pathname)
        ) {
            return '';
        }
        const domainEnvironmentCLLPrefix = url.hostname
            .split('-')[0]
            .concat('-');

        const newDomain = `${isProdEmbedCLL ? '' : domainEnvironmentCLLPrefix}widget-canchallena.clanacion.com.ar`;
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
