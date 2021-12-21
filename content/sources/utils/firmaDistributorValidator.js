import {
    RECETA,
    AGENCIA,
    HTMLLIBRE
} from '../../../components/private/common/utils/subtypes/subtypeHelper';
import { getSectionLogo } from '../../../components/private/common/utils/sectionUtils';

const firmaDistributorValidation = (
    sections,
    layout,
    name,
    subtype,
    sponsored
) => {
    const isBrand = getSectionLogo(sections, layout, name);

    if (subtype === RECETA || subtype === AGENCIA || subtype === HTMLLIBRE)
        return false;
    if (isBrand !== null) return false;
    if (sponsored === true) return false;

    return true;
};

export default firmaDistributorValidation;
