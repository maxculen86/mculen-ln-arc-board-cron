import { defaultTargeting } from './defaults';

const dsk_1260x170_sizes = [[[1260, 170]], [[1180, 170]], [[920, 170]], [1, 1]];
const dsk_728x90_sizes = [
    [468, 60],
    [640, 480],
    [728, 90],
    [1, 1]
];
const dsk_300x600_sizes = [
    [300, 600],
    [300, 250]
];
const dsk_300x250_sizes = [[300, 250]];

export default {
    adhesion_dsk: {
        slotName: 'la_nacion_desktop/Nota/adhesion_dsk',
        dimensions: [
            [728, 90],
            [920, 100]
        ],
        targeting: defaultTargeting
    },
    megatop_dsk: {
        slotName: 'la_nacion_desktop/Nota/megatop_dsk',
        dimensions: [[800, 600]],
        targeting: defaultTargeting
    },
    unoxuno_dsk: {
        slotName: 'la_nacion_desktop/Nota/1x1_dsk',
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_dsk: {
        slotName: 'la_nacion_desktop/Nota/cabezal_dsk',
        dimensions: [
            [1, 1],
            [728, 90],
            [920, 100],
            [920, 170],
            [970, 90],
            [1260, 100],
            [1260, 170]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_1260x170_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806482
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183632
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848793'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 76674
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    caja1_dsk: {
        slotName: 'la_nacion_desktop/Nota/caja1_dsk',
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                code: '/133919216/la_nacion_desktop/Nota/caja1_dsk',
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_300x600_sizes
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806483
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183630
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848795'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43853
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    caja2_dsk: {
        slotName: 'la_nacion_desktop/Nota/caja2_dsk',
        dimensions: [[300, 250]],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                code: '/133919216/la_nacion_desktop/Nota/caja1_dsk',
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_300x250_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806484
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183626
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848796'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43943
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    caja3_dsk: {
        slotName: 'la_nacion_desktop/Nota/caja3_dsk',
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                code: '/133919216/la_nacion_desktop/Nota/caja1_dsk',
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_300x600_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806485
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183612
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848803'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43944
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    caja4_dsk: {
        slotName: 'la_nacion_desktop/Nota/caja4_dsk',
        dimensions: [
            [300, 600],
            [300, 250]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                code: '/133919216/la_nacion_desktop/Nota/caja1_dsk',
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_300x600_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806486
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183610
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848804'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43945
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    caja5_dsk: {
        slotName: 'la_nacion_desktop/Nota/caja5_dsk',
        dimensions: [[300, 250]],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                code: '/133919216/la_nacion_desktop/Nota/caja1_dsk',
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_300x250_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 15869758
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            rp_account: 20148,
                            rp_site: 239760,
                            rp_zonesize: 1279366
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            placementId: '13144370'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            placementId: 13144370
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    inread_dsk: {
        slotName: 'la_nacion_desktop/Nota/inread_dsk',
        dimensions: [
            [1, 1],
            [728, 90]
        ],
        targeting: defaultTargeting
    },
    middle_1_dsk: {
        slotName: 'la_nacion_desktop/Nota/middle_1_dsk',
        dimensions: [
            [1, 1],
            [640, 360],
            [640, 480],
            [728, 90],
            [468, 60]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_728x90_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806487
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183608
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848805'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43974
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    middle_2_dsk: {
        slotName: 'la_nacion_desktop/Nota/middle_2_dsk',
        dimensions: [
            [468, 60],
            [640, 480],
            [728, 90],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_728x90_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806488
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183606
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848806'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 43975
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    middle_3_dsk: {
        slotName: 'la_nacion_desktop/Nota/middle_3_dsk',
        dimensions: [
            [728, 90],
            [640, 480],
            [468, 60],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: dsk_728x90_sizes
                    }
                },
                useSlotForAdUnit: true,
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806489
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239760,
                            zoneId: 1183604
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848807'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 76668
                        }
                    },
                    {
                        bidder: 'eplanning',
                        params: { ci: '23e90' }
                    }
                ]
            }
        }
    },
    middle_teads_dsk: {
        slotName: 'la_nacion_desktop/Nota/middle_teads_dsk',
        dimensions: [
            [1, 1],
            [728, 90]
        ],
        targeting: defaultTargeting
    },
    caja1_amp: {
        slotName: '/133919216/AMP/ROS/caja1_amp',
        dimensions: {
            width: 300,
            height: 250
        }
    },
    caja2_amp: {
        slotName: '/133919216/AMP/ROS/caja2_amp',
        dimensions: {
            width: 300,
            height: 250
        }
    },
    caja3_amp: {
        slotName: '/133919216/AMP/ROS/caja3_amp',
        dimensions: {
            width: 320,
            height: 50
        }
    },
    comercial_dsk: {
        slotName: 'la_nacion_desktop/Nota/comercial_dsk',
        dimensions: [[800, 600]],
        targeting: defaultTargeting
    }
};
