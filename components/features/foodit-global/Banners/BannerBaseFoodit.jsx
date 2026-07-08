import React, { useMemo } from 'react';
import { useAppContext } from 'fusion:context';

import { getTypeOfDevice } from '@ln/hooks';
import { cx } from '@ln/ds-cva';
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

    const classContainer = cx(classParent, '--no-app');

    const targetings = useMemo(
        () => (isSSR() ? {} : getTargetings({ contentType: layout })),
        [layout]
    );

    if (isSSR()) {
        return (
            <div className={classContainer}>
                <div id={divId} />
            </div>
        );
    }

    const adManagerError = useAdManager(slotId, size, divId, targetings);

    if (adManagerError) {
        console.error('Error al cargar el banner:', adManagerError);
        return null;
    }

    return (
        <div className={classContainer}>
            <div id={divId} style={{ ...styleBanner }} />
        </div>
    );
}

export default BannerBaseFoodit;
