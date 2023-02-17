// LN_Caja_Manual
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import respChain from '../../private/LN/api/global/home/chains/respChildrens/index';

class CajaManual {
    constructor(props) {
        this.props = props;
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

    render() {
        try {
            const { containerImage } = this.state || {};
            return respChain(this.props, containerImage);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}

export default Consumer(CajaManual);
