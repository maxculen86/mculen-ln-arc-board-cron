import { respChildrens } from '../config/configReponseByTypeChain';
import { responseDefault } from './chainsTypes/tema';

const respChain = (props, containerImage) => {
    const { customFields, typeChain } = props;
    const responseChildren = respChildrens[typeChain]
        ? respChildrens[typeChain](props)
        : responseDefault(props);

    return {
        information: { ...customFields, image: containerImage, typeChain },
        articles: responseChildren
    };
};
export default respChain;
