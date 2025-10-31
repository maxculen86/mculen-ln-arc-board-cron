import logger from '../../../../components/private/common/utils/logger';
import NotFoundError from '../notFoundError';
import { handleHttpError } from '../../../../components/private/common/utils/handleHttpError';

const resolve = query => {
    const { rootPath, website, ticksCache, versionDeploy } = query;

    const arcSite = website || 'la-nacion-ar';
    const paramasVersionDeploy =
        versionDeploy != null ? `&d=${versionDeploy}` : '';
    const paramsTicks = ticksCache != null ? `&ticks=${ticksCache}` : '';
    return `${rootPath}/?_website=${arcSite}&outputType=json${paramsTicks}${paramasVersionDeploy}`;
};

const fetch = async query => {
    const { cookie } = query;
    const requestOptions = {};
    if (cookie && cookie.trim() !== '') {
        requestOptions.headers = {
            Cookie: cookie
        };
    }
    try {
        const resp = await global.fetch(resolve(query), requestOptions);
        handleHttpError(resp);
        const response = await resp.json();
        return {
            ...response,
            homeFetchDate: new Date()
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
            `Error Page Index - sources/utils/pageSource/index: ${JSON.stringify(
                query
            )} - uri: ${JSON.stringify(requestOptions.uri)} - errorMsj:${error.message}`
        );
        logger.push(error, { source: 'servicesSource/page/index', query });
        throw new NotFoundError(error.message);
    }
};

export default {
    fetch
};
