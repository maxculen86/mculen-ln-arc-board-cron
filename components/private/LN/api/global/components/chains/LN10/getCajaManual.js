import get from '../../../../../../common/utils/get';
import { validatePropsChains } from '../common/props/validatePropsChains';
import respChain from '../common/respChildrens/index';
import { processLayoutItems } from '../../../../../../../chains/utils/processLayoutItems';
import { LAYOUTS } from '../../../../../../../chains/utils/common/_helpers-WebApi';

const { FOCAL_LEFT, BN_6_GRID_MAS_TIMELINE } = LAYOUTS;

const countTimeline = [FOCAL_LEFT, BN_6_GRID_MAS_TIMELINE];
class GetCajaManual {
    constructor(props, typeChain) {
        this.props = validatePropsChains(props, typeChain, 'LN10');
        this.state = {};

        const imageId = get(this.props, 'customFields.imageId', '');
        const idCollection = get(this.props, 'customFields.idCollection', '');

        if (imageId && imageId.trim())
            this.fetchContent({
                containerImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig: 'techoImagen',
                        'arc-site': 'la-nacion-ar',
                        nid: `idCollection: ${idCollection}`,
                        boxType: 'CajaManual'
                    }
                }
            });
    }

    renderResponse(props, image) {
        const {
            children,
            childprops,
            customFields: { layout = '' }
        } = this.props;

        this.props.children = processLayoutItems(
            children,
            childprops,
            layout,
            countTimeline.includes(layout)
        );
        return respChain(props, image);
    }

    render() {
        return null;
    }
}
export default GetCajaManual;
