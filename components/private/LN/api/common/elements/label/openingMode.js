import get from '../../../../../common/utils/get';
import {
    LIVEBLOG_EDITORIAL,
    HTMLLIBRECLL
} from '../../../../../common/utils/subtypes/subtypeHelper';

const OpeningMode = {
    Native: 'Native',
    NativeBrowser: 'NativeBrowser',
    ExternalBrowser: 'ExternalBrowser'
};

const getOpeningMode = dataNota => {
    const subtype = get(dataNota, 'subtype', '');

    if (subtype === LIVEBLOG_EDITORIAL) return OpeningMode.NativeBrowser;
    if (subtype === HTMLLIBRECLL) return OpeningMode.ExternalBrowser;
    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);
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
