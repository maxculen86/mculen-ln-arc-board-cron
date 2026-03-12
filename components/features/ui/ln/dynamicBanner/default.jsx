import React from 'react';
import { cx } from '@ln/ds-cva';
import flatArray from '../../../../private/common/utils/flatArray';
import get from '../../../../private/common/utils/get';
import { WrapperBody } from '../../../LN/common/wrapperBody/default';

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

    const wrapperBodyClassName = cx('w-auto', {
        'h-600 flex md:hidden': device === 'mobile',
        'h-300 hidden xl:flex': device === 'desktop'
    });
    const bannerWrapperClassName = cx(
        'relative z-1 flex justify-center items-center left-1/2 right-1/2 w-screen -translate-x-1/2',
        {
            'h-600': device === 'mobile',
            'h-300': device === 'desktop'
        }
    );

    return (
        <WrapperBody variant="banner" className={wrapperBodyClassName}>
            <div className="ds-banner-background relative">
                <div className="absolute z-0 top-0 left-1/2 -translate-x-1/2 z-1 py-6 px-8 bg-[#fefefe] rounded-16">
                    <span className="font-secondary font-normal uppercase text-12 text-center leading-[130%]">
                        publicidad
                    </span>
                </div>
                <div
                    id={slotId}
                    className={bannerWrapperClassName}
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
        </WrapperBody>
    );
}

export default DynamicBanner;
