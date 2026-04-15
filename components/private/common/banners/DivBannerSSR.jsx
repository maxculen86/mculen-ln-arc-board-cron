import React, { useState } from 'react';
import { Closebutton } from '@ln/common-ui-closebutton';
import { Button } from '@ln/contenidos-ui-button';
import classNames from 'classnames';
import flatArray from '../utils/flatArray';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';
import get from '../utils/get';

import '../../../../resources/dist/css/ln/modules/mod-banner.css';

function DivBannerSSR({ bannerConfiguration }) {
    const {
        slotId,
        slotGroup,
        device,
        dfpId,
        slotName,
        targeting,
        withoutHide,
        dimensions,
        bidding,
        hideForSubscriptor,
        closeButton,
        classes,
        isStatic = false,
        lazyClass = ''
    } = bannerConfiguration;
    const [isHidden, setIsHidden] = useState(false);

    const handleHideBanner = () => setIsHidden(true);

    const comercialButton = (
        <Button
            onClick={handleHideBanner}
            variant="primary"
            dataEvent="LinkClick"
            dataSection="Comercial-home"
            id={`${slotId}_btnCloseAd`}
            label="CERRAR"
        />
    );
    const bannersNoApp = [
        'cabezal_dsk',
        'cabezal_tab',
        'comercial_dsk',
        'comercial_mob'
    ];

    const bannerClass = classNames('ln-banner', lazyClass);

    const bannerClassContainer = classNames(
        'ln-banner-container',
        `--${slotId}`,
        classes,
        { none: isHidden },
        { '--no-app': bannersNoApp.includes(slotId) }
    );

    const Comp = (
        <>
            <div
                id={slotId}
                className={bannerClass}
                data-slot-group={slotGroup}
                data-device={device}
                data-subscription={hideForSubscriptor || false}
                data-ad-unit-path={dfpId ? `/${dfpId}/${slotName}` : null}
                data-targeting={JSON.stringify(targeting)}
                data-without-hide={withoutHide || false}
                data-size={JSON.stringify(flatArray(dimensions))}
                data-sizemap={JSON.stringify([])}
                data-prebid-enabled={get(bidding, 'prebid.enabled', false)}
            />
            {closeButton && (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {slotId.includes('comercial') ? (
                        comercialButton
                    ) : (
                        <Closebutton
                            onClick={handleHideBanner}
                            id={`${slotId}_btnCloseAd`}
                            type="button"
                            aria-label="Close"
                            className="button ln-button"
                            iconProps={{
                                className: 'icon-close',
                                color: 'light'
                            }}
                        />
                    )}
                </>
            )}
        </>
    );

    return isStatic ? (
        <StaticContentV2 id={slotId} className={bannerClassContainer}>
            {Comp}
        </StaticContentV2>
    ) : (
        <div className={bannerClassContainer}>{Comp}</div>
    );
}

export default DivBannerSSR;
