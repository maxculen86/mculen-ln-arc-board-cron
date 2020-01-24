import React, { Component } from 'react';
import PropTypes from 'fusion:prop-types';
import { baseConfig } from './config';

// TODO: faltan propTypes, probar import de acrAds.js aca
class ArcWrapper extends Component {
    static arcAdsInstance = undefined;

    constructor(props) {
        super(props);
        this.banner = React.createRef();
    }

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

        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const nodes = mutation.addedNodes;
                nodes.forEach(node => {
                    if (node.localName === 'iframe')
                        this.banner.current.parentNode.classList.remove(
                            'hlp-none'
                        );
                });
            });
        });
        mutationObserver.observe(this.banner.current, {
            childList: true,
            subtree: true
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    getArcAdsInstance() {
        if (!ArcWrapper.arcAdsInstance) {
            const { dfpId } = this.props;

            ArcWrapper.arcAdsInstance = new ArcAds(
                {
                    dfp: {
                        id: dfpId
                    },
                    bidding: baseConfig.bidding
                },
                event => {
                    if (!event.isEmpty) {
                        // console.log("banner instance event: ", event);
                    }
                }
            );
        }

        return ArcWrapper.arcAdsInstance;
    }

    render() {
        const { id, children, className } = this.props;

        return (
            <div id={id} className={`banner ${className}`} ref={this.banner}>
                {children}
            </div>
        );
    }
}

ArcWrapper.propTypes = {
    id: PropTypes.string.isRequired,
    dfpId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    show: PropTypes.func.isRequired
};

export default ArcWrapper;
