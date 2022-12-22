// LN_Caja_Manual
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import respChain from '../../private/LN/api/v1/global/home/chains/respCajaCollection';

class CajaManual {
    constructor(props) {
        this.props = props;

        const imageId = get(props, 'customFields.imageId', '');
        const idCollection = get(props, 'customFields.idCollection', '');

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

    render() {
        try {
            const { containerImage } = this.state || {};
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
