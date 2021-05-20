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
    Tema: { tipoSeccion: 'tema', idSeccion: 305 }
};

const featureInformation = (information, feature) => {
    const res = {
        ...typeSection[feature],
        diagramacion: information.layout
    };

    if (feature === 'Anticipo') {
        res.texto = information.title;
    }
    if (!information.hideTecho && feature !== 'Apertura') {
        return {
            ...res,
            tituloCaja: information.title,
            url: information.url
        };
    }
    return res;
};

const index = children => {
    const ArticlesbyBox = children.reduce((result, f) => {
        const { information, feature, configurations } = f;
        const articles = get(f, 'articles', []);

        const res = {
            ...featureInformation(information, feature),
            notas: Article(articles, configurations)
        };

        result.push(res);
        return result;
    }, []);
    return [removeEmptyItems(ArticlesbyBox)];
};

export default index;
