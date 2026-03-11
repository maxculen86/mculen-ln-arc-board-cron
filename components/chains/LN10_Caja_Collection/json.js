import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import GetCajaCollection from '../../private/LN/api/global/components/chains/LN10/getCajaCollection';
import checkChildInSection from '../utils/checkChildBySection';
import { validateChain, getBreakingChildren } from './common/_helper-WebApi';
import { LAYOUTS } from '../utils/common/_helpers-WebApi';
import getViewabilityRoof from '../utils/getViewabilityRoof';

class CajaCollection extends GetCajaCollection {
    constructor(props) {
        super(props, null);
    }

    // eslint-disable-next-line class-methods-use-this
    validate = (propsValidate, articles) => {
        const {
            id: chainId,
            customFields: { idCollection, layout = '', chainStyle },
            renderables = []
        } = propsValidate;

        const breakingsChildren = getBreakingChildren(renderables);
        const isInBreakings = checkChildInSection(chainId, breakingsChildren);
        const { BN_6_GRID_MAS_TIMELINE } = LAYOUTS;
        const isGrid6MasTimeline = layout === BN_6_GRID_MAS_TIMELINE;

        return validateChain({
            idCollection,
            articles,
            layout,
            renderables,
            chainId,
            isInBreakings,
            chainStyle,
            isGrid6MasTimeline
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

            const {
                id: chainId,
                renderables = [],
                customFields: propsForRoof = {}
            } = this.props || {};

            const viewabilityRoof = getViewabilityRoof(
                chainId,
                renderables,
                propsForRoof
            );

            return this.renderResponse(
                { ...this.props, viewabilityRoof },
                elements,
                containerImage
            );
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaCollection);
