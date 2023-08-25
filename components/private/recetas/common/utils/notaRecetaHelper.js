import get from '../../../common/utils/get';
import getAuthorsAsString from '../../../common/utils/getAuthorsAsString';

export const transformNotaReceta = article => {
    const highestPriorityTag = getHighestPriorityTag(
        get(article, 'taxonomy.tags', [])
    );

    return {
        title: get(article, 'headlines.basic', ''),
        author: getAuthorsAsString(article, true),
        image: get(article, 'promo_items.basic', {}),
        time: get(article, 'promo_items.receta.embed.config.counterTime', null),
        tag: highestPriorityTag.toUpperCase()
    };
};

export const getHighestPriorityTag = (tags = []) => {
    if (!tags) return '';

    const prioritySortedTags = [
        'fácil',
        'rápida',
        'saludable',
        'clásica',
        'vegana',
        'vegetariana',
        'keto',
        'sin gluten'
    ];

    return tags.reduce((highestPriority, { text: tag }) => {
        if (prioritySortedTags.includes(tag)) {
            if (
                !highestPriority ||
                prioritySortedTags.indexOf(tag) <
                    prioritySortedTags.indexOf(highestPriority)
            )
                return tag;
        }
        return highestPriority;
    }, '');
};
