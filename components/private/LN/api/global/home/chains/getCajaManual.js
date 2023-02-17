import get from '../../../../../common/utils/get';
import {
    validatePropsChains,
    findKeyTypeChain
} from './utils/validatePropsChains';
import respChain from './respChildrens/index';

class GetCajaManual {
    constructor(props, typeBox) {
        const typeChain = typeBox || findKeyTypeChain(props);
        this.props = validatePropsChains(props, typeChain);
        this.props.typeChain = typeChain;
        this.state = {};
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
        imageId.trim() &&
            this.fetchContent({
                containerImage: {
                    source: 'relatedImageSource',
                    query: {
                        id: imageId.trim(),
                        published: true,
                        imageConfig: 'techoImagen',
                        'arc-site': 'la-nacion-ar',
                        nid: `IdCollection ${idCollection}`,
                        boxType: 'GetCajaManual'
                    }
                }
            });
    }

    renderRespose = (props, image) => {
        return respChain(props, image);
    };

    render() {
        return null;
    }
}
export default GetCajaManual;
