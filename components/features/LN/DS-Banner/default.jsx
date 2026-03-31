import React from 'react';
import Consumer from 'fusion:consumer';
import { shouldHideBannerForSubscriberOnlyContent } from '../../../private/LN/common/utils/bannerHelper';
import { bannerPropTypes } from '../../../private/common/utils/propTypesHelper';
import Banner from '../../ui/ln/banner/default';
import BannerPBPlaceholder from './components/BannerPBPlaceholder';
import {
    buildBannersConfiguration,
    getBannerCustomScript
} from './helpers/helpers';

function DsBanner({
    isAdmin,
    customFields = {},
    globalContent,
    globalContentConfig
}) {
    const {
        sticky,
        desktop,
        mobile,
        tablet,
        solo_no_suscriptores: soloNoSuscriptores
    } = customFields;

    const bannersConfiguration = buildBannersConfiguration({
        desktop,
        mobile,
        tablet,
        globalContent,
        customFields,
        globalContentConfig
    });

    if (isAdmin) {
        return (
            <>
                {bannersConfiguration.map(bannerConfiguration => (
                    <BannerPBPlaceholder
                        key={bannerConfiguration.slotName}
                        slotName={bannerConfiguration.slotName}
                        dimensions={bannerConfiguration.dimensions}
                        targeting={bannerConfiguration.targeting}
                    />
                ))}
            </>
        );
    }

    if (
        shouldHideBannerForSubscriberOnlyContent(
            soloNoSuscriptores,
            globalContent
        )
    )
        return null;

    return (
        <>
            {bannersConfiguration.map(bannerConfiguration => {
                const bannerCustomScript = getBannerCustomScript({
                    bannerConfiguration,
                    sticky
                });

                return (
                    <React.Fragment key={bannerConfiguration.slotName}>
                        <Banner bannerConfiguration={bannerConfiguration} />
                        {bannerCustomScript}
                    </React.Fragment>
                );
            })}
        </>
    );
}

DsBanner.label = 'LN-DS-Banner';
DsBanner.propTypes = bannerPropTypes;

export default Consumer(DsBanner);
