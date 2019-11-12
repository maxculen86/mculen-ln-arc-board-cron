import ArticleList from './articleList';
import AcuTitle from './acuTitle';

const index = props => {
    const {
        globalContent: { content_elements: contentElements, next }
    } = props;

    return {
        paginar: next > 0,
        titulo: AcuTitle(contentElements),
        notas: ArticleList(contentElements)
    };
};

export default index;
