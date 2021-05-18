import { get } from 'lodash';
import getIndexArray from '../../../common/utils/getIndexArray';
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

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.reduce((result, f) => {
        const { information, feature } = f;
        let seccionPadre = 0;
        //  const filteredArray = this.state.list.filter((_, i) => i !== index);

        const res = {
            ...typeSection[feature],
            diagramacion: information.layout
        };
        if (feature === 'Opinion') {
            const filteredArray = children.filter(x => x.feature === 'Opinion');
            seccionPadre = getIndexArray(
                f.information.idCollection,
                filteredArray,
                'information.idCollection'
            );
            seccionPadre += 1;
        }
        if (feature === 'Anticipo') {
            res.texto = information.title;
        } else {
            const articles = get(f, 'articles', []);

            const subChild = articles.map(item => {
                const itemArticle = { ...item, seccionPadre };
                return Article(itemArticle, diagramacion);
            });

            if (!information.hideTecho && feature !== 'Apertura') {
                res.tagDestacado = {
                    valor: information.title,
                    url: information.url
                };
            }
            res.notas = subChild;
        }
        result.push(res);
        return result;
    }, []);
    return [ArticlesbyBox];
};

export default index;
