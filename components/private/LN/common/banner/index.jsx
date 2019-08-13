import React from 'react';
import ArcAd from '@arc-core-components/feature_ads-arc-ad';
import PropTypes from 'fusion:prop-types';
import { slotsConfig, getSlotsOptions } from './config';
import PlaceHolder from './bannerPlaceholder';
import { getDevice } from '../../../common/utils/screenUtils';

const banner = props => {
    const {
        siteProperties: {
            bannerConfig: { dfp_id }
        },
        isAdmin,
        slotGroup,
        selectedSlots: { desktopSlot, mobileSlot, tabletSlot }
    } = props;

    if (!desktopSlot && !mobileSlot && !tabletSlot) return null;

    const getSlotForDevice = () => {
        const device = getDevice();
        if (device === 'tablet') return tabletSlot;
        if (device === 'desktop') return desktopSlot;
        if (device === 'mobile') return mobileSlot;

        return null;
    };

    const finalSlot = getSlotForDevice();
    const finalConfig = slotsConfig[slotGroup][finalSlot];

    if (!finalConfig) return null;

    if (!dfp_id) {
        if (!isAdmin) return null;
        return <PlaceHolder missDfpId />;
    }

    // TODO: agregar que muestre datos de las 3 posibilidades
    if (isAdmin) {
        return (
            <PlaceHolder
                slotName={finalConfig.slotName}
                dimensions={finalConfig.dimensions}
                targeting={finalConfig.targeting}
            />
        );
    }

    return (
        <ArcAd
            id={finalSlot}
            dfpId={dfp_id}
            slotName={finalConfig.slotName}
            dimensions={finalConfig.dimensions}
            targeting={finalConfig.targeting}
            bidding={finalConfig.bidding}
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
    slotGroup: PropTypes.oneOf(['nota', 'home', 'acu']).isRequired,
    selectedSlots: PropTypes.shape({
        desktopSlot: PropTypes.oneOf(getSlotsOptions()),
        mobileSlot: PropTypes.oneOf(getSlotsOptions()),
        tabletSlot: PropTypes.oneOf(getSlotsOptions())
    }).isRequired
};

export default banner;
