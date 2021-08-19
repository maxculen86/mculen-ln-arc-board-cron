import get from 'lodash.get';
import Image from '../image';
import { authorHomeMobile } from '../author';

const getArticleImage = article => {
    const { subtype: templateId } = article;
    const imagedefault =
        get(article, 'additionalProperties.image.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    let image =
        templateId === '4' || templateId === '8'
            ? get(article, 'promo_items.storytelling_mobile', null)
            : imagedefault;

    image = image === null ? imagedefault : image;

    if (image && image.type === 'image') return Image(image);

    return null;
};

const getArticleTitle = article => {
    const title = get(article, 'additionalProperties.title', null);
    const originalTitle =
        get(article, 'headlines.mobile', null) ||
        get(article, 'headlines.basic', null);
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
            return authorsFixed.map(author => {
                return authorHomeMobile(author);
            });
        }
    }
    return null;
};

const getArticleOpinionSubtype = article => {
    return get(article, 'additionalProperties.subtype', null);
};

const getArticleSignature = (article, authors) => {
    const signature = get(article, 'additionalProperties.authors', null);
    let authorsValue = [];
    if (authors) {
        const lastAuthor = authors[authors.length - 1];
        authorsValue = authors.map(author => {
            return (
                (lastAuthor == author && authors.length !== 1
                    ? author.valor[0].toUpperCase() == `I`
                        ? ` e `
                        : ` y `
                    : author == authors[0]
                    ? ``
                    : ` `) + author.valor
            );
        });
    }
    return (
        signature ||
        (authorsValue
            ? (authorsValue.length > 0 ? `Por ` : ``) +
              `${authorsValue.toString().replace(/\,(?=[^,][ey])/, '')}`
            : null)
    );
};

export const articleItem = (articles, configuration) => {
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
            const autores = getArticleAuthor(article);
            const autor = autores ? autores[0] : null;
            const resp = {
                id,
                templateId,
                sitioId: get(article, 'configurations.arcSite', null),
                url,
                titulo,
                volanta:
                    get(label, 'volanta.text', null) ||
                    get(article, 'additionalProperties.lead', null),
                bajada: get(article, 'subheadlines.basic', null),
                chapita: getArticleTag(article),
                autor,
                // autores,
                marquesina: getArticleSignature(article, autores),
                seccionPadre: getArticleOpinionSubtype(article),
                imagen: getArticleImage(article),
                opinion: get(article, 'additionalProperties.opinion', false)
            };

            return resp;
        });
};

export const anexoItem = article => {
    const html = get(article[0], 'html', '');
    return [{ html }];
};
