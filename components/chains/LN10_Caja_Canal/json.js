import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaCollection from '../../private/LN/api/global/components/chains/LN10/getCajaCollection';
import { validateChain } from '../LN10_Caja_Collection/common/_helper-WebApi';

class CajaCanal extends GetCajaCollection {
    constructor(props) {
        super(props, null);
    }

    validate = (propsValidate, articles) => {
        const {
            id: chainId,
            customFields: { idCollection, layout = '' },
            renderables = []
        } = propsValidate;

        return validateChain({
            idCollection,
            renderables,
            layout,
            articles,
            chainId
        });
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
            return this.renderResponse(this.props, elements, containerImage);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCanal);
