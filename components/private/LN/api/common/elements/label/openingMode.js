import get from '../../../../../common/utils/get';
import {
    CARDS,
    HTMLLIBRE,
    HTMLLIBRECLL,
    LIVEBLOG_EDITORIAL,
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
    VIDEOAL100,
    CARDS
];

const HARDCODED_NATIVE_BROWSER_SECTIONS = ['/juegos/retrofoto'];

const isNativeBrowserSection = dataNota =>
    HARDCODED_NATIVE_BROWSER_SECTIONS.includes(
        get(dataNota, 'taxonomy.primary_section.path', '')
    );

const getOpeningMode = dataNota => {
    const subtype = get(dataNota, 'subtype', '');
    const enviarApps = get(
        dataNota,
        'label.enviar_a_apps.text',
        null
    )?.toLowerCase();

    if (isNativeBrowserSection(dataNota)) {
        return OpeningMode.NativeBrowser;
    }
    if (
        HARDCODED_WEBVIEW_SUBTYPES.includes(subtype) &&
        enviarApps === 'browser'
    ) {
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
