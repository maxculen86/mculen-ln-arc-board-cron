import handleCookie from '../../../LN/common/utils/handleCookie';

const getCustomTargeting = banner => {
    const { bannerId = '' } = banner || {};

    const { getCookie } = handleCookie();

    const bannersToGetCustomTargeting = {
        signwall: () => {
            const controlGroupV3Cookie = getCookie('controlGroupV3');
            let controlGroupV3Value = '';
            if (controlGroupV3Cookie) {
                try {
                    const controlGroupV3Obj = JSON.parse(controlGroupV3Cookie);
                    controlGroupV3Value =
                        controlGroupV3Obj.GrupoControlMeteredV3 || '';
                } catch (e) {
                    console.error('Error parsing controlGroupV3 cookie:', e);
                }
            }

            return {
                p_gaComboType: getCookie('gaComboType') || '',
                p_controlGroupV3: controlGroupV3Value || '',
                p_credencialClub: getCookie('usuarioDetalleClubNacion') || '',
                p_notaMeetering: getCookie('metering_arc_counter') || '',
                p_logeado: getCookie('cookieLogin') ? 'yes' : 'no',
                p_suscriptor: localStorage.getItem('CDpayUser') || ''
            };
        }
    };

    const bannerType = Object.keys(bannersToGetCustomTargeting).find(key =>
        bannerId.includes(key)
    );
    return bannerType ? bannersToGetCustomTargeting[bannerType]() : {};
};

export default getCustomTargeting;
