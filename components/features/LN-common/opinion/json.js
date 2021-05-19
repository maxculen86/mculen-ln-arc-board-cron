import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import ChainCajaCollection from '../../../chains/Ln_Caja_Collection/json';

class Opinion {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const articulos = new ChainCajaCollection(this.props);
            const { articleList } = articulos.state || {};
            const { type } = this.props;

            if (!articleList) {
                return null;
            }
            const articles = get(articleList, 'content_elements', []);
            return {
                information: {
                    ...this.props.customFields,
                    type
                },
                articles
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Opinion);
