import React from 'react';
import ArcAd from '@arc-core-components/feature_ads-arc-ad';
import PropTypes from 'fusion:prop-types';
import { slots } from './config';
import PlaceHolder from './bannerPlaceholder';

const banner = props => {
    console.log('--------------------', props);
    const {
        siteProperties: {
            bannerConfig: { dfp_id }
        },
        isAdmin,
        slotId
    } = props;

    if (!slotId) return null;

    const config = slots[slotId];

    if (!dfp_id) {
        if (!isAdmin) return null;
        return <PlaceHolder missDfpId />;
    }
    if (isAdmin) {
        return (
            <PlaceHolder
                slotName={config.slotName}
                dimensions={config.dimensions}
                targeting={config.targeting}
            />
        );
    }

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

banner.propTypes = {
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    slotId: PropTypes.string.isRequired
};

export default banner;
