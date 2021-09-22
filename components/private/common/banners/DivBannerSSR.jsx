/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import get from '../utils/get';
import flatArray from '../utils/flatArray';
import ComButton from '../com-button';

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
        // subscription,
        closeButton,
        classes
    } = bannerConfiguration;

    return (
        <div className={`mod-banner --${slotId} ${classes || ''} `}>
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
                        />
                    )}

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            document.getElementById('${slotId}_btnCloseAd').onclick = function() {
                                this.parentNode.classList.add('hlp-none')
                             };
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
                // data-subscription={subscription || false}
                data-ad-unit-path={dfpId ? `/${dfpId}/${slotName}` : undefined}
                data-targeting={JSON.stringify(targeting)}
                data-without-hide={withoutHide || false}
                data-size={JSON.stringify(flatArray(dimensions))}
                data-sizemap={JSON.stringify([])}
                data-prebid-enabled={get(bidding, 'prebid.enabled', false)}
            />
        </div>
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
        targeting: PropTypes.shape({
            seccion: PropTypes.string,
            sitio: PropTypes.string
        }),
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
        withoutHide: PropTypes.bool
    }).isRequired
};

export default DivBannerSSR;
