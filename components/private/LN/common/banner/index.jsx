import React from 'react';
import PropTypes from 'fusion:prop-types';
import BannerComponent from './component';
import WithScreenUtils from '../../../common/hocs/withScreenUtils';
import { slotsConfig, getSlotsOptions } from './config';
import PlaceHolder from './bannerPlaceholder';
import WithNavigation from '../hocs/WithNavigation';

const banner = props => {
    const {
        taxonomy,
        outputType,
        siteProperties: {
            bannerConfig: { dfp_id }
        },
        isAdmin,
        slotGroup,
        selectedSlots: { desktopSlot, mobileSlot, tabletSlot },
        sticky,
        background,
        screenUtils,
        extraClasses,
        banners,
        bannerTercera
    } = props;

    if (!desktopSlot && !mobileSlot && !tabletSlot) return null;

    const getSlotForDevice = () => {
        if (screenUtils.device === 'tablet') return tabletSlot;
        if (screenUtils.device === 'desktop') return desktopSlot;
        if (screenUtils.device === 'mobile') return mobileSlot;

        return null;
    };

    const finalSlot = getSlotForDevice();
    const finalConfig = slotsConfig[slotGroup][finalSlot];

    if (!finalConfig) return null;
    if (!dfp_id) {
        if (!isAdmin) {
            return null;
        }
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
        <>
            {/* {banners ? ( */}
            <BannerComponent
                device={screenUtils.device}
                slotId={finalSlot}
                dfpId={dfp_id}
                slotName={finalConfig.slotName}
                dimensions={finalConfig.dimensions}
                targeting={finalConfig.targeting}
                bidding={finalConfig.bidding}
                sticky={sticky}
                background={background}
                extraClasses={extraClasses}
                outputType={outputType}
                taxonomy={taxonomy}
                bannerTercera={bannerTercera}
            />
            {/* ) : null} */}
        </>
    );
};

banner.propTypes = {
    outputType: PropTypes.string,
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    slotGroup: PropTypes.oneOf(['nota', 'home', 'acumulado', 'amp']).isRequired,
    selectedSlots: PropTypes.shape({
        desktopSlot: PropTypes.oneOf(getSlotsOptions()),
        mobileSlot: PropTypes.oneOf(getSlotsOptions()),
        tabletSlot: PropTypes.oneOf(getSlotsOptions())
    }).isRequired,
    sticky: PropTypes.bool,
    bannerTercera: PropTypes.bool,
    background: PropTypes.bool,
    screenUtils: PropTypes.shape({
        device: PropTypes.string
    }).isRequired
};

export default WithNavigation(WithScreenUtils(banner));
