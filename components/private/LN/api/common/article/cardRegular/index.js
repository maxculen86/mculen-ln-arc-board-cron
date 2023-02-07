import get from '../../../../../common/utils/get';
import { articleSignature } from '../../elements/author';
import sentToApps from '../../elements/label/sentToApps';
import LNApiErrorArticles from '../models/exceptions/lnApiErrorArticles';
import { getLastPublishDate } from '../elements/date/index';
import { getArticleImage } from '../elements/image/index';
import { getArticleVideo, getYouTubeVideoLink } from '../elements/video/index';
import { getArticleTitle } from '../elements/title/index';
import { getArticleTag } from '../elements/tag/index';
import { getArticleAuthor } from '../elements/author/index';
import { getArticleOpinionSubtype } from '../elements/subType/index';

export const cardRegular = article => {
    const { subtype: templateId, label } = article;

    const id = get(article, '_id', null);

    if (!id) {
        const itemArticle =
            typeof article === 'object' ? JSON.stringify(article) : '';
        throw new LNApiErrorArticles(
            `Revisar Parametros de Articulo en null o undefined in article with params: ${itemArticle}`,
            'ErrorIdArticle'
        );
    }

    const url = get(
        article,
        'canonical_url',
        get(article, 'website_url', null)
    );

    if (!url) {
        throw new Error(
            `La nota con el id: ${id} no posee el valor canonical_url/website_url`
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
        enviarApps,
        fechaPublicacion: getLastPublishDate(article)
    };
};

export default cardRegular;
