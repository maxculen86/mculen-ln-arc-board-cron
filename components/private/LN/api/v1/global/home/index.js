import get from '../../../../../common/utils/get';
import Image from '../../common/image';
import { removeEmptyItems } from '../../common/utils/responseCleaner';
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
    Timeline: { tipoSeccion: 'tema', idSeccion: 3000 },
    Aside: { tipoSeccion: 'aside', idSeccion: 306 },
    default: { tipoSeccion: 'tema', idSeccion: 305 }
};

const featureInformation = (information, section) => {
    const type = typeSection[section] || typeSection.default;
    const res = {
        ...type,
        diagramacion: information.layout || null
    };

    if (section === 'Anticipo') {
        res.texto = information.title;
    }

    if (!information.hideTitle && section !== 'Apertura') {
        const image = get(information.image, 'promo_items.basic', null);
        const imagenUrl = get(image, 'additional_properties.originalUrl', null);
        if (image && image.type === 'image') res.imagen = Image(image);
        if (imagenUrl) res.imagenUrl = imagenUrl;
        return {
            ...res,
            tituloCaja: information.title,
            url: information.url
        };
    }
    return res;
};
const articlesMap = (articles, sectionAliasMobile) => {
    return articles.reduce((result, f) => {
        if (f) {
            try {
                const article = Article({ ...f, storyType: 'home' });
                result.push(article);
            } catch (error) {
                const websiteUrl =
                    'https://www.lanacion.com.ar/?_website=la-nacion-ar&outputType=json';
                if (get(error, 'name', null) === 'ErrorIdArticle') {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `SectionMobile:${sectionAliasMobile || ''} - ${get(
                            error,
                            'message',
                            ''
                        )} `,
                        {
                            error,
                            outputType: 'json',
                            websiteUrl
                        }
                    );
                } else {
                    // eslint-disable-next-line no-console
                    console.error(error.message, {
                        error,
                        outputType: 'json',
                        websiteUrl
                    });
                }
            }
        }
        return result;
    }, []);
};

const storyBox = element => {
    const { information, sectionAliasMobile } = element;
    const featureInfo = featureInformation(information, sectionAliasMobile);

    if (sectionAliasMobile === 'Anticipo') return { ...featureInfo };
    const articles = get(element, 'articles', []);

    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles = articlesMap(ordererArticles, sectionAliasMobile);

    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            notas: resultArticles
        };
    }
    return null;
};

const bannerBox = element => {
    const type = typeSection[element.sectionAliasMobile];
    return {
        ...type,
        idSeccion: element.id
    };
};

const anexoMobile = element => {
    const { information, sectionAliasMobile } = element;
    const featureInfo = featureInformation(information, sectionAliasMobile);
    const articles = get(element, 'articles', []);
    const ordererArticles = orderArticles(articles, information.layout);

    const resultArticles =
        sectionAliasMobile === 'Anexo'
            ? Anexo(ordererArticles)
            : AnexoMobile(ordererArticles);

    if (Array.isArray(resultArticles) && resultArticles.length > 0) {
        return {
            ...featureInfo,
            anexo: resultArticles[0]
        };
    }

    return null;
};

const sectionAcu = element => {
    if (
        element &&
        element.sectionAccumulated &&
        element.sectionAccumulated.length > 0
    ) {
        return element.sectionAccumulated[0];
    }

    return null;
};
const discardBox = element => {
    return null;
};

const typeBox = {
    0: storyBox,
    1: bannerBox,
    2: anexoMobile,
    3: sectionAcu,
    9: discardBox
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
