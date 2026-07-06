import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { addForwardSlash } from '../../LN/common/utils/addForwardSlash';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import get from './get';
import filter from '../../../../content/filters/LN/acumulado/articleMasNotas';

export const getSectionTitle = (isNoticia, isRecetas) => {
    if (isNoticia) return 'Otras noticias de&nbsp;';
    if (isRecetas) return 'Más recetas de&nbsp;';
    return 'Más notas de&nbsp;';
};

export const getTitle = (isNoticia, isRecetas, link = {}, byTag = false) => {
    const { text = 'La Nación', path = '/ultimas-noticias' } = link;
    if (byTag) {
        return `${getSectionTitle(
            isNoticia,
            isRecetas
        )}<a href='/tema/${addForwardSlash(
            path
        )}' class='com-link'>${capitalizeFirstLetter(text)}</a>`;
    }

    return `Últimas notas de <a href='${addForwardSlash(
        path
    )}' class='com-link'> ${capitalizeFirstLetter(
        text.replace(/[\s.-]/g, ' ')
    )}</a>`;
};

export const validateMasNotas = (articles, cantidadNotas) => {
    const rules = [
        {
            validation: cantidadNotas < 3,
            message: 'La cantidad minima de notas debe ser de 3 notas.'
        },
        {
            validation: !articles.length,
            message: 'No se encontraron notas.'
        }
    ];

    const message = get(
        rules.find(({ validation }) => validation),
        'message',
        null
    );
    return message && { type: 'warning', message };
};

export const shouldNotFilter = (sectionId = '', arcSite = 'la-nacion-ar') => {
    const { notRecommendedSections = [] } = getProperties(arcSite);
    const SectionIdElements = sectionId.split('/');

    return SectionIdElements.some(item =>
        notRecommendedSections.includes(item)
    );
};

const setSize = cantidadNotas => ({
    tripleSize: Math.ceil(cantidadNotas * 1.5),
    originalSize: cantidadNotas
});

export const getFilteredContentElements = (
    articlesList = {},
    idArticle = '',
    cantidadNotas = 0
) =>
    get(articlesList, 'content_elements', [])
        .filter(
            ({ _id: id = '', promo_items: promoItems = {} } = {}) =>
                id !== idArticle && get(promoItems, 'basic.type') === 'image'
        )
        .slice(0, Number(cantidadNotas));

export const setSearchParamsByFilterType = {
    byLastNews: ({
        _website: website,
        sectionId,
        isNoticia,
        isRecetas,
        subtype,
        isVideo,
        cantidadNotas,
        arcSite
    }) => {
        const size = setSize(cantidadNotas);

        return {
            sectionId,
            subtype: isVideo ? subtype : undefined,
            excludeSectionId: isNoticia,
            shouldNotFilter: isRecetas
                ? shouldNotFilter('/recetas', arcSite)
                : shouldNotFilter(sectionId, arcSite),
            website,
            size: size.tripleSize || size,
            imageConfig: 'boxArticles',
            sourceOrigin: 'composer',
            type: 'story',
            promoItemsOnly: true,
            excludePreload: true
        };
    },

    bySectionOrTag: ({
        sectionOrTag,
        _website: website,
        sectionId,
        cantidadNotas,
        arcSite
    }) => {
        const size = setSize(cantidadNotas);
        const isSearchByTag = sectionOrTag && sectionOrTag[0] !== '/';

        return {
            ...(isSearchByTag
                ? { tagId: sectionOrTag }
                : { sectionId: sectionOrTag }),
            website,
            size: size.tripleSize || size,
            shouldNotFilter: shouldNotFilter(sectionId, arcSite),
            imageConfig: 'boxArticles',
            sourceOrigin: 'composer',
            type: 'story',
            promoItemsOnly: true,
            excludePreload: true
        };
    },

    aperturaHome: () => ({})
};

export const sourceByFilterType = {
    byLastNews: 'lnAcuSource',
    bySectionOrTag: 'lnAcuSource',
    byTags: null,
    aperturaHome: 'homeOpeningArticlesSource'
};

export const getLink = (isSearchByTag, sectionOrTag, articles = []) => {
    const link = sectionOrTag
        ? {
              path: sectionOrTag,
              text: sectionOrTag.replace('/', '')
          }
        : {};

    if (sectionOrTag && isSearchByTag) {
        const tags = get(articles[0], 'taxonomy.tags', []);
        const { description = '' } =
            tags.find(({ slug = '' } = {}) => slug === sectionOrTag) || {};

        link.text = description;
    }

    return link;
};

const MAX_TAGS_TO_TRY = 3;

export const filterType = {
    byLastNews: ({ filteredContentElements, isRecetas }) => ({
        articles: filteredContentElements,
        sectionTitle: 'UltimasNoticias',
        title: isRecetas ? 'Últimas Recetas' : 'Últimas Noticias'
    }),

    byTags: ({
        _website: website,
        sectionId,
        cantidadNotas,
        arcSite,
        sectionName,
        path,
        idArticle,
        isNoticia,
        isRecetas,
        tags = []
    }) => {
        const size = setSize(cantidadNotas);
        const candidateTags = tags.slice(0, MAX_TAGS_TO_TRY);

        const resultsByTag = candidateTags.map(({ slug } = {}) => {
            const articlesList = useContent({
                source: 'lnAcuSource',
                query: {
                    website,
                    tagId: slug,
                    size: size.tripleSize || size,
                    shouldNotFilter: shouldNotFilter(sectionId, arcSite),
                    imageConfig: 'boxArticles',
                    sourceOrigin: 'composer',
                    type: 'story',
                    promoItemsOnly: true,
                    excludePreload: true
                },
                filter,
                staticMode: false
            });

            return getFilteredContentElements(
                articlesList,
                idArticle,
                cantidadNotas
            );
        });

        const matchIndex = resultsByTag.findIndex(res => res.length >= 3);
        const articles = matchIndex === -1 ? [] : resultsByTag[matchIndex];
        const { slug, text } = candidateTags[matchIndex] || {};
        const link =
            matchIndex === -1
                ? {}
                : { text: text || sectionName, path: slug || path };

        return {
            articles,
            sectionTitle: 'OtrasNoticias',
            title: getTitle(isNoticia, isRecetas, link, true)
        };
    },

    bySectionOrTag: ({
        sectionOrTag,
        filteredContentElements,
        isNoticia,
        isRecetas
    }) => {
        const isSearchByTag = sectionOrTag && sectionOrTag[0] !== '/';
        const link = getLink(
            isSearchByTag,
            sectionOrTag,
            filteredContentElements
        );

        return {
            articles: filteredContentElements,
            sectionTitle: isSearchByTag ? 'OtrasNoticias' : 'UltimasNoticias',
            title: getTitle(isNoticia, isRecetas, link, isSearchByTag)
        };
    },

    aperturaHome: ({ filteredContentElements }) => ({
        articles: filteredContentElements,
        sectionTitle: 'UltimasNoticias',
        title: 'Últimas Noticias'
    })
};
