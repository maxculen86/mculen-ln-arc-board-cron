/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import Placeholder from '../../../private/common/banners/placeholder';
import {
    getBannerConfiguration,
    shouldShowBanner,
    isForAmp
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerAMP from '../../../private/common/banners/DivBannerAMP';
import { bannerPropTypes } from '../../../private/common/utils/propTypesHelper';

const Banner = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const {
        desktop,
        mobile,
        tablet,
        solo_no_suscriptores: soloNoSuscriptores
    } = customFields;

    if (!isForAmp(desktop || '', mobile || '', tablet || '')) return <></>;

    const bannerConfiguration = getBannerConfiguration(
        globalContent,
        customFields,
        globalContentConfig,
        { slotId: desktop || mobile || tablet || '', device: '' }
    );

    if (!bannerConfiguration) return <></>;

    if (isAdmin && bannerConfiguration) {
        return (
            <Placeholder
                slotName={bannerConfiguration.slotName}
                dimensions={bannerConfiguration.dimensions}
                targeting={bannerConfiguration.targeting}
            />
        );
    }

    return (
        !shouldShowBanner(soloNoSuscriptores, globalContent) && (
            <DivBannerAMP bannerConfiguration={bannerConfiguration} />
        )
    );
};

Banner.label = 'LN-Common-BannerRefactor';

Banner.propTypes = bannerPropTypes;

export default Consumer(Banner);
