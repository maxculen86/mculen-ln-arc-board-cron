import get from '../../../../../../../../common/utils/get';

export const getArticleTitleEditorial = article => {
    const title = get(article, 'additionalProperties.title', null);
    return title;
};

export const getLiveblogSubtitles = article => {
    const contentElements = get(article, 'content_elements', []);
    const design = get(article, 'additionalProperties.diseno', null);

    if (design && design.size === 'M') return null;

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.type === 'custom_embed' && acc.length < 3) {
            return [
                ...acc,
                {
                    title: get(currentValue, 'embed.config.title', ''),
                    time: get(currentValue, 'embed.config.time', '')
                        .split(':')
                        .slice(0, 2)
                        .join(':')
                }
            ];
        }

        return acc;
    }, []);
};

export default getArticleTitleEditorial;
