import Article from './article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.map(e => {
        const { articles, information } = e;
        const subChild = articles.map(item => {
            return Article(item, diagramacion);
        });

        const tagDestacado = {
            tipoSeccion: 'tema',
            tagDestacado: {
                valor: information.title,
                url: information.url
            }
        };

        return {
            tagDestacado,
            notas: subChild
        };
    });

    return [ArticlesbyBox];
};

export default index;
