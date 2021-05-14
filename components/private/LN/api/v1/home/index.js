import { get } from 'lodash';
import Article from './article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas

const typeSection = {
    Anticipo: { tipoSeccion: 'anticipo', idSeccion: 501 },
    Bomba: { tipoSeccion: 'bomba', idSeccion: 101 },
    Apertura: { tipoSeccion: 'tema', idSeccion: 305 },
    Anexo: { tipoSeccion: 'anexo', idSeccion: 0 },
    Opinion: { tipoSeccion: 'opinion', idSeccion: 501 },
    Comercial: { tipoSeccion: 'comercial', idSeccion: 1101 },
    Tema: { tipoSeccion: 'tema', idSeccion: 305 }
};

//TODO: Refactor para evitar nested arrays, Abstraer logica de notas.
const index = (children, diagramacion) => {
    const ArticlesbyBox = children.reduce((result, f) => {
        return f.elements.reduce((result, c) => {
            const { information } = c;
            const res = {
                ...typeSection[f.feature],
                diagramacion: information.layout
            };
            if (f.feature === 'Anticipo') {
                res.texto = information.title;
            } else {
                const articles = get(c, 'articles', []);

                const subChild = articles.map(item => {
                    return Article(item, diagramacion);
                });

                if (!information.hideTecho && f.feature !== 'Apertura') {
                    res.tagDestacado = {
                        valor: information.title,
                        url: information.url
                    };
                }
                res.notas = subChild;
            }
            result.push(res);
            return result;
        }, result);
    }, []);
    return [ArticlesbyBox];
};

export default index;
