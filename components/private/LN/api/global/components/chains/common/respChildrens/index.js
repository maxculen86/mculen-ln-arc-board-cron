import { name } from 'file-loader';
import { respChildrens } from '../../config/configReponseByTypeChain';

const respChainByVersion = (props, version) =>
    respChildrens[version]
        ? respChildrens[version](props)
        : respChildrens.LN(props);

const respChain = (props, containerImage) => {
    const { customFields, typeChain, version, viewabilityRoof } = props;
    const isFocalVideoVertical = customFields.layout === 'left-focal-video-vertical' && typeChain === 'apertura';
    const nameChain = isFocalVideoVertical ? 'bnPlayer' : typeChain;

    const responseChildren = respChildrens[nameChain]
        ? respChildrens[nameChain](props)
        : respChainByVersion(props, version);

    if (typeChain === 'bnPlayer' || isFocalVideoVertical) {
        return {
            information: {
                ...customFields,
                image: containerImage,
                typeChain,
                viewabilityRoof
            },
            ...responseChildren
        };
    }

    return {
        information: {
            ...customFields,
            image: containerImage,
            typeChain,
            viewabilityRoof
        },
        articles: respChildrens
    };
};
export default respChain;
