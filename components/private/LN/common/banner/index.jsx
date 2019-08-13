import React from 'react';
import ArcAd from '@arc-core-components/feature_ads-arc-ad';
import adConfig from './config';

const banner = props => {
    const {
        siteProperties: {
            bannerConfig: { dfp_id }
        },
        isAdmin,
        customFields: { slotId }
    } = props;

    if (!slotId) return null;

    const config = adConfig[slotId];

    return (
        <ArcAd
            id={slotId}
            dfpId={dfp_id}
            slotName={config.slotName}
            dimensions={config.dimensions}
            targeting={config.targeting}
            bidding={config.bidding}
        />
    );
};

export default banner;
