import filter from '../../../../content/filters/LN/acumulado/articleAcuTitles';
import getTitleText from './getTitleText';
import getArticlesFromAcumSource from '../../LN/common/utils/getArticlesFromAcumSource';

const extractDataFromTags = payload => {
    const tagId =
        payload && payload.items && payload.items.length
            ? payload.items[0].slug
            : undefined;

    const tagName =
        payload && payload.items && payload.items.length
            ? payload.items[0].description
            : undefined;

    return {
        tagId,
        tagName
    };
};

const getMetaDescriptionForAcum = (
    description,
    _id,
    payload,
    nodeType,
    name,
    arcSite,
    layout
) => {
    const { tagId } = extractDataFromTags(payload);
    const articles = getArticlesFromAcumSource(
        {
            sectionId: nodeType === 'section' ? _id : null,
            authorId: nodeType === 'author' ? _id : null,
            distributorId: nodeType === 'distributor' ? name : null,
            tagId: nodeType === 'tags' ? tagId : null
        },
        filter,
        'm',
        2,
        '',
        false,
        'acumulado',
        arcSite,
        false,
        false
    );

    const articlesTitles = articles.map(
        art => ` ${getTitleText(art.headlines)}`
    );

    const articlesWithOrWithoutDescription = description
        ? `${description}${articlesTitles.join(',')}`
        : articlesTitles.join(',');

    return _id === '/recetas' ||
        layout === 'LN-acumulado-columnistas' ||
        _id.includes('/horoscopo')
        ? description
        : articlesWithOrWithoutDescription;
};

export default getMetaDescriptionForAcum;
