import Consumer from 'fusion:consumer';
import IndexNota from '../../../private/LN/api/nota';

class JsonArticle {
    constructor(props) {
        this.props = props;
    }

    render() {
        const { globalContent } = this.props;
        return IndexNota(globalContent);
    }
}

export default Consumer(JsonArticle);
