import get from '../../../../../common/utils/get';

const sentToApps = dataNota => {
    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);
    if (!enviarApps) return true;

    return !(
        enviarApps.toLowerCase() === 'no' ||
        enviarApps.toLowerCase() === 'browser'
    );
};
export default sentToApps;
