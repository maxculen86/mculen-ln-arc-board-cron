/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';

import {
    BANNERS_DESKTOP,
    BANNERS_MOBILE,
    BANNERS_TABLET,
    getBannerConfiguration,
    getScriptForCabezalSticky,
    isForAmp
} from '../../../private/LN/common/utils/bannerHelper';
import DivBannerSSR from '../../../private/common/banners/DivBannerSSR';

const BannerSSR = props => {
    const {
        id: idFeature,
        isAdmin,
        customFields,
        globalContent,
        globalContentConfig
    } = props;

    const { sticky, desktop, mobile, tablet } = customFields;

    if (isForAmp(desktop, mobile, tablet)) return <></>;

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
        .filter(item => item !== null)
        .filter(item => {
            return Object.values(item.show).some(element => element !== false);
        });

    if (isAdmin && bannersConfiguration.length > 0) {
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

    return (
        <Static id={idFeature}>
            {bannersConfiguration.map(bannerConfiguration => {
                return (
                    <>
                        <DivBannerSSR
                            key={bannerConfiguration.slotName}
                            bannerConfiguration={bannerConfiguration}
                        />
                        {sticky &&
                            bannerConfiguration.slotId.includes('cabezal') &&
                            getScriptForCabezalSticky(
                                'header',
                                'lay-sidebar',
                                bannerConfiguration.slotId
                            )}
                    </>
                );
            })}
        </Static>
    );
};

BannerSSR.label = 'LN-Common-Banner';

BannerSSR.propTypes = {
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
    id: PropTypes.string,
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
    })
};

export default Consumer(BannerSSR);
