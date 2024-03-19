import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Closebutton } from '@ln/common-ui-closebutton';
import { Button } from '@ln/contenidos-ui-button';
import ComButton from '../com-button';
import flatArray from '../utils/flatArray';
import StaticContent from '../staticContent';
import siteProperties from '../../../../properties/sites/la-nacion-ar';
import get from '../utils/get';
import classNames from 'classnames';
import '../../../../resources/packages/css/@ln/contenidos-ui-banners/index.css';
import '../../../../resources/dist/css/ln/modules/mod-banner.css';
import '../../../../resources/dist/css/ln/components/com-banner.css';

const DivBannerSSR = ({ bannerConfiguration }) => {
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
    const homeLN10PropName = 'layoutsName.HomeLN10';
    const { layout } = useAppContext();

    const comercialButton =
        layout !== get(siteProperties, homeLN10PropName) ? (
            <ComButton
                classCondition="--primary --compact"
                dataEvent="LinkClick"
                dataSection="Comercial-home"
                id={`${slotId}_btnCloseAd`}
                textname="CERRAR"
            />
        ) : (
            <Button
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

    const bannerClass = classNames(
        `${
            layout !== get(siteProperties, homeLN10PropName)
                ? 'com-banner'
                : 'ln-banner'
        }`,
        lazyClass,
        { '--no-app': bannersNoApp.includes(slotId) }
    );

    const _classNames = `${
        layout !== get(siteProperties, homeLN10PropName)
            ? 'mod-banner'
            : 'ln-banner-container'
    } --${slotId} ${classes || ''} `;
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
                <>
                    {slotId.includes('comercial') ? (
                        comercialButton
                    ) : (
                        <Closebutton
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
        <StaticContent className={_classNames}>{Comp}</StaticContent>
    ) : (
        <div className={_classNames}>{Comp}</div>
    );
};

DivBannerSSR.propTypes = {
    bannerConfiguration: PropTypes.shape({
        slotId: PropTypes.string.isRequired,
        classes: PropTypes.string,
        device: PropTypes.string,
        dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        slotName: PropTypes.string,
        targeting: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                seccion: PropTypes.string,
                sitio: PropTypes.string
            })
        ]),
        sizemap: PropTypes.arrayOf(
            PropTypes.shape({
                breakpoints: PropTypes.array,
                refresh: PropTypes.bool
            })
        ),
        bidding: PropTypes.shape({
            prebid: PropTypes.shape({
                enabled: PropTypes.bool
            })
        }),
        closeButton: PropTypes.bool,
        slotGroup: PropTypes.string,
        withoutHide: PropTypes.bool,
        hideForSubscriptor: PropTypes.bool,
        isStatic: PropTypes.bool,
        lazyClass: PropTypes.string
    }).isRequired
};

export default DivBannerSSR;
