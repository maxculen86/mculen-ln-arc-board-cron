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
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no',
            p_premiumId: getCookie('ProductoPremiumId') || 'N/A'
        })
    },
    sale_box: {
        devices: {
            desktop: {
                slotId: '/133919216/fd-dsk/cinturon_dsk',
                size: [
                    [1, 1],
                    [728, 90],
                    [920, 300],
                    [920, 100],
                    [920, 250],
                    [1260, 300]
                ],
                divId: 'div-gpt-ad-1751634601911-0',
                classParent: '',
                styleBanner: {
                    'min-width': '728px',
                    'min-height': '90px'
                }
            },
            mobile: {
                slotId: '/133919216/fd-mob/caja_mob',
                size: [
                    [320, 100],
                    [1, 1],
                    [300, 250],
                    [300, 450],
                    [320, 50]
                ],
                divId: 'div-gpt-ad-1751634691194-0',
                classParent: '',
                styleBanner: {
                    'min-width': '300px',
                    'min-height': '50px'
                }
            },
            tablet: {
                slotId: '/133919216/fd-tab/caja_tab',
                size: [[300, 250]],
                divId: 'div-gpt-ad-1751634717204-0',
                classParent: '',
                styleBanner: {
                    'min-width': '300px',
                    'min-height': '250px'
                }
            }
        },
        getTargetings: () => ({
            p_gaComboType: getCookie('gaComboType') || 'N/A',
            p_logeado: localStorage.getItem('CDUsuarioLogeado') || 'no',
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no',
            p_premiumId: getCookie('ProductoPremiumId') || 'N/A'
        })
    }
};
