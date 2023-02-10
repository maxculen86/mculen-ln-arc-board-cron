import get from '../../../../../common/utils/get';
import {
    validatePropsChains,
    findKeyTypeChain
} from './utils/validatePropsChains';
import respChain from './respCajaCollection';

class GetCajaManual {
    constructor(props, typeChain, validateFn) {
        this.typeChain = typeChain || findKeyTypeChain(props);
        this.props = validatePropsChains(props, this.typeChain);
        this.state = {};
        if (validateFn) {
            const error = validateFn(this.props);
            const respError =
                typeof error === 'object' ? JSON.stringify(error) : '';
            const paramsChain =
                this.props && this.props.customFields
                    ? JSON.stringify(this.props.customFields)
                    : '';

            if (error) {
                const respMsjError = `${respError}-${paramsChain}`;
                // eslint-disable-next-line no-console
                console.warn(`${respError}`, `ErrorChainManual`);
                this.error = respMsjError;
                return this;
            }
        }

        const imageId = get(this.props, 'customFields.imageId', null);
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
            if (this.error) {
                console.log(this.error);
                return null;
            }
            return respChain(containerImage, this.props);
        } catch (err) {
            return { Success: false, Message: err.message };
        }
    }
}
export default GetCajaManual;
