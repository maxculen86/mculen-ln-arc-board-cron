import { get } from 'lodash';
import Image from '../common/image';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import { articleItem as Article, anexoItem as Anexo } from './article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas
const typeSection = {
    Anticipo: { tipoSeccion: 'anticipo', idSeccion: 501 },
    Bomba: { tipoSeccion: 'bomba', idSeccion: 102 },
    Apertura: { tipoSeccion: 'apertura', idSeccion: 200 },
    Anexo: { tipoSeccion: 'anexo', idSeccion: 0 },
    Opinion: { tipoSeccion: 'opinion', idSeccion: 1001 },
    Comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    Banner: { tipoSeccion: 'banner' },
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

const storyBox = element => {
    const { information, feature, configurations } = element;
    const featureInformation = featureInformation(information, feature);
    if (feature === 'Anticipo') return { ...featureInformation };

    const articles = get(element, 'articles', []);
    if (feature === 'Anticipo') return { ...featureInformation };
    if (articles && articles.length > 0) {
        return {
            ...featureInformation,
            notas:
                feature !== 'Anexo'
                    ? Article(articles, configurations)
                    : Anexo(articles)
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

const typeBox = {
    0: storyBox,
    1: bannerBox
};

const index = children => {
    const ArticlesbyBox = children.reduce((result, f, i) => {
        result.push(typeBox[f.type](f));
        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

export default index;
