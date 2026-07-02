const targetingNota = {
    sitio: 'lanacion',
    seccion: 'nota'
};
const targetingAcumulado = {
    sitio: 'lanacion',
    seccion: 'acumulado'
};
const targetingHome = {
    sitio: 'lanacion',
    seccion: 'home'
};

const HEADER_ROUTE_DESK = 'la_nacion_desktop/logo_header_dsk_sticky';
const HEADER_ROUTE_MOBILE = 'la_nacion_mobile/logo_header_mob';
const HEADER_ROUTE_TAB = 'la_nacion_tablet/logo_header_tab';
const SLOT_BANNER_QUESALE = 'la_nacion_video/Nota/quesale';

export default {
    dfp_id: 133919216,
    nota: {
        desktop: {
            logo_header_dsk_sticky: {
                slotName: HEADER_ROUTE_DESK,
                dimensions: [[305, 32]],
                targeting: targetingNota
            },
            adhesion_dsk: {
                slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
                dimensions: [
                    [728, 90],
                    [920, 100]
                ],
                targeting: targetingNota,
                closeButton: true,
                hideForSubscriptor: true
            },
            megatop_dsk: {
                slotName: 'la_nacion_desktop/Nota/megatop_dsk',
                dimensions: [[800, 600]],
                targeting: targetingNota
            },
            '1x1_dsk': {
                slotName: 'la_nacion_desktop/Nota/1x1_dsk',
                dimensions: [[1, 1]],
                targeting: targetingNota,
                hideForSubscriptor: true
            },
            cabezal_dsk: {
                slotName: 'la_nacion_desktop/Nota/cabezal_dsk',
                withoutHide: true,
                dimensions: [
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [970, 90],
                    [1260, 100],
                    [1260, 170]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja1_dsk: {
                slotName: 'la_nacion_desktop/Nota/caja1_dsk',
                withoutHide: true,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_dsk: {
                slotName: 'la_nacion_desktop/Nota/caja2_dsk',
                withoutHide: true,
                dimensions: [[300, 250]],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja3_dsk: {
                slotName: 'la_nacion_desktop/Nota/caja3_dsk',
                withoutHide: true,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja4_dsk: {
                slotName: 'la_nacion_desktop/Nota/caja4_dsk',
                withoutHide: true,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja5_dsk: {
                slotName: 'la_nacion_desktop/Nota/caja5_dsk',
                withoutHide: true,
                dimensions: [[300, 250]],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            inread_dsk: {
                slotName: 'la_nacion_desktop/Nota/inread_dsk',
                dimensions: [
                    [1, 1],
                    [728, 90]
                ],
                targeting: targetingNota
            },
            middle_1_dsk: {
                slotName: 'la_nacion_desktop/Nota/middle_1_dsk',
                withoutHide: true,
                dimensions: [
                    [1, 1],
                    [640, 360],
                    [640, 480],
                    [728, 90],
                    [468, 60]
                ],
                targeting: targetingNota,
                hideForSubscriptor: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_2_dsk: {
                slotName: 'la_nacion_desktop/Nota/middle_2_dsk',
                withoutHide: true,
                dimensions: [
                    [468, 60],
                    [640, 480],
                    [728, 90],
                    [1, 1]
                ],
                targeting: targetingNota,
                hideForSubscriptor: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_3_dsk: {
                slotName: 'la_nacion_desktop/Nota/middle_3_dsk',
                withoutHide: true,
                dimensions: [
                    [728, 90],
                    [640, 480],
                    [468, 60],
                    [1, 1]
                ],
                targeting: targetingNota,
                hideForSubscriptor: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_teads_dsk: {
                slotName: 'la_nacion_desktop/Nota/middle_teads_dsk',
                dimensions: [
                    [1, 1],
                    [728, 90]
                ],
                targeting: targetingNota
            },
            comercial_dsk: {
                slotName: 'la_nacion_desktop/Nota/comercial_dsk',
                dimensions: [
                    [1, 1],
                    [800, 600]
                ],
                targeting: targetingNota,
                closeButton: true
            },
            '1x1_signwall_dsk': {
                slotName: 'la_nacion_desktop/Nota/1x1_signwall_dsk',
                dimensions: [[1, 1]],
                targeting: targetingNota
            }
        },
        mobile: {
            logo_header_mob: {
                slotName: HEADER_ROUTE_MOBILE,
                dimensions: [[172, 19]],
                targeting: targetingNota
            },
            adhesion_mob: {
                slotName: 'la_nacion_mobile/Nota/adhesion_mob',
                dimensions: [[320, 50]],
                targeting: targetingNota,
                closeButton: true,
                hideForSubscriptor: true
            },
            megatop_mob: {
                slotName: 'la_nacion_mobile/Nota/megatop_mob',
                dimensions: [[320, 480]],
                targeting: targetingNota
            },
            '1x1_mob': {
                slotName: 'la_nacion_mobile/Nota/1x1_mob',
                dimensions: [[1, 1]],
                targeting: targetingNota,
                hideForSubscriptor: true
            },
            sticky1_mob: {
                slotName: 'la_nacion_mobile/Nota/sticky1_mob',
                dimensions: [[320, 100]],
                targeting: targetingNota,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            sticky2_mob: {
                slotName: 'la_nacion_mobile/Nota/sticky2_mob',
                dimensions: [[320, 50]],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja1_mob: {
                slotName: 'la_nacion_mobile/Nota/caja1_mob',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_mob: {
                slotName: 'la_nacion_mobile/Nota/caja2_mob',
                withoutHide: true,
                hideForSubscriptor: true,
                dimensions: [
                    [1, 1],
                    [300, 250],
                    [300, 450],
                    [320, 50],
                    [320, 100],
                    [320, 180],
                    [360, 270]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja3_mob: {
                slotName: 'la_nacion_mobile/Nota/caja3_mob',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [320, 100],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja4_mob: {
                slotName: 'la_nacion_mobile/Nota/caja4_mob',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [320, 100],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja5_mob: {
                slotName: 'la_nacion_mobile/Nota/caja5_mob',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [320, 100],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja6_mob: {
                slotName: 'la_nacion_mobile/Nota/caja6_mob',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [230, 50],
                    [300, 450],
                    [1, 1],
                    [320, 100]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja7_mob: {
                slotName: 'la_nacion_mobile/Nota/caja7_mob',
                withoutHide: true,
                hideForSubscriptor: true,
                dimensions: [
                    [300, 250],
                    [320, 50],
                    [300, 450],
                    [1, 1],
                    [320, 100]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja8_mob: {
                slotName: 'la_nacion_mobile/Nota/caja8_mob',
                withoutHide: true,
                hideForSubscriptor: true,
                dimensions: [
                    [300, 250],
                    [320, 50],
                    [300, 450],
                    [1, 1],
                    [320, 100]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja9_mob: {
                slotName: 'la_nacion_mobile/Nota/caja9_mob',
                withoutHide: true,
                hideForSubscriptor: true,
                dimensions: [
                    [300, 250],
                    [320, 50],
                    [300, 450],
                    [1, 1],
                    [320, 100]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja10_mob: {
                slotName: 'la_nacion_mobile/Nota/caja10_mob',
                withoutHide: true,
                hideForSubscriptor: true,
                dimensions: [
                    [300, 250],
                    [320, 50],
                    [300, 450],
                    [1, 1],
                    [320, 100]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            inread_mob: {
                slotName: 'la_nacion_mobile/Nota/inread_mob',
                dimensions: [
                    [1, 1],
                    [320, 50],
                    [300, 250]
                ],
                targeting: targetingNota
            },
            comercial_mob: {
                slotName: 'la_nacion_mobile/Nota/comercial_mob',
                dimensions: [
                    [1, 1],
                    [320, 480]
                ],
                targeting: targetingNota,
                closeButton: true
            },
            '1x1_signwall_mob': {
                slotName: 'la_nacion_mobile/Nota/1x1_signwall_mob',
                dimensions: [[1, 1]],
                targeting: targetingNota
            }
        },
        tablet: {
            logo_header_tab: {
                slotName: HEADER_ROUTE_TAB,
                dimensions: [[172, 19]],
                targeting: targetingNota
            },
            '1x1_tab': {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/1x1_tab',
                dimensions: [[1, 1]],
                targeting: targetingNota,
                hideForSubscriptor: true
            },
            cabezal_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/cabezal_tab',
                dimensions: [[728, 90]],
                targeting: targetingNota,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            adhesion_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/adhesion_tab',
                dimensions: [[728, 90]],
                targeting: targetingNota,
                closeButton: true,
                hideForSubscriptor: true
            },
            caja1_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/caja1_tab',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [300, 600]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/caja2_tab',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [300, 600]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja3_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/caja3_tab',
                withoutHide: true,
                dimensions: [
                    [300, 250],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            inread_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/inread_tab',
                dimensions: [
                    [1, 1],
                    [728, 90]
                ],
                targeting: targetingNota
            },
            middle_1_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/middle_1_tab',
                withoutHide: true,
                dimensions: [
                    [728, 90],
                    [640, 480],
                    [468, 60],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_2_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/middle_2_tab',
                withoutHide: true,
                dimensions: [
                    [728, 90],
                    [640, 480],
                    [468, 60],
                    [1, 1]
                ],
                targeting: targetingNota,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_teads_tab: {
                device: 'tab',
                slotName: 'la_nacion_tablet/Nota/middle_teads_tab',
                dimensions: [[1, 1]],
                targeting: targetingNota
            },
            '1x1_signwall_tab': {
                slotName: 'la_nacion_tablet/Nota/1x1_signwall_tab',
                dimensions: [[1, 1]],
                targeting: targetingNota
            }
        }
    },
    acumulado: {
        desktop: {
            logo_header_dsk_sticky: {
                slotName: HEADER_ROUTE_DESK,
                dimensions: [[305, 32]],
                targeting: targetingAcumulado
            },
            quesale_dsk: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingAcumulado
            },
            megatop_dsk: {
                slotName: `la_nacion_desktop/Acumulado/megatop_dsk`,
                dimensions: [[800, 600]],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            middle_1_dsk: {
                slotName: 'la_nacion_desktop/Acumulado/middle_1_dsk',
                dimensions: [[920, 250]],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            '1x1_dsk': {
                slotName: `la_nacion_desktop/Acumulado/1x1_dsk`,
                dimensions: [[1, 1]],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            cabezal_dsk: {
                slotName: `la_nacion_desktop/Acumulado/cabezal_dsk`,
                withoutHide: true,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [970, 90],
                    [1260, 100]
                ],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            adhesion_dsk: {
                slotName: `la_nacion_desktop/Acumulado/adhesion_dsk`,
                dimensions: [
                    [920, 100],
                    [728, 90]
                ],
                targeting: targetingAcumulado,
                hideForSubscriptor: true,
                closeButton: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja1_dsk: {
                slotName: `la_nacion_desktop/Acumulado/caja1_dsk`,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_dsk: {
                slotName: `la_nacion_desktop/Acumulado/caja2_dsk`,
                dimensions: [
                    [300, 250],
                    [300, 250],
                    [300, 250]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja3_dsk: {
                slotName: `la_nacion_desktop/Acumulado/caja3_dsk`,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja4_dsk: {
                slotName: `la_nacion_desktop/Acumulado/caja4_dsk`,
                dimensions: [
                    [300, 600],
                    [300, 250]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            comercial_dsk: {
                slotName: `la_nacion_desktop/Acumulado/comercial_dsk`,
                dimensions: [
                    [1, 1],
                    [800, 600]
                ],
                targeting: targetingAcumulado,
                closeButton: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            }
        },
        mobile: {
            logo_header_mob: {
                slotName: HEADER_ROUTE_MOBILE,
                dimensions: [[172, 19]],
                targeting: targetingAcumulado
            },
            quesale_mob: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingAcumulado
            },
            megatop_mob: {
                slotName: `la_nacion_mobile/Acumulado/megatop_mob`,
                dimensions: [[320, 480]],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            sticky1_mob: {
                slotName: `la_nacion_mobile/Acumulado/sticky1_mob`,
                withoutHide: true,
                dimensions: [
                    [320, 50],
                    [320, 100]
                ],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            sticky2_mob: {
                slotName: `la_nacion_mobile/Acumulado/sticky2_mob`,
                withoutHide: true,
                dimensions: [
                    [300, 50],
                    [320, 50]
                ],
                targeting: targetingAcumulado,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            adhesion_mob: {
                slotName: `la_nacion_mobile/Acumulado/adhesion_mob`,
                dimensions: [[320, 50]],
                targeting: targetingAcumulado,
                hideForSubscriptor: true,
                closeButton: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja1_mob: {
                slotName: `la_nacion_mobile/Acumulado/caja1_mob`,
                dimensions: [
                    [320, 50],
                    [320, 100],
                    [300, 250],
                    [300, 450],
                    [1, 1]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_mob: {
                slotName: `la_nacion_mobile/Acumulado/caja2_mob`,
                dimensions: [
                    [360, 270],
                    [320, 50],
                    [320, 100],
                    [300, 250],
                    [300, 450],
                    [1, 1]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja3_mob: {
                slotName: `la_nacion_mobile/Acumulado/caja3_mob`,
                dimensions: [
                    [320, 50],
                    [320, 100],
                    [300, 250],
                    [300, 450],
                    [1, 1]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja4_mob: {
                slotName: `la_nacion_mobile/Acumulado/caja4_mob`,
                dimensions: [
                    [320, 50],
                    [320, 100],
                    [300, 250],
                    [300, 450],
                    [1, 1]
                ],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            comercial_mob: {
                slotName: `la_nacion_mobile/Acumulado/comercial_mob`,
                dimensions: [
                    [1, 1],
                    [320, 480]
                ],
                targeting: targetingAcumulado,
                closeButton: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            }
        },
        tablet: {
            logo_header_tab: {
                slotName: HEADER_ROUTE_TAB,
                dimensions: [[172, 19]],
                targeting: targetingAcumulado
            },
            quesale_tab: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingAcumulado
            },
            cabezal_tab: {
                slotName: `la_nacion_tablet/Acumulado/cabezal_tab`,
                dimensions: [[728, 90]],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            adhesion_tab: {
                slotName: `la_nacion_tablet/Acumulado/adhesion_tab`,
                dimensions: [[728, 90]],
                targeting: targetingAcumulado,
                hideForSubscriptor: true,
                closeButton: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja1_tab: {
                slotName: `la_nacion_tablet/Acumulado/caja1_tab`,
                dimensions: [[728, 90]],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            },
            caja2_tab: {
                slotName: `la_nacion_tablet/Acumulado/caja2_tab`,
                dimensions: [[728, 90]],
                targeting: targetingAcumulado,
                withoutHide: true,
                bidding: {
                    prebid: {
                        enabled: true
                    }
                }
            }
        }
    },
    home: {
        desktop: {
            logo_header_dsk: {
                slotName: 'la_nacion_desktop/logo_header_dsk',
                dimensions: [[487, 48]]
            },
            quesale_dsk: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingHome
            },
            logo_header_dsk_sticky: {
                slotName: HEADER_ROUTE_DESK,
                dimensions: [[305, 32]]
            },
            megatop_dsk: {
                slotName: `la_nacion_desktop/Home/megatop_dsk`,
                dimensions: [
                    [1360, 250],
                    [1260, 250]
                ],
                targeting: targetingHome
            },
            '1x1_dsk': {
                slotName: `la_nacion_desktop/Home/1x1_dsk`,
                dimensions: [[1, 1]],
                targeting: targetingHome,
                hideForSubscriptor: true
            },
            cabezal_dsk: {
                slotName: `la_nacion_desktop/Home/cabezal_dsk`,
                withoutHide: true,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100]
                ],
                targeting: targetingHome
            },
            adhesion_dsk: {
                slotName: `la_nacion_desktop/Home/adhesion_dsk`,
                dimensions: [
                    [920, 100],
                    [728, 90],
                    [1, 1]
                ],
                targeting: targetingHome,
                hideForSubscriptor: true,
                closeButton: true
            },
            caja1_dsk: {
                slotName: `la_nacion_desktop/Home/caja1_dsk`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            caja2_dsk: {
                slotName: `la_nacion_desktop/Home/caja2_dsk`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            caja3_dsk: {
                slotName: `la_nacion_desktop/Home/caja3_dsk`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            caja4_dsk: {
                slotName: `la_nacion_desktop/Home/caja4_dsk`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            comercial_dsk: {
                slotName: `la_nacion_desktop/Home/comercial_dsk`,
                dimensions: [
                    [1, 1],
                    [800, 600]
                ],
                targeting: targetingHome,
                closeButton: true
            },
            megalateral_dsk: {
                slotName: `la_nacion_desktop/Home/megalateral_dsk`,
                dimensions: [
                    [120, 600],
                    [250, 600],
                    [160, 600],
                    [300, 600],
                    [300, 800]
                ],
                targeting: targetingHome
            },
            megalateral2_dsk: {
                slotName: `la_nacion_desktop/Home/megalateral2_dsk`,
                dimensions: [
                    [300, 250],
                    [120, 600],
                    [250, 600],
                    [160, 600],
                    [300, 600],
                    [300, 800]
                ],
                targeting: targetingHome
            },
            megalateral3_dsk: {
                slotName: `la_nacion_desktop/Home/megalateral3_dsk`,
                dimensions: [
                    [300, 250],
                    [120, 600],
                    [250, 600],
                    [160, 600],
                    [300, 600],
                    [300, 800]
                ],
                targeting: targetingHome
            },
            megalateral4_dsk: {
                slotName: `la_nacion_desktop/Home/megalateral4_dsk`,
                dimensions: [
                    [300, 250],
                    [120, 600],
                    [250, 600],
                    [160, 600],
                    [300, 600],
                    [300, 800]
                ],
                targeting: targetingHome
            },
            megalateral5_dsk: {
                slotName: `la_nacion_desktop/Home/megalateral5_dsk`,
                dimensions: [
                    [300, 250],
                    [120, 600],
                    [250, 600],
                    [160, 600],
                    [300, 600],
                    [300, 800]
                ],
                targeting: targetingHome
            },
            billboard_dsk: {
                slotName: `la_nacion_desktop/Home/billboard_dsk`,
                dimensions: [
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [920, 250],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja_producto1_dsk: {
                slotName: `la_nacion_desktop/Home/caja_producto1_dsk`,
                dimensions: [[240, 250]],
                targeting: targetingHome
            },
            caja_producto2_dsk: {
                slotName: `la_nacion_desktop/Home/caja_producto2_dsk`,
                dimensions: [[240, 250]],
                targeting: targetingHome
            },
            cinturon1_dsk: {
                slotName: `la_nacion_desktop/Home/cinturon1_dsk`,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 120],
                    [920, 170],
                    [920, 250],
                    [920, 300],
                    [1260, 300],
                    [970, 250]
                ],
                targeting: targetingHome
            },
            cinturon2_dsk: {
                slotName: `la_nacion_desktop/Home/cinturon2_dsk`,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 120],
                    [920, 170],
                    [920, 250],
                    [920, 300],
                    [1260, 300],
                    [970, 250]
                ],
                targeting: targetingHome
            },
            cinturon3_dsk: {
                slotName: `la_nacion_desktop/Home/cinturon3_dsk`,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [920, 250],
                    [970, 250],
                    [1260, 300]
                ],
                targeting: targetingHome
            },
            cinturon4_dsk: {
                slotName: `la_nacion_desktop/Home/cinturon4_dsk`,
                dimensions: [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [920, 250],
                    [970, 250],
                    [1260, 300]
                ],
                targeting: targetingHome
            },
            cajasuscriptores_dsk: {
                slotName: `la_nacion_desktop/Home/cajasuscriptores_dsk`,
                withoutHide: true,
                dimensions: [[920, 120]],
                targeting: targetingHome
            }
        },
        mobile: {
            logo_header_mob: {
                slotName: HEADER_ROUTE_MOBILE,
                dimensions: [[172, 19]]
            },
            quesale_mob: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingHome
            },
            sticky2_mob: {
                slotName: `la_nacion_mobile/Home/sticky2_mob`,
                dimensions: [
                    [300, 50],
                    [320, 50]
                ],
                targeting: targetingHome
            },
            adhesion_mob: {
                slotName: `la_nacion_mobile/Home/adhesion_mob`,
                dimensions: [[320, 50]],
                targeting: targetingHome,
                hideForSubscriptor: true,
                closeButton: true
            },
            caja1_mob: {
                slotName: `la_nacion_mobile/Home/caja1_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [360, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja2_mob: {
                slotName: `la_nacion_mobile/Home/caja2_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [360, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja3_mob: {
                slotName: `la_nacion_mobile/Home/caja3_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [300, 600],
                    [320, 100],
                    [320, 450],
                    [360, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja4_mob: {
                slotName: `la_nacion_mobile/Home/caja4_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [360, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja5_mob: {
                slotName: `la_nacion_mobile/Home/caja5_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja6_mob: {
                slotName: `la_nacion_mobile/Home/caja6_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja7_mob: {
                slotName: `la_nacion_mobile/Home/caja7_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja8_mob: {
                slotName: `la_nacion_mobile/Home/caja8_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            caja9_mob: {
                slotName: `la_nacion_mobile/Home/caja9_mob`,
                dimensions: [
                    [320, 50],
                    [300, 250],
                    [300, 450],
                    [320, 100],
                    [320, 450],
                    [1, 1]
                ],
                targeting: targetingHome
            },
            comercial_mob: {
                slotName: `la_nacion_mobile/Home/comercial_mob`,
                dimensions: [
                    [1, 1],
                    [320, 480]
                ],
                targeting: targetingHome,
                closeButton: true
            },
            '1x1_mob': {
                slotName: `la_nacion_mobile/Home/1x1_mob`,
                dimensions: [[1, 1]],
                targeting: targetingHome,
                hideForSubscriptor: true
            },
            cajasuscriptores_mob: {
                slotName: `la_nacion_mobile/Home/cajasuscriptores_mob`,
                withoutHide: true,
                dimensions: [[300, 250]],
                targeting: targetingHome
            }
        },
        tablet: {
            logo_header_tab: {
                slotName: HEADER_ROUTE_TAB,
                dimensions: [[305, 32]]
            },
            quesale_tab: {
                slotName: SLOT_BANNER_QUESALE,
                dimensions: [
                    [300, 250],
                    [300, 600],
                    [320, 480],
                    [300, 450]
                ],
                targeting: targetingHome
            },
            megatop_tab: {
                slotName: `la_nacion_tablet/Home/megatop_tab`,
                dimensions: [
                    [1270, 120],
                    [768, 120],
                    [728, 90]
                ],
                targeting: targetingHome
            },
            cabezal_tab: {
                slotName: `la_nacion_tablet/Home/cabezal_tab`,
                dimensions: [[728, 90]],
                targeting: targetingHome,
                withoutHide: true
            },
            middle1_tab: {
                slotName: `la_nacion_tablet/Home/middle1_tab`,
                dimensions: [[728, 90]],
                targeting: targetingHome,
                withoutHide: true
            },
            middle2_tab: {
                slotName: `la_nacion_tablet/Home/middle2_tab`,
                dimensions: [[728, 90]],
                targeting: targetingHome,
                withoutHide: true
            },
            adhesion_tab: {
                slotName: `la_nacion_tablet/Home/adhesion_tab`,
                dimensions: [[728, 90]],
                targeting: targetingHome,
                hideForSubscriptor: true,
                closeButton: true
            },
            caja1_tab: {
                slotName: `la_nacion_tablet/Home/caja1_tab`,
                dimensions: [
                    [300, 250],
                    [300, 600]
                ],
                targeting: targetingHome
            },
            caja2_tab: {
                slotName: `la_nacion_tablet/Home/caja2_tab`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            caja3_tab: {
                slotName: `la_nacion_tablet/Home/caja3_tab`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            caja4_tab: {
                slotName: `la_nacion_tablet/Home/caja4_tab`,
                dimensions: [[300, 250]],
                targeting: targetingHome
            },
            logo_tag_tab: {
                slotName: `la_nacion_tablet/Home/logo_tag_tab`,
                dimensions: [[40, 280]],
                targeting: targetingHome
            },
            cajasuscriptores_tab: {
                slotName: `la_nacion_tablet/Home/cajasuscriptores_tab`,
                withoutHide: true,
                dimensions: [[720, 110]],
                targeting: targetingHome
            }
        }
    },
    common: {
        desktop: {
            logo_header_dsk: {
                slotName: 'la_nacion_desktop/logo_header_dsk',
                dimensions: [[300, 30]]
            }
        },
        mobile: {
            logo_header_mob: {
                slotName: HEADER_ROUTE_MOBILE,
                dimensions: [[170, 17]]
            }
        },
        tablet: {
            logo_header_tab: {
                slotName: HEADER_ROUTE_TAB,
                dimensions: [[200, 20]]
            }
        }
    }
};
