import React, { Component } from 'react';
import { baseConfig } from './config';

// TODO: faltan propTypes
class ArcWrapper extends Component {
    static arcAdsInstance = undefined;

    componentDidMount() {
        const arcAdsInstance = this.getArcAdsInstance();
        const {
            id,
            slotName,
            dimensions,
            adType,
            targeting,
            breakpoints,
            refresh,
            bidding,
            display,
            dfpId
        } = this.props;
        arcAdsInstance.registerAd(
            {
                id,
                slotName,
                dimensions,
                adType,
                display,
                targeting,
                sizemap: {
                    breakpoints,
                    refresh
                },
                bidding
                // prerender: window.arcAdsPrerenderer
            },
            dfpId,
            bidding
        );
    }

    getArcAdsInstance() {
        if (!ArcWrapper.arcAdsInstance) {
            const { dfpId } = this.props;
            ArcWrapper.arcAdsInstance = new ArcAds({
                dfp: {
                    id: dfpId
                },
                bidding: baseConfig.bidding
            });
        }

        return ArcWrapper.arcAdsInstance;
    }

    render() {
        const { id, children, className } = this.props;
        return (
            <div id={id} className={className}>
                {children}
            </div>
        );
    }
}

export default ArcWrapper;
