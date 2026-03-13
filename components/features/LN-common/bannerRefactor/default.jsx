import React from 'react';
import Consumer from 'fusion:consumer';
import Placeholder from '../../../private/common/banners/placeholder';
import {
    getBannerConfiguration,
    shouldHideBannerForSubscriberOnlyContent
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';
import bannersRules from '../../../private/common/banners/bannersRules';
import get from '../../../private/common/utils/get';
import { bannerPropTypes } from '../../../private/common/utils/propTypesHelper';

// TODO(desarrollo): si LN/DS-Banner funciona correctamente,
// alinear este feature con el mismo refactor (reutilizar helpers + simplificacion de render).
function Banner(props) {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const {
        sticky,
        desktop,
        mobile,
        tablet,
        solo_no_suscriptores: soloNoSuscriptores
    } = customFields;

    const bannersConfiguration = [
        { device: 'desktop', slotId: desktop },
        { device: 'mobile', slotId: mobile },
        { device: 'tablet', slotId: tablet }
    ]
        .map(bannerConfig =>
            bannerConfig.slotId
                ? getBannerConfiguration(
                      globalContent,
                      customFields,
                      globalContentConfig,
                      bannerConfig
                  )
                : null
        )
        .filter(item => item !== null);

    if (isAdmin) {
        return (
            <>
                {bannersConfiguration.map(bannerConfiguration => (
                    <Placeholder
                        key={bannerConfiguration.slotName}
                        slotName={bannerConfiguration.slotName}
                        dimensions={bannerConfiguration.dimensions}
                        targeting={bannerConfiguration.targeting}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {bannersConfiguration.map(bannerConfiguration =>
                !shouldHideBannerForSubscriberOnlyContent(
                    soloNoSuscriptores,
                    globalContent
                ) ? (
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
                ) : null
            )}
        </>
    );
}

Banner.label = 'LN-Common-BannerRefactor';
Banner.propTypes = bannerPropTypes;

export default Consumer(Banner);
