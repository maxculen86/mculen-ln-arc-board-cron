import { defaultTargeting } from './defaults';

export default {
    caja1_dsk: {
        slotName: 'la_nacion_desktop/nota/caja1_dsk',
        dimensions: [[300, 600], [160, 600], [120, 600], [300, 250]],
        targeting: defaultTargeting,
        bidding: {
            prebid: {
                enabled: true,
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
    }
};
