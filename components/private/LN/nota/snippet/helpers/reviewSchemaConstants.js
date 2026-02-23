import { SITE_LANACION } from 'fusion:environment';
import { addForwardSlash } from '../../../common/utils/addForwardSlash';

export const SITE_LANACION_URL = addForwardSlash(SITE_LANACION);
export const ORGANIZATION_SCHEMA_ID = `${SITE_LANACION_URL}#organization`;
export const REVIEW_LOGO_URL =
    'https://arc-static.glanacion.com/pf/resources/images/placeholderLN-1280x1280.jpg?d=1817';
export const PUBLISHING_PRINCIPLES = `${SITE_LANACION}/tema/the-trust-project-tid68036/`;
