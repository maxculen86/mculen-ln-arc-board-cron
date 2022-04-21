/* eslint-disable eqeqeq */
import get from '../../../../../common/utils/get';
import Image from '../image';
import { authorHomeMobile, articleSignature } from '../author';
import matchObject from '../utils/matchObject';

const getArticleImage = article => {
    const imagedefault =
        get(article, 'additionalProperties.image.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    if (imagedefault && imagedefault.type === 'image')
        return Image(imagedefault);

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

export const articleItem = article => {
    const { subtype: templateId, website_url: url, label } = article;

    const id = get(article, '_id', null);
    if (!id) {
        throw new Error('Revisar Parametros de Articulo en null o undefined');
    }

    const titulo = getArticleTitle(article);
    if (!titulo) {
        throw new Error('Titulo de la nota es null o undefined');
    }
    const autores = getArticleAuthor(article);
    const autor = autores ? autores[0] : null;
    const signature = get(article, 'additionalProperties.authors', null);
    const sentToApps = get(article, 'label.enviar_a_apps.text', null);
    const enviarApps =
        matchObject(article, 'contains') === false
            ? matchObject(article, 'contains')
            : !(sentToApps && sentToApps.toLowerCase() === 'no');
    return {
        id,
        templateId: Number.isInteger(templateId)
            ? templateId.toString()
            : templateId,
        sitioId: get(article, 'configurations.arcSite', null),
        url,
        titulo,
        volanta:
            get(label, 'volanta.text', null) ||
            get(article, 'additionalProperties.lead', null),
        bajada: get(article, 'subheadlines.basic', null),
        chapita: getArticleTag(article),
        autor,
        autores,
        marquesina: articleSignature(autores, signature),
        seccionPadre: getArticleOpinionSubtype(article),
        imagen: getArticleImage(article),
        opinion: get(article, 'additionalProperties.opinion', false),
        enviarApps
    };
};

export const anexoItem = article => {
    const html = get(article[0], 'html', '');
    if (!html) return null;

    return [{ html }];
};

export const anexoItemMobile = article => {
    const url = get(article[0], 'url', null);
    const alto = get(article[0], 'alto', null);
    if (url && alto) {
        return [{ url, alto }];
    }
    return null;
};
