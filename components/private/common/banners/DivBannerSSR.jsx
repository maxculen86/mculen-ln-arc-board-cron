/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import get from '../utils/get';
import flatArray from '../utils/flatArray';
import ComButton from '../com-button';
import Icon from '../icon';
import StaticContent from '../staticContent';

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
        isStatic = false
    } = bannerConfiguration;
    const ClassNames = `mod-banner --${slotId} ${classes || ''} `;
    const Comp = (
        <>
            {closeButton && (
                <>
                    {slotId.includes('comercial') ? (
                        <ComButton
                            classCondition="--primary --compact"
                            dataEvent="LinkClick"
                            dataSection="Comercial-home"
                            id={`${slotId}_btnCloseAd`}
                            textname="CERRAR"
                        />
                    ) : (
                        <button
                            id={`${slotId}_btnCloseAd`}
                            type="button"
                            aria-label="Close"
                            className="icon-close"
                        >
                            <Icon name="close" negative />
                        </button>
                    )}

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.addEventListener('DOMContentLoaded', () => {
                                document.getElementById('${slotId}_btnCloseAd').onclick = function() {
                                    this.parentNode.classList.add('hlp-none')
                                };
                            });
                            `
                        }}
                    />
                </>
            )}
            <div
                id={slotId}
                className="com-banner"
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
        </>
    );

    return isStatic ? (
        <StaticContent className={ClassNames}>{Comp}</StaticContent>
    ) : (
        <div className={ClassNames}>{Comp}</div>
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
        isStatic: PropTypes.bool
    }).isRequired
};

export default DivBannerSSR;
