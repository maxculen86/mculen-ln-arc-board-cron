import getProperties from 'fusion:properties';
import useGetArticlesFromAcumSource from '../../LN/common/hooks/useGetArticlesFromAcumSource';
import addForwardSlash from '../../LN/common/utils/addForwardSlash';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import filter from '../../../../content/filters/LN/acumulado/articleMasNotas';
import get from './get';

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

export const GetArticlesList = ({
    typesOfQuery,
    excludeSectionId = false,
    notFilter = false,
    _website = 'la-nacion-ar',
    isSection,
    idArticle,
    cantidadNotas
}) => {
    const size = {
        tripleSize: Math.ceil(cantidadNotas * 1.5),
        originalSize: cantidadNotas
    };

    const searchArguments = {
        typesOfQuery,
        filter,
        imageConfig: 'boxArticles',
        size,
        sourceOrigin: 'composer',
        excludeSectionId,
        type: 'story',
        shouldNotFilter: notFilter,
        _website,
        promoItemsOnly: true,
        staticMode: isSection
    };

    return useGetArticlesFromAcumSource(...Object.values(searchArguments))
        .filter(
            ({ _id: id = '', promo_items: promoItems = {} } = {}) =>
                id !== idArticle && get(promoItems, 'basic.type') === 'image'
        )
        .slice(0, Number(size.originalSize));
};

export const shouldNotFilter = (sectionId = '', arcSite = 'la-nacion-ar') => {
    const { notRecommendedSections = [] } = getProperties(arcSite);
    const SectionIdElements = sectionId.split('/');

    return SectionIdElements.some(item =>
        notRecommendedSections.includes(item)
    );
};

export const filterType = {
    byLastNews: ({
        _website,
        idArticle,
        sectionId,
        isNoticia,
        isRecetas,
        subtype,
        isVideo,
        cantidadNotas,
        arcSite
    }) => {
        let id = sectionId;
        if (isRecetas) id = '/recetas';
        const typesOfQuery = isVideo ? { sectionId, subtype } : { sectionId };

        return {
            articles: GetArticlesList({
                typesOfQuery,
                excludeSectionId: isNoticia,
                notFilter: shouldNotFilter(id, arcSite),
                _website,
                idArticle,
                cantidadNotas,
                isSection: true
            }),
            sectionTitle: 'UltimasNoticias',
            title: isRecetas ? 'Últimas Recetas' : 'Últimas Noticias'
        };
    },

    byTags: ({
        _website,
        sectionName,
        path,
        tags,
        idArticle,
        sectionId,
        isNoticia,
        isRecetas,
        cantidadNotas,
        arcSite
    }) => {
        const { articles = [], link = {} } = tags.reduce((acc, tag) => {
            if (acc.articles) return acc;
            const { slug, text } = tag;

            const res = GetArticlesList({
                typesOfQuery: { tagId: slug },
                notFilter: shouldNotFilter(sectionId, arcSite),
                _website,
                isSection: false,
                idArticle,
                cantidadNotas
            });

            if (res.length >= 3) {
                acc.articles = res;
                acc.link = {
                    text: text || sectionName,
                    path: slug || path
                };
            }
            return acc;
        }, {});

        return {
            articles,
            sectionTitle: 'OtrasNoticias',
            title: getTitle(isNoticia, isRecetas, link, true)
        };
    },

    bySectionOrTag: ({
        sectionOrTag,
        _website,
        idArticle,
        sectionId,
        isNoticia,
        isRecetas,
        cantidadNotas,
        arcSite
    }) => {
        const isSearchByTag = sectionOrTag && sectionOrTag[0] !== '/';
        let typesOfQuery = { sectionId: sectionOrTag };

        if (isSearchByTag) typesOfQuery = { tagId: sectionOrTag };

        const articles = GetArticlesList({
            typesOfQuery,
            notFilter: shouldNotFilter(sectionId, arcSite),
            _website,
            isSection: isSearchByTag,
            idArticle,
            cantidadNotas
        });

        const link = getLink(isSearchByTag, sectionOrTag, articles);

        return {
            articles,
            sectionTitle: isSearchByTag ? 'OtrasNoticias' : 'UltimasNoticias',
            title: getTitle(isNoticia, isRecetas, link, isSearchByTag)
        };
    }
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
