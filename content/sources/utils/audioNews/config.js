import {
    HTMLLIBRE,
    VIDEO,
    RECETA,
    AGENCIA,
    LIVEBLOG,
    FOTOAL100
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';

export default {
    disableSubtypes: [HTMLLIBRE, VIDEO, RECETA, AGENCIA, LIVEBLOG],
    disableSubtypesForApps: [RECETA, HTMLLIBRE, FOTOAL100]
};
