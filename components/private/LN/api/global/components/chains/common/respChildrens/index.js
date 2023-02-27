import { respChildrens } from '../../config/configReponseByTypeChain';

const respChainByVersion = (props, version) => {
    return respChildrens[version]
        ? respChildrens[version](props)
        : respChildrens.LN(props);
};

const respChain = (props, containerImage) => {
    const { customFields, typeChain, version } = props;

    const responseChildren = respChildrens[typeChain]
        ? respChildrens[typeChain](props)
        : respChainByVersion(props, version);
    return {
        information: { ...customFields, image: containerImage, typeChain },
        articles: responseChildren
    };
};
export default respChain;
