import { useContent } from 'fusion:content';
import findTermica from '../../../common/utils/findTermica';

const useTermica = ({ source, name, responseKey } = {}) => {
    const finalSource = source || `${name}Source`;
    const switchValue = findTermica(name);

    const { [responseKey || name]: value } =
        useContent({ source: finalSource }) || {};

    return switchValue ? value : undefined;
};

export default useTermica;
