import { useAppContext } from 'fusion:context';
import getTitleText from './getTitleText';
import filter from '../../../../content/filters/LN/acumulado/articleAcuTitles';
import useGetArticlesFromAcumSource from '../../LN/common/hooks/useGetArticlesFromAcumSource';
import get from './get';

export const extractDataFromTags = payload => {
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

const buildMetaDescriptionForAcu = (
    nodeType = '',
    layout = '',
    id = '',
    expertise = '',
    description = '',
    articlesWithOrWithoutDescription = ''
) => {
    if (nodeType === 'author')
        return get(
            metaDescriptionFactory,
            nodeType,
            metaDescriptionFactory.default
        )(expertise, description);

    if (
        isInPVS(id) ||
        layout === 'LN-acumulado-columnistas' ||
        id === '/recetas'
    )
        return get(
            metaDescriptionFactory,
            'justDescription',
            metaDescriptionFactory.default
        )(description);

    return get(
        metaDescriptionFactory,
        'compositeDescription',
        metaDescriptionFactory.default
    )(articlesWithOrWithoutDescription);
};

const metaDescriptionFactory = {
    author: (expertise = '', description = '') => {
        return expertise
            ? `${description} Columnista de ${expertise}. Ingresá a su perfil en esta página.`
            : `${description} Ingresá a su perfil en esta página.`;
    },
    justDescription: description => {
        return description;
    },
    compositeDescription: descriptionAndArticles => descriptionAndArticles,
    default: () => ''
};

export const isInPVS = (id = '') => {
    const pvsServices = ['horoscopo', 'clima', 'loterias', 'feriados'];
    const currentAcu = id !== '' ? id.match(/([^/]+)/g)[0] : id;

    return pvsServices.includes(currentAcu);
};

const useGetMetaDescriptionForAcum = (
    description,
    _id = '',
    payload = undefined,
    nodeType = '',
    name = '',
    arcSite = 'la-nacion-ar',
    layout = ''
) => {
    const { globalContent = {} } = useAppContext();
    const { expertise = '' } = globalContent;
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
        : articlesTitles.join(',').trim();

    return buildMetaDescriptionForAcu(
        nodeType,
        layout,
        _id,
        expertise,
        description,
        articlesWithOrWithoutDescription
    );
};

export default useGetMetaDescriptionForAcum;
