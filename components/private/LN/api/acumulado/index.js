import ArticleList from './articleList';

const index = props => {
    const {
        globalContent: { content_elements: contentElements, next }
    } = props;

    return {
        paginar: next > 0,
        titulo: 'Usar HOC de section para obtener la data del nombre',
        notas: ArticleList(contentElements)
    };
};

export default index;
