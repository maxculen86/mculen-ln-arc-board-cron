/* eslint-disable react/require-default-props */
import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import WithNavigation from '../hocs/WithNavigation';
import { slotsConfig } from './config';
import Placeholder from './placeholder';

import BannerManager from './manager/banner';

const getDimsFromSiteService = config => slotGroup => finalSlot => {
    if (!config || !slotGroup) return null;
    const position = config[`${slotGroup}_${finalSlot}`];
    if (!position) return null;
    const dimensions = position.split(',');
    return dimensions.map(dimension =>
        dimension.split('x').map(size => parseInt(size, 10))
    );
};

const index = props => {
    const dimensions = useRef(null);
    const {
        siteProperties: {
            bannerConfig: { dfp_id: dfpID }
        },
        isAdmin,
        banner,
        screenUtils,
        extraClasses,
        arcSite: website
    } = props;

    const {
        slotGroup,
        selectedSlots: { desktopSlot, mobileSlot, tabletSlot },
        show
    } = banner;

    //console.log("########## SHOW DE BANNERS: ", show);

    if (!desktopSlot && !mobileSlot && !tabletSlot) return null;

    const content = useContent({
        source: 'navigationTreeSource',
        query: {
            website
        }
    });

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

    if (finalSlot === 'NINGUNO') return null;

    if (!slotGroup || finalSlot === null) return null;

    if (content) {
        const { bannerConfig } = content;
        dimensions.current = getDimsFromSiteService(bannerConfig)(slotGroup)(
            finalSlot
        );
    }

    const finalConfig = slotsConfig[slotGroup][finalSlot];

    const config = {
        ...banner,
        slotId: finalSlot,
        slotName: finalConfig.slotName,
        dfpId: dfpID,
        dimensions: dimensions.current || finalConfig.dimensions,
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

index.propTypes = {
    arcSite: PropTypes.string,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.string.isRequired,
    banner: PropTypes.shape({
        slotGroup: PropTypes.string.isRequired,
        selectedSlots: PropTypes.shape({
            desktopSlot: PropTypes.string,
            mobileSlot: PropTypes.string,
            tabletSlot: PropTypes.string
        }).isRequired,
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        show: PropTypes.shape({
            termicas: PropTypes.bool,
            collection: PropTypes.bool
        })
    })
};

export default WithNavigation(WithScreenUtils(index));
