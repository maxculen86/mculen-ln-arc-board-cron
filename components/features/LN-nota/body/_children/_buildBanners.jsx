import React from 'react';
import StaticValidation from '../../../../private/common/staticValidation';
import {
    getBannerConfiguration,
    suffixDevice
} from '../../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../../private/common/banners/DivBannerSSR';
import DivBannerAMP from '../../../../private/common/banners/DivBannerAMP';
import { supportedTypes } from '../_utils/_bodyRules';

// eslint-disable-next-line import/prefer-default-export
export const buildBanners = ({
    banners = [],
    globalContent = {},
    counterElement,
    contentElements,
    // counter,
    outputType
}) => {
    const elementsCount = getElementsCount({ contentElements });

    return (
        banners.some(banner => banner.position === counterElement) &&
        banners
            .filter(banner => banner.position === counterElement)
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

                if (
                    !bannerConfiguration ||
                    (outputType === 'amp' && !slotId.includes('_amp'))
                )
                    return <></>;

                return (
                    elementsCount > counterElement && (
                        <StaticValidation id={slotId} htmlOnly persistent>
                            {outputType === 'amp' && slotId.includes('_amp') ? (
                                <DivBannerAMP
                                    bannerConfiguration={bannerConfiguration}
                                />
                            ) : (
                                <DivBannerSSR
                                    bannerConfiguration={bannerConfiguration}
                                />
                            )}
                        </StaticValidation>
                    )
                );
            })
    );
};

const setSlotId = value => value.desktop || value.mobile || value.tablet || '';

export const getElementsCount = ({ contentElements }) => {
    return contentElements.filter(el => supportedTypes.includes(el.type))
        .length;
};
