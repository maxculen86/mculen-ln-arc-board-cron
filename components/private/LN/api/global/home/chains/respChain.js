import get from '../../../../../common/utils/get';
import { respChildrens as response } from './respChildrens/index';

const respChain = (containerImage, props) => {
    const { customFields, typeChain } = props;
    const responseChildren = response[typeChain]
        ? response[typeChain](props)
        : response.dafaultResponse(props);

    return {
        information: { ...customFields, image: containerImage },
        articles: responseChildren
    };
};
export default respChain;
