import Consumer from 'fusion:consumer';
import get from '../../../private/common/utils/get';
import ChainCajaCollection from '../../../chains/Ln_Caja_Collection/json';

class Editoriales {
    constructor(props) {
        this.props = props;
    }

    render() {
        try {
            const articulos = new ChainCajaCollection(this.props);
            const { articleList } = articulos.state || {};

            if (!articleList) {
                return null;
            }
            const elem = get(articleList, 'content_elements', []);

            const articles = elem.map(e => {
                return {
                    ...e,
                    additionalProperties: {
                        subtype: 2
                    }
                };
            });

            return {
                information: {
                    ...this.props.customFields
                },
                articles
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(Editoriales);
