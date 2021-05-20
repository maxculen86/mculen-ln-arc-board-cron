import Consumer from 'fusion:consumer';
import FeatureArticulo from '../articulo/json';

class BombaFeature {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    render() {
        try {
            const articulo = new FeatureArticulo(this.props);
            const { articleSourceNota } = articulo.state || {};
            const {
                noteId,
                title,
                imageId,
                hideFeature,
                chapita,
                lead,
                authors
            } = this.props.customFields;

            if (!articleSourceNota) {
                return null;
            }

            const article = {
                ...articleSourceNota,
                additionalProperties: {
                    noteId,
                    title,
                    imageId,
                    chapita,
                    lead,
                    authors
                }
            };

            return {
                information: { hideCaja: hideFeature },
                articles: [article]
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(BombaFeature);
