import Consumer from 'fusion:consumer';
import FeatureArticulo from '../articulo/json';

class BombaFeature {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    render() {
        //return new FeatureArticulo(this.props);
        try {
            const articulo = new FeatureArticulo(this.props);
            const { articleSourceNota } = articulo.state || {};
            const articles = [];
            if (!articleSourceNota) {
                return null;
            }
            articles.push(articleSourceNota);
            return {
                information: this.props.customFields,
                articles
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(BombaFeature);
