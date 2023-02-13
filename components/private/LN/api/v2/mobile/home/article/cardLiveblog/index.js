import { cardRegular as Article } from '../../../../../common/article/cardRegular/index';
import get from '../../../../../../../common/utils/get';

const getLiveblogTitles = articleData => {
    const contentElements = get(articleData, 'content_elements', []);

    return contentElements.reduce((acc, currentValue) => {
        if (currentValue.type === 'custom_embed' && acc.length < 3) {
            return [
                ...acc,
                {
                    titulo: get(currentValue, 'embed.config.title', ''),
                    hora: get(currentValue, 'embed.config.time', '')
                }
            ];
        }

        return acc;
    }, []);
};
export const CardLiveblog = article => {
    return {
        ...Article(article),
        subtitulos: getLiveblogTitles(article)
    };
};

export default CardLiveblog;
