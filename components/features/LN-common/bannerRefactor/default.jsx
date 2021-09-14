/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
// import BannerComponent from '../../../private/LN/common/bannerRefactor';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';

import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET,
    getBannerConfiguration,
    isForAmp
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';
import bannersRules from '../../../private/common/banners/bannersRules';
import get from '../../../private/common/utils/get';

const Banner = props => {
    const { isAdmin, customFields, globalContent, globalContentConfig } = props;

    const { sticky, desktop, mobile, tablet } = customFields;

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
        );
    });
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
        })
    }),
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            id: PropTypes.string
        })
    }).isRequired
};

export default Consumer(Banner);
