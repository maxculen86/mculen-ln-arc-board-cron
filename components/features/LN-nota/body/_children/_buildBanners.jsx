import React from 'react';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../../private/common/banners/DivBannerSSR';
import { supportedTypes } from '../_utils/_bodyRules';

export const BuildBanners = ({
    banners = [],
    globalContent = {},
    elementPosition,
    contentElements,
    outputType
}) => {
    const elementsCount = getElementsCount({ contentElements });

    return (
        banners.some(banner => banner.position === elementPosition) &&
        banners
            .filter(banner => banner.position === elementPosition)
            .map(({ desktop = '', mobile = '', tablet = '' } = {}) => {
                return [desktop, mobile, tablet].map(slotId => {
                    const bannerConfiguration =
                        slotId &&
                        getBannerConfiguration(
                            globalContent,
                            { group: 'nota' },
                            {},
                            {
                                device: Object.keys(suffixDevice).find(key =>
                                    slotId.includes(suffixDevice[key])
                                ),
                                slotId
                            }
                        );

                    return !bannerConfiguration ? (
                        <></>
                    ) : (
                        DivBannerRender({
                            elementsCount,
                            elementPosition,
                            slotId,
                            outputType,
                            bannerConfiguration
                        })
                    );
                });
            })
    );
};

export default BuildBanners;

const DivBannerRender = ({
    elementsCount,
    elementPosition,
    bannerConfiguration
}) => {
    return (
        elementsCount > elementPosition && (
            <>
                <DivBannerSSR bannerConfiguration={bannerConfiguration} />
            </>
        )
    );
};

export const getElementsCount = ({ contentElements }) => {
    return contentElements.filter(el => supportedTypes.includes(el.type))
        .length;
};
