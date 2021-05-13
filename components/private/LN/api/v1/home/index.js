import Article from './article';

// TODO: Recorrer las notas en un archivo nuevo.
// Recibir el array y validar que tenga notas

const index = (children, diagramacion) => {
    const ArticlesbyBox = children.map(e => {
        const { articles, information } = e;
        const subChild = articles.map(item => {
            return Article(item, diagramacion);
        });

        return {
            idSeccion: 305,
            tipoSeccion: 'tema',
            tagDestacado: {
                valor: information.title,
                url: information.url
            },
            notas: subChild
        };
    });

    return [ArticlesbyBox];
};

export default index;
