import handleCookie from '../../../../private/LN/common/utils/handleCookie';

const { getCookie } = handleCookie();
export const bannersTypes = {
    modal_1x1: {
        devices: {
            desktop: {
                slotId: '/133919216/fd-dsk/1x1_modal_dsk',
                size: [[1, 1]],
                divId: 'div-gpt-ad-1737484343850-0',
                classParent: 'none'
            },
            mobile: {
                slotId: '/133919216/fd-mob/1x1_modal_mob',
                size: [[1, 1]],
                divId: 'div-gpt-ad-1737484366932-0',
                classParent: 'none'
            },
            tablet: {
                slotId: '/133919216/fd-tab/1x1_modal_tab',
                size: [[1, 1]],
                divId: 'div-gpt-ad-1737484391591-0',
                classParent: 'none'
            }
        },
        getTargetings: () => ({
            p_gaComboType: getCookie('gaComboType') || 'N/A',
            p_logeado: localStorage.getItem('CDUsuarioLogeado') || 'no',
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no'
        })
    }
};
