import React from 'react';
import { cx } from '@ln/ds-cva';
import flatArray from '../../../../private/common/utils/flatArray';
import get from '../../../../private/common/utils/get';
import { bannerWrapperVariants, bannerPlaceholderVariants } from './styles';

function Banner({ bannerConfiguration }) {
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
        hideForSubscriptor,
        theme
    } = bannerConfiguration;

    const maxHeightDimension = Math.max(
        ...dimensions.map(([, height]) => height)
    );

    return (
        <div
            className={cx(bannerWrapperVariants({ slotId, theme }), '--no-app')}
            style={{ height: `${maxHeightDimension}px` }}
        >
            <div className={bannerPlaceholderVariants.wrapper({ theme })}>
                <span className={bannerPlaceholderVariants.text({ theme })}>
                    publicidad
                </span>
            </div>
            <div
                id={slotId}
                className="relative z-1 flex justify-center items-center w-full"
                style={{ height: `${maxHeightDimension}px` }}
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

export default Banner;
