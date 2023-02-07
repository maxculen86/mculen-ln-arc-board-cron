import {
    validateFeature,
    getCommonPropsJson,
    getArticlesFromMyCurrentCollection,
    getIdsArticlesFromOtherCollections
} from '../../../../common/utils/cajaTemasValidators';
import get from '../../../../../common/utils/get';
import {
    validateFieldsChains,
    findKeyTypeChain
} from './utils/validateFieldsChains';
import respChain from './respCajaCollection';

class GetCajaManual {
    constructor(props) {
        this.typeChain = findKeyTypeChain(props);
        this.props = validateFieldsChains(props, this.typeChain);

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

    render() {
        try {
            const { containerImage } = this.state || {};
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default GetCajaManual;
