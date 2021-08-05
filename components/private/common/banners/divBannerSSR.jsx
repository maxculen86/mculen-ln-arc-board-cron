/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import get from '../utils/get';
import flatArray from '../utils/flatArray';

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
        sizemap,
        subscription,
        closeButton,
        background,
        sticky,
        fixed
    } = bannerConfiguration;

    return (
        <div
            className={`mod-banner ${background ? '--bg-banner' : ''} ${
                sticky ? '--sticky' : ''
            } ${closeButton ? '--close' : ''} ${
                fixed ? '--fixed' : ''
            } --${slotId} ${withoutHide ? '' : 'hlp-none'} `}
        >
            {closeButton && (
                <>
                    <button
                        id="btnCloseAd"
                        type="button"
                        aria-label="Close"
                        className="icon-close"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            document.getElementById('btnCloseAd').onclick = function() {
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
                data-subscription={subscription || false}
                data-ad-unit-path={`/${dfpId}/${slotName}`}
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
        device: PropTypes.string.isRequired,
        dfpId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
            .isRequired,
        slotName: PropTypes.string.isRequired,
        targeting: PropTypes.shape({
            seccion: PropTypes.string,
            sitio: PropTypes.string
        }).isRequired,
        sizemap: PropTypes.arrayOf(
            PropTypes.shape({
                breakpoints: PropTypes.array,
                refresh: PropTypes.bool
            })
        ),
        bidding: PropTypes.objectOf(PropTypes.string),
        background: PropTypes.bool,
        fixed: PropTypes.bool,
        closeButton: PropTypes.bool,
        sticky: PropTypes.bool,
        show: PropTypes.shape({
            termicas: PropTypes.bool,
            collection: PropTypes.bool
        }),
        subscription: PropTypes.bool,
        slotGroup: PropTypes.string.isRequired,
        withoutHide: PropTypes.bool
    }).isRequired
};

export default DivBannerSSR;
