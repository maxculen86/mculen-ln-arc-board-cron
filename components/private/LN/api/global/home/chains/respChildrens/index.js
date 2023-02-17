import get from '../../../../../../common/utils/get';
import { respChildrens as respApertura } from './elements/apertura';
import { respChildrens as respBomba } from './elements/bomba';
import { respChildrens as respManualLN10 } from './elements/temaLN10';
import { responseDefault } from './elements/tema';

export const respChildrens = {
    apertura: respApertura,
    bomba: respBomba,
    chainManual: respManualLN10,
    default: responseDefault
};

const respChain = (props, containerImage) => {
    const { customFields, typeChain } = props;
    const responseChildren = respChildrens[typeChain]
        ? respChildrens[typeChain](props)
        : responseDefault(props);

    return {
        information: { ...customFields, image: containerImage },
        articles: responseChildren
    };
};
export default respChain;
