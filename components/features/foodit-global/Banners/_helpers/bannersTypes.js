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
        getTargetings: ({ contentType }) => ({
            p_gaComboType: getCookie('gaComboType') || 'N/A',
            p_logeado: localStorage.getItem('CDUsuarioLogeado') || 'no',
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no',
            p_premiumId: getCookie('ProductoPremiumId') || 'N/A',
            content_type: contentType
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
        getTargetings: ({ contentType }) => ({
            p_gaComboType: getCookie('gaComboType') || 'N/A',
            p_logeado: localStorage.getItem('CDUsuarioLogeado') || 'no',
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no',
            p_premiumId: getCookie('ProductoPremiumId') || 'N/A',
            content_type: contentType
        })
    },
    caja_1: {
        devices: {
            desktop: {
                slotId: '/133919216/fd-dsk/cinturon_dsk',
                size: [
                    [1, 1],
                    [640, 360],
                    [640, 480],
                    [728, 90],
                    [468, 60]
                ],
                divId: 'cinturon_dsk',
                classParent: 'flex jc-center',
                styleBanner: {}
            },
            mobile: {
                slotId: '/133919216/fd-mob/caja_mob',
                size: [
                    [1, 1],
                    [300, 250],
                    [300, 450],
                    [320, 50],
                    [320, 100],
                    [320, 180],
                    [360, 270]
                ],
                divId: 'caja_mob',
                classParent: 'flex jc-center',
                styleBanner: {}
            },
            tablet: {
                slotId: '/133919216/fd-tab/caja_tab',
                size: [
                    [728, 90],
                    [640, 480],
                    [468, 60],
                    [1, 1]
                ],
                divId: 'caja_tab',
                classParent: 'flex jc-center',
                styleBanner: {}
            }
        },
        getTargetings: ({ contentType }) => ({
            p_gaComboType: getCookie('gaComboType') || 'N/A',
            p_logeado: localStorage.getItem('CDUsuarioLogeado') || 'no',
            p_suscriptor: localStorage.getItem('CDpayUser') || 'no',
            p_premiumId: getCookie('ProductoPremiumId') || 'N/A',
            content_type: contentType
        })
    }
};
