import get from 'lodash.get';
import Image from '../common/image';
import { authorHomeMobile } from '../common/author';
import Relacionados from '../nota/relacionados';

const sectionsProduct = [
    '/lnmas',
    '/revista-brando',
    '/revista-jardin',
    '/revista-ohlala',
    '/revista-lugares',
    '/revista-living',
    '/revista-hola'
];

const getArticleImage = article => {
    const image =
        get(article, 'additionalProperties.image.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    if (image && image.type === 'image') return Image(image);

    return null;
};

const getArticleTitle = article => {
    const title = get(article, 'additionalProperties.title', null);
    const originalTitle = get(article, 'headlines.basic', null);
    return title || originalTitle;
};

const getArticleTag = article => {
    const originalTag = get(article, 'label.chapita.text', null);
    const tag = get(article, 'additionalProperties.chapita', null);
    const result = originalTag || tag || null;
    return result ? result.toUpperCase() : result;
};

const getArticleAuthor = article => {
    const authors = get(article, 'credits.by', null);
    if (authors && authors.length > 0) {
        const authorsFixed = authors.filter(v => v.type === 'author');
        if (authorsFixed.length > 0) {
            return authorHomeMobile(authorsFixed[0]);
        }
    }

    return null;
};

const getArticleProduct = article => {
    const sections = Relacionados(article);
    if (sections.categorias && sections.categorias.length > 0) {
        const productoDestacado = sections.categorias.filter(
            e => e && sectionsProduct.includes(e.slug)
        );
        return productoDestacado && productoDestacado.length > 0
            ? productoDestacado[0]
            : null;
    }
    return null;
};

const getArticleOpinionSubtype = article => {
    return get(article, 'additionalProperties.subtype', null);
};

const getArticleSignature = (article, autor) => {
    const signature = get(article, 'additionalProperties.authors', null);
    return signature || (autor ? `Por ${autor.valor}` : null);
};

const articleItem = (articles, configuration) => {
    return articles
        .filter(e => e)
        .map(article => {
            const { subtype: templateId, website_url: url, label } = article;

            const id = get(article, '_id', null);
            if (!id) {
                throw new Error(
                    'Revisar Parametros de Articulo en null o undefined'
                );
            }

            const titulo = getArticleTitle(article);
            if (!titulo) {
                throw new Error('Titulo de la nota es null o undefined');
            }

            const autor = getArticleAuthor(article);
            const resp = {
                id,
                templateId,
                sitioId: get(article, 'configurations.arcSite', null),
                url,
                titulo,
                volanta: get(label, 'volanta.text', null),
                bajada: get(article, 'subheadlines.basic', null),
                chapita: getArticleTag(article),
                autor,
                marquesina: getArticleSignature(article, autor),
                seccionProducto: getArticleProduct(article),
                seccionPadre: getArticleOpinionSubtype(article),
                image: getArticleImage(article)
            };

            return resp;
        });
};

export default articleItem;
