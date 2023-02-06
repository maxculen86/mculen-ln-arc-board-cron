// LN_Caja_Manual
import Consumer from 'fusion:consumer';
import get from '../../private/common/utils/get';
import respChain from '../../private/LN/api/global/home/chains/respCajaCollection';

class CajaManual {
    constructor(props) {
        this.props = props;

        const imageId = get(this.props, 'customFields.imageId', '');
        const idCollection = get(this.props, 'customFields.idCollection', '');

        // OJO: Esto es un codigo temporal solo para simular en caso de venir los parametros del boton
        if (imageId) {
            this.props.customFields = {
                ...get(this.props, 'customFields', {}),
                botomText: 'PROGRAMA EN VIVO',
                botomLink:
                    'https://www.semrush.com/website/weather.com/overview/',
                botomStyle: 'Red'
            };
        }

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
