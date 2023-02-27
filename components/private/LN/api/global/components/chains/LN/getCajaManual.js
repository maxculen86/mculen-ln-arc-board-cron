import get from '../../../../../../common/utils/get';
import { validatePropsChains } from '../common/props/validatePropsChains';
import respChain from '../common/respChildrens/index';

class GetCajaManual {
    constructor(props, typeChain) {
        this.props = validatePropsChains(props, typeChain, 'LN');
        this.state = {};

        const imageId = get(this.props, 'customFields.imageId', '');
        const idCollection = get(this.props, 'customFields.idCollection', '');

        imageId &&
            imageId.trim() &&
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

    renderResponse = (props, image) => respChain(props, image);

    render() {
        return null;
    }
}
export default GetCajaManual;
