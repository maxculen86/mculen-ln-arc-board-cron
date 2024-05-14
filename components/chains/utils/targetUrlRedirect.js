import { SITE_LANACION } from 'fusion:environment';

export function targetUrlRedirect(urlData = '') {
    return urlData.startsWith(SITE_LANACION) || urlData.startsWith('/')
        ? '_self'
        : '_blank';
}
