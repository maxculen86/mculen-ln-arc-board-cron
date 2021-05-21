import { get } from 'lodash';
import { removeEmptyItems } from '../common/utils/responseCleaner';
import Article from './article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas
const typeSection = {
    Anticipo: { tipoSeccion: 'anticipo', idSeccion: 501 },
    Bomba: { tipoSeccion: 'bomba', idSeccion: 101 },
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
    const articles = get(element, 'articles', []);

    return {
        ...featureInformation(information, feature),
        notas: Article(articles, configurations)
    };
};

const bannerBox = element => {
    const type = typeSection[element.feature];
    return {
        ...type,
        Id: element.id
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
