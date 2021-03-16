import { defaultTargeting } from './defaults';

const mob_320x100_sizes = [[320, 100]];

const mob_320x50_sizes = [[320, 50]];

const mob_300x450_sizes = [
    [300, 450],
    [300, 250],
    [300, 100],
    [1, 1]
];

const caja2_mob_sizes = [
    [300, 250],
    [300, 450],
    [320, 50],
    [320, 100],
    [1, 1]
];

export default {
    adhesion_mob: {
        slotName: 'la_nacion_mobile/Nota/adhesion_mob',
        dimensions: [[320, 50]],
        targeting: defaultTargeting
    },
    megatop_mob: {
        slotName: 'la_nacion_mobile/Nota/megatop_mob',
        dimensions: [[320, 480]],
        targeting: defaultTargeting
    },
    unoxuno_mob: {
        slotName: 'la_nacion_mobile/Nota/1x1_mob',
        dimensions: [[1, 1]],
        targeting: defaultTargeting
    },
    sticky1_mob: {
        slotName: 'la_nacion_mobile/Nota/sticky1_mob',
        dimensions: [[320, 100]],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: mob_320x100_sizes
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806568
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184260
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848912'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 76694
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
    sticky2_mob: {
        slotName: 'la_nacion_mobile/Nota/sticky2_mob',
        dimensions: [[320, 50]],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: mob_320x50_sizes
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806569
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184262
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848913'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 76695
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
    caja1_mob: {
        slotName: 'la_nacion_mobile/Nota/caja1_mob',
        dimensions: [
            [300, 250],
            [300, 450],
            [320, 100],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: mob_300x450_sizes
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806570
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184264
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848914'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 48483
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
    caja2_mob: {
        slotName: 'la_nacion_mobile/Nota/caja2_mob',
        dimensions: [
            [1, 1],
            [300, 250],
            [300, 450],
            [320, 50],
            [320, 100],
            [320, 180],
            [360, 270]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: caja2_mob_sizes
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806571
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184266
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848915'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 48484
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
    caja3_mob: {
        slotName: 'la_nacion_mobile/Nota/caja3_mob',
        dimensions: [
            [300, 250],
            [320, 100],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: [
                            [300, 250],
                            [320, 100],
                            [1, 1]
                        ]
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806572
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184268
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848916'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 48485
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
    caja4_mob: {
        slotName: 'la_nacion_mobile/Nota/caja4_mob',
        dimensions: [
            [300, 250],
            [320, 100],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: [
                            [300, 250],
                            [320, 100],
                            [1, 1]
                        ]
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 14806574
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            accountId: 20148,
                            siteId: 239772,
                            zoneId: 1184270
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '1848917'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066731,
                            formatId: 76685
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
    caja5_mob: {
        slotName: 'la_nacion_mobile/Nota/caja5_mob',
        dimensions: [
            [300, 250],
            [320, 100],
            [1, 1]
        ],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
                mediaTypes: {
                    banner: {
                        sizes: [
                            [300, 250],
                            [320, 100],
                            [1, 1]
                        ]
                    }
                },
                bids: [
                    {
                        bidder: 'appnexus',
                        params: {
                            placementId: 15955885
                        }
                    },
                    {
                        bidder: 'rubicon',
                        params: {
                            rp_account: 20148,
                            rp_site: 239772,
                            rp_zonesize: 1285480 - 15
                        }
                    },
                    {
                        bidder: 'pubmatic',
                        params: {
                            publisherId: '157821',
                            adSlot: '2090097'
                        }
                    },
                    {
                        bidder: 'smart',
                        params: {
                            domain: 'https://prg.smartadserver.com',
                            siteId: 278509,
                            pageId: 1066720,
                            formatId: 76686
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
    inread_mob: {
        slotName: 'la_nacion_mobile/Nota/inread_mob',
        dimensions: [
            [1, 1],
            [320, 50],
            [300, 250]
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
    }
};
