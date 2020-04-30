import React, { useRef, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { baseConfig } from './config';

const Ads = React.memo(props => {
    const ref = useRef();

    const {
        id,
        slotName,
        dimensions,
        targeting,
        bidding,
        display,
        background,
        dfpId,
        breakpoints,
        refresh,
        children
    } = props;

    if (!ref.current) {
        ref.current = new ArcAds(
            {
                dfp: {
                    id: dfpId
                },
                bidding: baseConfig.bidding
            },
            event => {
                /* if (window.googletag && googletag.pubadsReady) {
                        googletag.pubads().collapseEmptyDivs(true);
                    } */
            }
        );

        ref.current.registerAd(
            {
                id,
                slotName,
                dimensions,
                display,
                targeting,
                sizemap: {
                    breakpoints,
                    refresh
                },
                bidding
            },
            dfpId,
            bidding
        );
    }

    return <div>{children}</div>;
});

Ads.propTypes = {
    id: PropTypes.string.isRequired,
    dfpId: PropTypes.number.isRequired,
    slotName: PropTypes.string.isRequired,
    dimensions: PropTypes.array.isRequired,
    targeting: PropTypes.object.isRequired,
    bidding: PropTypes.object.isRequired,
    background: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.nodes)
};

export default Ads;
