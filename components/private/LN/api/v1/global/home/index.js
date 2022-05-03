import get from '../../../../../common/utils/get';
import Image from '../../common/image';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
import logger from '../../../../../common/utils/logger';
import {
    articleItem as Article,
    anexoItem as Anexo,
    anexoItemMobile as AnexoMobile
} from '../../common/article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas
const typeSection = {
    Anticipo: { tipoSeccion: 'anticipo', idSeccion: 501 },
    Bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
    Apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    Anexo: { tipoSeccion: 'anexo', idSeccion: 0 },
    AnexoMobile: { tipoSeccion: 'anexoMobile', idSeccion: 603 },
    Opinion: { tipoSeccion: 'opinion', idSeccion: 1001 },
    Comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    Banner: { tipoSeccion: 'banner' },
    Dolar: {
        tipoSeccion: 'dolar',
        idSeccion: 2000,
        tituloCaja: 'Cotización hoy',
        url: 'https://www.lanacion.com.ar/economia/dolar/'
    },
    Multimedia: { tipoSeccion: 'tema', idSeccion: 305 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

const featureInformation = (information, feature) => {
    const type = typeSection[feature] || typeSection.default;
    const res = {
        ...type,
        diagramacion: information.layout || null
    };

    if (feature === 'Anticipo') {
        res.texto = information.title;
    }

    if (!information.hideTitle && feature !== 'Apertura') {
        const image = get(information.image, 'promo_items.basic', null);

        if (image && image.type === 'image') res.imagen = Image(image);

        return {
            ...res,
            tituloCaja: information.title,
            url: information.url
        };
    }
    return res;
};
const articlesMap = articles => {
    return articles.reduce((result, f) => {
        if (f) {
            try {
                const article = Article({ ...f, storyType: 'home' });
                result.push(article);
            } catch (error) {
                logger.push(
                    error,
                    {
                        source: 'components/private/LN/api/v1/global/home',
                        url:
                            'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json'
                    },
                    'la-nacion-ar'
                );
            }
        }
        return result;
    }, []);
};

const resultArticlesBySections = (feature, ordererArticles) => {
    if (feature === 'Anexo') {
        return Anexo(ordererArticles);
    }

    if (feature === 'AnexoMobile') {
        return AnexoMobile(ordererArticles);
    }

    return articlesMap(ordererArticles);
};

const storyBox = element => {
    const { information, feature } = element;
    const featureInfo = featureInformation(information, feature);
    if (feature === 'Anticipo') return { ...featureInfo };
    const articles = get(element, 'articles', []);
    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles = resultArticlesBySections(feature, ordererArticles);
    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            notas: resultArticles
        };
    }
    return null;
};

const bannerBox = element => {
    const type = typeSection[element.feature];
    return {
        ...type,
        idSeccion: element.id
    };
};

const anexoMobile = element => {
    const { information, feature } = element;
    const featureInfo = featureInformation(information, feature);
    const articles = get(element, 'articles', []);
    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles = resultArticlesBySections(feature, ordererArticles);

    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            anexo: resultArticles[0]
        };
    }

    return null;
};

const typeBox = {
    0: storyBox,
    1: bannerBox,
    2: anexoMobile
};

const index = children => {
    const ArticlesbyBox = children.reduce((result, f, i) => {
        result.push(typeBox[f.type](f));
        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

const orderArticles = (articles, diagramacion) => {
    if (articles && articles.length > 0) {
        if (diagramacion === 'focalRight2') {
            return articles.slice(0, 2).reverse();
        }
    }
    return articles;
};

export default index;
