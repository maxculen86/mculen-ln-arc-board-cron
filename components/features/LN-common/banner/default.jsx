/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import Placeholder from '../../../private/LN/common/bannerRefactor/placeholder';

import { slotsConfig } from '../../../private/LN/common/bannerRefactor/config';
import {
    getBannerConfiguration,
    getScriptForCabezalSticky
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

    const { amp, slot, device, group, sticky } = customFields;

    if (amp) return <></>;

    const bannerConfiguration = getBannerConfiguration(
        globalContent,
        customFields,
        globalContentConfig
    );

    if (isAdmin && !bannerConfiguration)
        return (
            <Placeholder
                error="sin configuracion"
                slotName={`${group} => ${device} => ${slot}`}
            />
        );

    if (isAdmin && bannerConfiguration) {
        return (
            <Placeholder
                slotName={bannerConfiguration.slotName}
                dimensions={bannerConfiguration.dimensions}
                targeting={bannerConfiguration.targeting}
            />
        );
    }

    if (
        (bannerConfiguration &&
            Object.values(bannerConfiguration.show).some(
                element => element === false
            )) ||
        !bannerConfiguration
    )
        return <></>;

    return (
        <Static id={idFeature}>
            <DivBannerSSR bannerConfiguration={bannerConfiguration} />
            {sticky &&
                slot.includes('cabezal') &&
                getScriptForCabezalSticky(
                    'header',
                    'lay-sidebar',
                    bannerConfiguration.slotId
                )}
        </Static>
    );
};

BannerSSR.label = 'LN-Common-Banner';

BannerSSR.propTypes = {
    customFields: PropTypes.shape({
        group: PropTypes.oneOf(Object.keys(slotsConfig)).tag({
            label: 'Ubicacion'
        }).isRequired,
        device: PropTypes.oneOf(['desktop', 'mobile', 'tablet']),
        slot: PropTypes.oneOf([
            'comercial',
            'adhesion',
            'megatop',
            '1x1',
            'cabezal',
            'caja1',
            'caja2',
            'caja3',
            'caja4',
            'caja5',
            'inread',
            'middle_1',
            'middle_2',
            'middle_3',
            'middle_teads',
            'sticky1',
            'sticky2'
        ]),
        sticky: PropTypes.bool,
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        amp: PropTypes.bool
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
