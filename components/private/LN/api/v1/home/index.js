import { get } from 'lodash';
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

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.reduce((result, f) => {
        const { information, feature } = f;
        const res = {
            ...typeSection[feature],
            diagramacion: information.layout
        };
        if (feature === 'Anticipo') {
            res.texto = information.title;
        } else {
            const articles = get(f, 'articles', []);

            const subChild = articles.map(item => {
                return Article(item, diagramacion);
            });

            if (!information.hideTecho && feature !== 'Apertura') {
                res.tituloCaja = information.title;
                res.url = information.url;
            }
            res.notas = subChild;
        }
        result.push(res);
        return result;
    }, []);
    return [ArticlesbyBox];
};

export default index;
