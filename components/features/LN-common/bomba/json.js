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
            const { articleSourceNota, articleImage } = articulo.state || {};
            const {
                noteId,
                title,
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
                    image: articleImage || null,
                    chapita,
                    lead,
                    authors
                }
            };

            return {
                information: { hideCaja: hideFeature, layout: 'grilla1' },
                articles: [article]
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(BombaFeature);
