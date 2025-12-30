import get from '../../../../../common/utils/get';
import { distributorOrAuthorSignature } from '../../elements/author';
import getDistributor from '../../elements/distributor';
import { getDomainCLL } from '../../elements/domain';
import getOpeningMode from '../../elements/label/openingMode';
import sentToApps from '../../elements/label/sentToApps';
import { getArticleAuthor } from '../elements/author/index';
import { getLastPublishDate } from '../elements/date/index';
import { getArticleOpinionSubtype } from '../elements/subType/index';
import { getArticleTitle } from '../elements/title/index';
import LNApiErrorArticles from '../models/exceptions/lnApiErrorArticles';

const transformAuthors = (articleAuthors, isListenable) => {
    if (!articleAuthors) return null;
    return articleAuthors.map(author => {
        if (isListenable || !author?.voice) return author;
        const { voice, ...newAuthor } = author;
        return newAuthor;
    });
};

export const CardBasic = article => {
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
    const isListenable = get(article, 'isListenable', null);
    const articleAuthors = getArticleAuthor(article);
    const transformatedAuthors = transformAuthors(articleAuthors, isListenable);
    const signature = get(article, 'additionalProperties.authors', null);
    const enviarApps = sentToApps(article);
    const openingMode = getOpeningMode(article);
    const distributor = getDistributor(article);
    const domain = getDomainCLL(article);
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
        autores: transformatedAuthors,
        authors: transformatedAuthors,
        marquesina: distributorOrAuthorSignature(
            distributor,
            transformatedAuthors,
            signature
        ),
        seccionPadre: getArticleOpinionSubtype(article),
        opinion: get(article, 'additionalProperties.opinion', false),
        enviarApps,
        fechaPublicacion: getLastPublishDate(article),
        openingMode,
        distributor,
        videoData: article.videoData,
        ...(domain && { domain })
    };
};

export default CardBasic;
