import Consumer from 'fusion:consumer';
import FeatureArticulo from '../articulo/json';

class BombaFeature {
    constructor(props) {
        this.props = props;
        this.state = {};
    }

    render() {
        try {
            return {
                information: this.props.customFields,
                articles: new FeatureArticulo(this.props)
            };
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(BombaFeature);
