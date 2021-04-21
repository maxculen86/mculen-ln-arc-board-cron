import { defaultTargeting } from './defaults';

const tab_300x250_sizes = [
    [300, 250],
    [300, 600]
];
const tab_728x90_sizes = [
    [728, 90],
    [300, 250]
];
const tab_middle_sizes = [
    [728, 90],
    [640, 480],
    [468, 60],
    [1, 1]
];

export default {
    unoxuno_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/1x1_tab',
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    cabezal_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/cabezal_tab',
        dimensions: [[728, 90]],
        targeting: defaultTargeting,
        withoutHide: true,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: tab_728x90_sizes
                    }
                },
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
    adhesion_tab: {
        // TODO: este tiene cierta logica para cerrarse, ver donde meterlo
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/adhesion_tab',
        dimensions: [[728, 90]],
        targeting: defaultTargeting
    },
    caja1_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/caja1_tab',
        dimensions: [
            [300, 250],
            [300, 600]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: tab_300x250_sizes
                    }
                },
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
    caja2_tab: {
        device: 'tab',
        caja2_tab: 'la_nacion_tablet/Nota/caja2_tab',
        dimensions: [
            [300, 250],
            [300, 600]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: tab_300x250_sizes
                    }
                },
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
    caja3_tab: {
        device: 'tab',
        caja2_tab: 'la_nacion_tablet/Nota/caja3_tab',
        dimensions: [
            [300, 250],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: tab_300x250_sizes
                    }
                },
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
    inread_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/inread_tab',
        dimensions: [
            [1, 1],
            [728, 90]
        ],
        targeting: defaultTargeting
    },
    middle_1_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/middle_1_tab',
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
                        sizes: tab_middle_sizes
                    }
                },
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
    middle_2_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/middle_2_tab',
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
                        sizes: tab_middle_sizes
                    }
                },
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
    middle_teads_tab: {
        device: 'tab',
        slotName: 'la_nacion_tablet/Nota/middle_teads_tab',
        dimensions: [[1, 1]],
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
    }
};
