import React from 'react';
import { useAppContext } from 'fusion:context';

import { getTypeOfDevice } from '@ln/hooks';
import PropTypes from 'prop-types';
import isSSR from '../../../private/LN/common/utils/isSSR';

import { useAdManager } from './hooks/useAdManager';

export function BannerBaseFoodit({ bannerType }) {
    const { layout } = useAppContext();

    const device = getTypeOfDevice({
        breakpoints: {
            mobile: 768,
            tablet: 1024
        }
    });
    const { devices, getTargetings } = bannerType;
    const {
        slotId,
        size,
        divId,
        classParent = '',
        styleBanner = ''
    } = devices[device];

    if (isSSR()) {
        return (
            <div className={classParent}>
                <div id={divId} />
            </div>
        );
    }

    const adManagerError = useAdManager(
        slotId,
        size,
        divId,
        getTargetings({ contentType: layout })
    );

    if (adManagerError) {
        console.error('Error al cargar el banner:', adManagerError);
        return null;
    }

    return (
        <div className={classParent}>
            <div id={divId} style={{ ...styleBanner }} />
        </div>
    );
}

BannerBaseFoodit.propTypes = {
    bannerType: PropTypes.shape({
        devices: PropTypes.shape({
            desktop: PropTypes.shape({
                slotId: PropTypes.string.isRequired,
                size: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
                    .isRequired,
                divId: PropTypes.string.isRequired,
                classParent: PropTypes.string.isRequired
            }),
            mobile: PropTypes.shape({
                slotId: PropTypes.string.isRequired,
                size: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
                    .isRequired,
                divId: PropTypes.string.isRequired,
                classParent: PropTypes.string.isRequired
            }),
            tablet: PropTypes.shape({
                slotId: PropTypes.string.isRequired,
                size: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
                    .isRequired,
                divId: PropTypes.string.isRequired,
                classParent: PropTypes.string.isRequired
            })
        }).isRequired,
        getTargetings: PropTypes.func.isRequired
    }).isRequired
};

export default BannerBaseFoodit;
