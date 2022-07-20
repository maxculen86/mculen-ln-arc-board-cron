import get from '../../../../../common/utils/get';

const sentToApps = dataNota => {
    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);
    if (enviarApps && enviarApps.toLowerCase() === 'no') return false;
    return true;
};
export default sentToApps;
