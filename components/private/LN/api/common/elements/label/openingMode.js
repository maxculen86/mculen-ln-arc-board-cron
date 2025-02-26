import get from '../../../../../common/utils/get';

const OpeningMode = {
    Native: 'Native',
    NativeBrowser: 'NativeBrowser',
    ExternalBrowser: 'ExternalBrowser'
};

const getOpeningMode = dataNota => {
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
