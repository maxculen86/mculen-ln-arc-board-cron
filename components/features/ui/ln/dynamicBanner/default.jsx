import React from 'react';
import flatArray from '../../../../private/common/utils/flatArray';
import get from '../../../../private/common/utils/get';

/**
 * @typedef {Object} BannerConfiguration
 * @property {string} slotId
 * @property {string} slotGroup
 * @property {string} device
 * @property {number} [dfpId]
 * @property {string} [slotName]
 * @property {Object} [targeting]
 * @property {Array<Array<number>>} [dimensions]
 * @property {Object} [bidding]
 * @property {boolean} [withoutHide]
 * @property {boolean} [hideForSubscriptor]
 */

/**
 * Componente presentacional puro para banners dinámicos.
 * Mantiene el contrato de data esperado por el sistema de carga de banners.
 *
 * @param {Object} props
 * @param {BannerConfiguration} props.bannerConfiguration
 * @returns {React.ReactElement}
 */
function DynamicBanner({ bannerConfiguration }) {
    const {
        slotId,
        slotGroup,
        device,
        dfpId,
        slotName,
        targeting,
        withoutHide,
        dimensions,
        bidding,
        hideForSubscriptor
    } = bannerConfiguration;

    // TODO Front: Agregar clases, este extracto fue de DivBannerSSR (sin usar mod-banner.css)
    return (
        <div className="">
            <div
                id={slotId}
                className=""
                data-slot-group={slotGroup}
                data-device={device}
                data-subscription={hideForSubscriptor || false}
                data-ad-unit-path={dfpId ? `/${dfpId}/${slotName}` : null}
                data-targeting={JSON.stringify(targeting)}
                data-without-hide={withoutHide || false}
                data-size={JSON.stringify(flatArray(dimensions))}
                data-sizemap={JSON.stringify([])}
                data-prebid-enabled={get(bidding, 'prebid.enabled', false)}
            />
        </div>
    );
}

export default DynamicBanner;
