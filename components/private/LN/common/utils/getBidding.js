const getBidding = (slotId, sizes, placementId, zoneId, adSlot, formatId) => {
    return {
        prebid: {
            code: `/133919216/la_nacion_desktop/Nota/${slotId}`,
            enabled: true,
            mediaTypes: {
                banner: {
                    sizes
                }
            },
            useSlotForAdUnit: true,
            bids: [
                {
                    bidder: 'appnexus',
                    params: {
                        placementId
                    }
                },
                {
                    bidder: 'rubicon',
                    params: {
                        accountId: 20148,
                        siteId: 239760,
                        zoneId
                    }
                },
                {
                    bidder: 'pubmatic',
                    params: {
                        publisherId: '157821',
                        adSlot
                    }
                },
                {
                    bidder: 'smart',
                    params: {
                        domain: 'https://prg.smartadserver.com',
                        siteId: 278509,
                        pageId: 1066720,
                        formatId
                    }
                },
                {
                    bidder: 'eplanning',
                    params: { ci: '23e90' }
                }
            ]
        }
    };
};

export default getBidding;
