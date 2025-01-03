import get from '../../../../../common/utils/get';

const sentToApps = dataNota => {
    const enviarApps = get(dataNota, 'label.enviar_a_apps.text', null);

    return !(enviarApps && enviarApps.toLowerCase() === 'no');
};
export default sentToApps;
