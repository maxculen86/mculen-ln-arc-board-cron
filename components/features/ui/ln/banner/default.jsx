import React from 'react';
import { cx } from '@ln/ds-cva';
import flatArray from '../../../../private/common/utils/flatArray';
import get from '../../../../private/common/utils/get';
import { WrapperBody } from '../../../LN/common/wrapperBody/default';
import {
    getBannerClasses,
    isBannerBreakout,
    getBreakoutWrapperClasses
} from './helpers';

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
        hideForSubscriptor
    } = bannerConfiguration;

    const maxHeightDimension = Math.max(
        ...dimensions.map(([, height]) => height)
    );
    const classes = getBannerClasses(slotId);
    const isBreakout = isBannerBreakout(slotId);
    const breakoutWrapperClasses = getBreakoutWrapperClasses(slotId);

    const adContainerContent = (
        <div
            className={cx(
                'ds-banner-background relative w-full',
                classes.bannerClass
            )}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-1 py-6 px-8 bg-[#fefefe] rounded-16">
                <span className="font-secondary font-normal uppercase text-12 text-center leading-[130%]">
                    publicidad
                </span>
            </div>
            <div
                id={slotId}
                className={cx(
                    'relative z-1 flex justify-center items-center w-full',
                    classes.bannerClass
                )}
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

    if (isBreakout) {
        return (
            <div
                className={cx(
                    'ds-banner w-screen left-1/2 -translate-x-1/2',
                    classes.wrapperClass,
                    breakoutWrapperClasses
                )}
                style={{ height: `${maxHeightDimension}px` }}
            >
                {adContainerContent}
            </div>
        );
    }

    return (
        <WrapperBody
            variant="banner"
            className={cx('w-screen', classes.wrapperClass)}
            style={{ height: `${maxHeightDimension}px` }}
        >
            {adContainerContent}
        </WrapperBody>
    );
}

export default Banner;
