/* eslint-disable react/require-default-props */
import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'fusion:prop-types';
import { baseConfig } from './config';

const Ads = props => {
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
                if (window.googletag && googletag.pubadsReady) {
                    googletag.pubads().collapseEmptyDivs(true);
                }
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

    const onMutate = useCallback(
        mutations => {
            mutations.forEach(mutation => {
                const nodes = mutation.addedNodes;
                nodes.forEach(node => {
                    if (node.localName === 'iframe') {
                        document
                            .querySelector(`#${id}`)
                            .classList.remove('hlp-none');
                    }
                });
            });
        },
        [id]
    );

    const observer = useRef(new MutationObserver(onMutate));

    useEffect(() => {
        const watcher = observer.current;
        observer.current.observe(document.querySelector(`#${id}`), {
            subtree: true,
            childList: true
        });
        return () => watcher.disconnect();
    }, [id]);

    return (
        <div id={id} className="banner">
            {/* hlp-none */}
            <div>{children}</div>
        </div>
    );
};

Ads.propTypes = {
    id: PropTypes.string.isRequired,
    dfpId: PropTypes.number.isRequired,
    slotName: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
    targeting: PropTypes.shape({
        sitio: PropTypes.string,
        seccion: PropTypes.string
    }).isRequired,
    bidding: PropTypes.shape({
        prebid: PropTypes.object
    }).isRequired,
    background: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.nodes)
};

export default Ads;
