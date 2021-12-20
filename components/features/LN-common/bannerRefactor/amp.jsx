/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import Placeholder from '../../../private/common/banners/placeholder';
import {
    getBannerConfiguration,
    isForAmp
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerAMP from '../../../private/common/banners/DivBannerAMP';
import { bannerPropTypes } from '../../../private/common/utils/propTypesHelper';

const Banner = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const { desktop, mobile, tablet } = customFields;

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

    return <DivBannerAMP bannerConfiguration={bannerConfiguration} />;
};

Banner.label = 'LN-Common-BannerRefactor';
Banner.static = true;

Banner.propTypes = bannerPropTypes;

export default Consumer(Banner);
