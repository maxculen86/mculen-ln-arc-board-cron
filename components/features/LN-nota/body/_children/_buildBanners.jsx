import React from 'react';
import StaticValidation from '../../../../private/common/staticValidation';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../../private/common/banners/DivBannerSSR';
import DivBannerAMP from '../../../../private/common/banners/DivBannerAMP';
import { supportedTypes } from '../_utils/_bodyRules';

export const BuildBanners = ({
    banners = [],
    globalContent = {},
    elementPosition,
    contentElements,
    // counter,
    outputType
}) => {
    const elementsCount = getElementsCount({ contentElements });

    return (
        banners.some(banner => banner.position === elementPosition) &&
        banners
            .filter(banner => banner.position === elementPosition)
            .map(value => {
                const slotId = setSlotId(value);

                const bannerConfiguration = getBannerConfiguration(
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

                return isAmpWithoutSlotIdAmpValidator({
                    bannerConfiguration,
                    outputType,
                    slotId
                }) ? (
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
            })
    );
};

export default BuildBanners;

const isAmpWithoutSlotIdAmpValidator = ({
    bannerConfiguration,
    outputType,
    slotId
}) =>
    !bannerConfiguration || (outputType === 'amp' && !slotId.includes('_amp'));

const DivBannerRender = ({
    elementsCount,
    elementPosition,
    slotId,
    outputType,
    bannerConfiguration
}) => {
    return (
        elementsCount > elementPosition && (
            <StaticValidation id={slotId} htmlOnly persistent>
                {outputType === 'amp' && slotId.includes('_amp') ? (
                    <DivBannerAMP bannerConfiguration={bannerConfiguration} />
                ) : (
                    <DivBannerSSR bannerConfiguration={bannerConfiguration} />
                )}
            </StaticValidation>
        )
    );
};

const setSlotId = value => value.desktop || value.mobile || value.tablet || '';

export const getElementsCount = ({ contentElements }) => {
    return contentElements.filter(el => supportedTypes.includes(el.type))
        .length;
};
