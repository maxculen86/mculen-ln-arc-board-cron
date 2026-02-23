import {
    HTMLLIBRE,
    VIDEO,
    RECETA,
    AGENCIA,
    LIVEBLOG,
    FOTOAL100,
    VIDEO_VERTICAL
} from '../../../../components/private/common/utils/subtypes/subtypeHelper';

export default {
    disableSubtypes: [HTMLLIBRE, VIDEO, RECETA, AGENCIA, LIVEBLOG],
    disableSubtypesForApps: [
        RECETA,
        HTMLLIBRE,
        FOTOAL100,
        VIDEO,
        VIDEO_VERTICAL
    ]
};
