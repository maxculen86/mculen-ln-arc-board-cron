import get from '../../../../../common/utils/get';
import {
    LIVEBLOG_EDITORIAL,
    HTMLLIBRECLL,
    HTMLLIBRE,
    RECETA,
    VIDEOAL100
} from '../../../../../common/utils/subtypes/subtypeHelper';

const OpeningMode = {
    Native: 'Native',
    NativeBrowser: 'NativeBrowser',
    ExternalBrowser: 'ExternalBrowser'
};

const HARDCODED_WEBVIEW_SUBTYPES = [
    LIVEBLOG_EDITORIAL,
    HTMLLIBRE,
    RECETA,
    VIDEOAL100
];

const getOpeningMode = dataNota => {
    const subtype = get(dataNota, 'subtype', '');
    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null)?.toLowerCase();

    if (HARDCODED_WEBVIEW_SUBTYPES.includes(subtype) && enviarApps === 'browser') {
        return OpeningMode.ExternalBrowser;
    }
    if (HARDCODED_WEBVIEW_SUBTYPES.includes(subtype)) {
        return OpeningMode.NativeBrowser;
    }
    if (subtype === HTMLLIBRECLL) return OpeningMode.ExternalBrowser;
    if (!enviarApps) return OpeningMode.Native;
    switch (enviarApps.toLowerCase()) {
        case 'si':
            return OpeningMode.Native;
        case 'no':
            return OpeningMode.NativeBrowser;
        case 'browser':
            return OpeningMode.ExternalBrowser;
        default:
            return OpeningMode.Native;
    }
};
export default getOpeningMode;
