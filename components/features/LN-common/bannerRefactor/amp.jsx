/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';
import {
    getBannerConfiguration,
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET,
    isForAmp
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerAMP from '../../../private/common/banners/DivBannerAMP';

const Banner = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const { desktop, mobile, tablet } = customFields;

    if (!isForAmp(desktop, mobile, tablet)) return <></>;

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

Banner.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(['nota', 'acumulado', 'home']).tag({
            label: 'Ubicacion'
        }).isRequired,
        desktop: PropTypes.oneOf(BANNERS_DESKTOP),
        mobile: PropTypes.oneOf(BANNERS_MOBILE),
        tablet: PropTypes.oneOf(BANNERS_TABLET),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool
    }),
    siteProperties: PropTypes.shape({
        bannerConfig: PropTypes.shape({
            dfp_id: PropTypes.number.isRequired
        })
    }),
    isAdmin: PropTypes.bool,
    globalContent: PropTypes.shape({
        label: PropTypes.shape({
            mostrar_banners: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        termicas: PropTypes.shape({
            banners: PropTypes.string
        }),
        taxonomy: PropTypes.shape({
            sections: PropTypes.arrayOf(PropTypes.node),
            tags: PropTypes.arrayOf(PropTypes.node)
        })
    }),
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

export default Consumer(Banner);
