import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaCollection from '../../private/LN/api/global/home/chains/getCajaCollectionLN10';
import { validateChain } from './common/_helper-WebApi';

class CajaCollection extends GetCajaCollection {
    constructor(props) {
        super(props, 'chainCollection');
    }

    validate = (propsValidate, articles) => {
        const {
            id: chainId,
            customFields: { idCollection, layout = '', chainStyle },
            renderables = []
        } = propsValidate;

        const error = validateChain({
            idCollection,
            renderables,
            layout,
            articles,
            chainId,
            chainStyle
        });

        return error;
    };

    render() {
        try {
            const { articleList, containerImage } = this.state || {};
            if (!articleList) {
                return null;
            }
            const elements = get(articleList, 'content_elements', []);

            //  Tomar en cuenta para Cajas BN Focal 1+4 o Canal Focal 1+4, si valida que sea n5 notas.
            const error = this.validate(this.props, elements);
            if (error) {
                return null;
            }
            return this.renderRespose(this.props, elements, containerImage);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCollection);
