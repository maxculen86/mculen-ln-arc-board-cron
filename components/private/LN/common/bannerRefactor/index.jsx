import React from 'react';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import WithNavigation from '../hocs/WithNavigation';
import { slotsConfig } from './config';
import Placeholder from './placeholder';

import BannerManager from './manager/banner';

const index = props => {
    const {
        siteProperties: {
            bannerConfig: { dfp_id: dfpID }
        },
        isAdmin,
        banner,
        screenUtils,
        extraClasses
    } = props;

    const {
        slotGroup,
        selectedSlots: { desktopSlot, mobileSlot, tabletSlot }
    } = banner;

    if (!desktopSlot && !mobileSlot && !tabletSlot) return null;

    const bannerSlots = [
        { name: 'tablet', slot: tabletSlot },
        { name: 'desktop', slot: desktopSlot },
        { name: 'mobile', slot: mobileSlot }
    ];

    const getSlotForDevice = screen => slots =>
        slots.find(slot => slot.name === screen.device)
            ? slots.find(slot => slot.name === screen.device).slot || null
            : null;

    const finalSlot = getSlotForDevice(screenUtils)(bannerSlots);

    if (finalSlot === null || finalSlot === 'NINGUNO') return null;

    const finalConfig = slotsConfig[slotGroup][finalSlot];

    const config = {
        ...banner,
        slotId: finalSlot,
        slotName: finalConfig.slotName,
        dfpId: dfpID,
        dimensions: finalConfig.dimensions,
        targeting: finalConfig.targeting,
        sizemap: finalConfig.sizemap,
        bidding: finalConfig.bidding,
        device: screenUtils.device,
        extraClasses
    };

    if (!finalConfig) return null;

    if (!dfpID) {
        if (!isAdmin) {
            return null;
        }

        return <Placeholder missDfpId />;
    }

    if (isAdmin) {
        return (
            <Placeholder
                slotName={finalConfig.slotName}
                dimensions={finalConfig.dimensions}
                targeting={finalConfig.targeting}
            />
        );
    }

    return <BannerManager config={config} />;
};

export default WithNavigation(WithScreenUtils(index));
