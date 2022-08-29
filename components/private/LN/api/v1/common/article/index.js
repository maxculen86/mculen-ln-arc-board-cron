/* eslint-disable eqeqeq */
import get from '../../../../../common/utils/get';
import Image from '../image';
import Video from '../video';
import { authorHomeMobile, articleSignature } from '../author';
import sentToApps from '../utils/sentToApps';
import getEmbedHref from '../../../../../common/utils/getEmbedHref';

const getArticleImage = article => {
    const imagedefault =
        get(article, 'additionalProperties.image.promo_items.basic', null) ||
        get(article, 'promo_items.basic', null);

    if (imagedefault && imagedefault.type === 'image')
        return Image(imagedefault);

    return null;
};
const getArticleVideo = article => {
    const videoDefault = get(article, 'additionalProperties.video', null);
    if (videoDefault && videoDefault.type === 'video') {
        return Video(videoDefault.streams);
    }
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

const getYouTubeVideoLink = article => {
    const htmlAttr = get(article, 'additionalProperties.html', null);
    const videoLink = getEmbedHref('src', htmlAttr);

    return videoLink;
};

export const articleItem = article => {
    const { subtype: templateId, label } = article;

    const id = get(article, '_id', null);
    if (!id) {
        throw new Error('Revisar Parametros de Articulo en null o undefined');
    }

    const url = get(article, 'website_url', null);
    if (!url) {
        throw new Error(
            `La nota con el id: ${id} no posee el valor website_url`
        );
    }

    const titulo = getArticleTitle(article);
    if (!titulo) {
        throw new Error(`La nota con el id: ${id}: No posee el valor Titulo`);
    }
    const autores = getArticleAuthor(article);
    const autor = autores ? autores[0] : null;
    const signature = get(article, 'additionalProperties.authors', null);
    const enviarApps = sentToApps(article);

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
        video: getArticleVideo(article),
        opinion: get(article, 'additionalProperties.opinion', false),
        videoYouTube: getYouTubeVideoLink(article),
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
