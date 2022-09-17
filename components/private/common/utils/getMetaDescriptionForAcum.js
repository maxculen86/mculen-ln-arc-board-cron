import getTitleText from './getTitleText';
import filter from '../../../../content/filters/LN/acumulado/articleAcuTitles';
import useGetArticlesFromAcumSource from '../../LN/common/hooks/useGetArticlesFromAcumSource';

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

export const isInPVS = (id = '') => {
    const pvsServices = ['horoscopo', 'clima', 'loterias'];
    const currentAcu = id !== '' ? id.match(/([^/]+)/g)[0] : id;

    return pvsServices.includes(currentAcu);
};

const useGetMetaDescriptionForAcum = (
    description,
    _id,
    payload,
    nodeType,
    name,
    arcSite,
    layout
) => {
    const { tagId } = extractDataFromTags(payload);
    const articles = useGetArticlesFromAcumSource(
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
        false,
        arcSite,
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
        isInPVS(_id)
        ? description
        : articlesWithOrWithoutDescription;
};

export default useGetMetaDescriptionForAcum;
