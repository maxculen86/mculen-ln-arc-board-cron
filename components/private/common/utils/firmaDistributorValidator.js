import { RECETA, HTMLLIBRE, AGENCIA } from './subtypes/subtypeHelper';

const firmaDistributorValidation = (isBrand, subtype, sponsored) => {
    if (subtype === RECETA || AGENCIA || HTMLLIBRE) return false;
    if (isBrand) return false;
    if (sponsored) return false;

    return true;
};

export default firmaDistributorValidation;
