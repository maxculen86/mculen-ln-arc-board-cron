import { respChildrens } from '../../config/configReponseByTypeChain';

const respChainByVersion = (props, version) =>
    respChildrens[version]
        ? respChildrens[version](props)
        : respChildrens.LN(props);

const respChain = (props, containerImage) => {
    const { customFields, typeChain, version, viewabilityRoof } = props;

    const responseChildren = respChildrens[typeChain]
        ? respChildrens[typeChain](props)
        : respChainByVersion(props, version);
    return {
        information: {
            ...customFields,
            image: containerImage,
            typeChain,
            viewabilityRoof
        },
        articles: responseChildren
    };
};
export default respChain;
