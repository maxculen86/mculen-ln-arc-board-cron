import { CLL_HTMLFREE_DOMAIN } from 'fusion:environment';
import get from '../../../../../common/utils/get';
import { HTMLLIBRECLL } from '../../../../../common/utils/subtypes/subtypeHelper';

export const getDomainCLL = dataNota => {
    const subtype = get(dataNota, 'subtype', get(dataNota, 'templateId', ''));
    if (subtype === HTMLLIBRECLL) {
        return CLL_HTMLFREE_DOMAIN;
    }
    return null;
};
