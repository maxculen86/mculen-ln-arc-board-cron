import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getTitleText from './getTitleText';
import filter from '../../../../content/filters/LN/acumulado/articleAcuTitles';
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
    author: (expertise = '', description = '') =>
        expertise
            ? `${description} Columnista de ${expertise}. Ingresá a su perfil en esta página.`
            : `${description} Ingresá a su perfil en esta página.`,
    justDescription: description => description,
    compositeDescription: descriptionAndArticles => descriptionAndArticles,
    default: () => ''
};

export const isInPVS = (id = '') => {
    const pvsServices = [
        'horoscopo',
        'clima',
        'loterias',
        'feriados',
        'juegos'
    ];
    const currentAcu = id !== '/' && id !== '' ? id.match(/([^/]+)/g)[0] : id;

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

    const typesOfQuery = {
        sectionId: nodeType === 'section' ? _id : null,
        authorId: nodeType === 'author' ? _id : null,
        distributorId: nodeType === 'distributor' ? name : null,
        tagId: nodeType === 'tags' ? tagId : null
    };

    const contentElements = useContent({
        source: 'acuArticlesSourceV2',
        query: {
            ...typesOfQuery,
            size: 2,
            type: 'acumulado',
            website: arcSite
        },
        filter,
        staticMode: true
    });

    const articles = get(contentElements, 'content_elements', []);
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
