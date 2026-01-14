import get from '../../../../../common/utils/get';
import { HTMLLIBRE, LIVEBLOG_EDITORIAL, RECETA, VIDEOAL100 } from '../../../../../common/utils/subtypes/subtypeHelper';

const HARDCODED_WEBVIEW_SUBTYPES = [
    LIVEBLOG_EDITORIAL,
    HTMLLIBRE,
    RECETA,
    VIDEOAL100
];

const sentToApps = dataNota => {
    const subtype = get(dataNota, 'subtype', '');

    if (HARDCODED_WEBVIEW_SUBTYPES.includes(subtype)) {
        return false;
    }

    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);
    if (!enviarApps) return true;

    return !(
        enviarApps.toLowerCase() === 'no' ||
        enviarApps.toLowerCase() === 'browser'
    );
};
export default sentToApps;
