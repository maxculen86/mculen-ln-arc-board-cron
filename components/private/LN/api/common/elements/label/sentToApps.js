import get from '../../../../../common/utils/get';
import { LIVEBLOG_EDITORIAL } from '../../../../../common/utils/subtypes/subtypeHelper';

const sentToApps = dataNota => {
    const subtype = get(dataNota, 'subtype', '');

    if (subtype === LIVEBLOG_EDITORIAL) return false;

    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);
    if (!enviarApps) return true;

    return !(
        enviarApps.toLowerCase() === 'no' ||
        enviarApps.toLowerCase() === 'browser'
    );
};
export default sentToApps;
