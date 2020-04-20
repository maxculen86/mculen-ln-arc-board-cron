/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types     */
/* eslint-disable react/no-this-in-sfc        */

import React, { PureComponent } from 'react';
import PropTypes from 'fusion:prop-types';
import { baseConfig } from './config';

class Ads extends PureComponent {
    componentDidMount() {
        const instance = this.getAdsInstance();
        const {
            id,
            slotName,
            dimensions,
            targeting,
            bidding,
            display,
            background
        } = this.props;

        instance.registerAd({
            id,
            slotName,
            dimensions,
            display,
            targeting,
            bidding
        });
    }

    getAdsInstance() {
        if (!Ads.instance) {
            const { dfpId } = this.props;

            Ads.instance = new ArcAds(
                {
                    dfp: {
                        id: dfpId
                    },
                    bidding: baseConfig.bidding
                },
                event => {
                    if (window.googletag && googletag.pubadsReady) {
                        googletag.pubads().collapseEmptyDivs(true);
                    }
                }
            );
        }

        return Ads.instance;
    }

    static instance = undefined;

    render() {
        const { children } = this.props;

        return <div>{children}</div>;
    }
}

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
