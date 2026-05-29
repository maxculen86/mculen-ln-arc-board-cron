import { SITE_LANACION } from 'fusion:environment';
import { addForwardSlash } from '../../../common/utils/addForwardSlash';

export const SITE_LANACION_URL = addForwardSlash(SITE_LANACION);
export const ORGANIZATION_SCHEMA_ID = `${SITE_LANACION_URL}#organization`;
const PUBLISHING_PRINCIPLES_PATH = 'tema/the-trust-project-tid68036/';

export const getPublishingPrinciplesUrl = (host = SITE_LANACION) =>
    `${host.replace(/\/+$/, '')}/${PUBLISHING_PRINCIPLES_PATH}`;
