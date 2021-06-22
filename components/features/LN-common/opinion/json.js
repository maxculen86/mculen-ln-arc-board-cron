import get from '../../../private/common/utils/get';
import ChainCajaCollection from '../../../chains/Ln_Caja_Collection/json';

class Opinion {
    constructor(props) {
        this.props = props;
        this.articulos = new ChainCajaCollection(this.props);
    }

    render() {
        try {
            const { articleList } = this.articulos.state || {};

            if (!articleList) {
                return null;
            }
            const elem = get(articleList, 'content_elements', []);

            const articles = elem.map(e => {
                return {
                    ...e,
                    additionalProperties: {
                        subtype: 1
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

export default Opinion;
