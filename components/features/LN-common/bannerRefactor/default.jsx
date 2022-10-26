import React from 'react';
import Consumer from 'fusion:consumer';
import Placeholder from '../../../private/common/banners/placeholder';
import {
    getBannerConfiguration,
    isForAmp,
    shouldShowBanner
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';
import bannersRules from '../../../private/common/banners/bannersRules';
import get from '../../../private/common/utils/get';
import { bannerPropTypes } from '../../../private/common/utils/propTypesHelper';

const Banner = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const {
        sticky,
        desktop,
        mobile,
        tablet,
        solo_no_suscriptores: soloNoSuscriptores
    } = customFields;

    if (isForAmp(desktop || '', mobile || '', tablet || '')) return <></>;

    const bannersConfiguration = [
        { device: 'desktop', slotId: desktop },
        { device: 'mobile', slotId: mobile },
        { device: 'tablet', slotId: tablet }
    ]
        .map(bannerConfig => {
            return bannerConfig.slotId
                ? getBannerConfiguration(
                      globalContent,
                      customFields,
                      globalContentConfig,
                      bannerConfig
                  )
                : null;
        })
        .filter(item => item !== null);

    if (isAdmin) {
        return bannersConfiguration.map(bannerConfiguration => {
            return (
                <Placeholder
                    key={bannerConfiguration.slotName}
                    slotName={bannerConfiguration.slotName}
                    dimensions={bannerConfiguration.dimensions}
                    targeting={bannerConfiguration.targeting}
                />
            );
        });
    }

    return bannersConfiguration.map(bannerConfiguration => {
        return (
            !shouldShowBanner(soloNoSuscriptores, globalContent) && (
                <>
                    <DivBannerSSR
                        key={bannerConfiguration.slotName}
                        bannerConfiguration={bannerConfiguration}
                    />
                    {get(
                        bannersRules,
                        `[${bannerConfiguration.slotGroup}][${bannerConfiguration.device}][${bannerConfiguration.slotId}].customScript`
                    ) &&
                        bannersRules[bannerConfiguration.slotGroup][
                            bannerConfiguration.device
                        ][bannerConfiguration.slotId].customScript({
                            sticky
                        })}
                </>
            )
        );
    });
};

Banner.label = 'LN-Common-BannerRefactor';
// Banner.static = true;

Banner.propTypes = bannerPropTypes;

export default Consumer(Banner);
