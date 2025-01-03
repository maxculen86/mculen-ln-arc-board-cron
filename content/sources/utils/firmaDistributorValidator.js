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
    authors,
    sponsored
) => {
    const isBrand = getSectionLogo(sections, layout, name);
    return !(
        authors.length > 0 ||
        [RECETA, AGENCIA, HTMLLIBRE].includes(subtype) ||
        isBrand !== null ||
        sponsored
    );
};

export default firmaDistributorValidation;
