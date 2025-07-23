import request from 'request-promise-native';
import logger from '../../../../components/private/common/utils/logger';

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
    const endpoint = {
        uri: `${resolve(query)}`,
        json: true
    };

    if (cookie && cookie.trim() !== '') {
        endpoint.headers = {
            Cookie: cookie
        };
    }

    return request(endpoint)
        .then(response => {
            if (
                response &&
                response.content_elements &&
                response.content_elements.length > 0
            ) {
                const contentElements = response.content_elements;
                const sectionsElement = contentElements.filter(
                    contentElement =>
                        contentElement.sectionAliasMobile ===
                        'ln-acumulado/ultimasnoticias'
                );
                return sectionsElement[0]?.information?.sections;
            }
            return response;
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.warn(
                `Error Ultimas Noticias Section Source - sources/utils/pageSource/index: ${JSON.stringify(
                    query
                )} - uri: ${JSON.stringify(endpoint.uri)} - errorMsj:${
                    error.message
                }`
            );
            logger.push(error, { source: 'servicesSource/page/index', query });
        });
};

export default {
    fetch
};
