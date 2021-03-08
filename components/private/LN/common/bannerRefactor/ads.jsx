/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import useMutationObserver from '../../../common/hooks/useMutationObserver';
import hasAdsTestParam from '../utils/hasAdsTesParam';
import { ADHESION_DSK } from './factory/constants/index';

import ArcAdLib from './arcAdLib';

const bannersLoaded = [];

const Ads = props => {
    const {
        id,
        slotName,
        dimensions,
        targeting,
        bidding,
        sizemap,
        display,
        dfpId,
        children
    } = props;
    const [instanced, setInstanced] = useState(() => false);

    useEffect(() => {
        googletag;

        googletag.cmd.push(() => {
            /* googletag.pubads().enableSingleRequest();
            googletag.pubads().disableInitialLoad();
            googletag.enableServices(); */
            /* console.log(
                '🚀 ~ file: ads.jsx ~ line 41 ~ googletag.cmd.push ~ dimensions',
                `/${dfpId}/${slotName}`,
                dimensions,
                id
            ); */
            // googletag.pubads().collapseEmptyDivs();
            // console.log('🚀 ~ file: ads.jsx ~ line 25 ~ targeting', targeting);
            // googletag.pubads().setTargeting
            // navegg();
            // console.log("🚀 ~ file: ads.jsx ~ line 70 ~ navegg", navegg)
        });
    }, [dimensions]);

    const onMutate = useCallback(
        mutations => {
            mutations.forEach(mutation => {
                I;
                const nodes = mutation.addedNodes;
                nodes.forEach(node => {
                    const { nodeId, style, localName } = node;
                    const { width } = style || {};

                    const nodeDimension =
                        width && parseInt(width.replace('px', ''), 10);

                    if (nodeId === ADHESION_DSK && nodeDimension === 728)
                        document
                            .querySelector(`#${id}`)
                            .parentNode.classList.add('--small');

                    if (localName === 'iframe') {
                        document
                            .querySelector(`#${id}`)
                            .parentNode.classList.remove('hlp-none');
                    }
                });
            });
        },
        [id]
    );

    useMutationObserver(true, onMutate, id, {
        subtree: true,
        childList: true
    });

    if (typeof window === 'undefined') return <></>;

    window.arcAdsPrerenderer = adDetails => {
        return new Promise(resolve => {
            setInstanced(() => true);
            const { prebid = {} } = bidding || {};

            if (
                Object.keys(prebid || {}).length > 0 &&
                typeof pbjs === 'object' &&
                Object.keys(pbjs || {}).length > 0 &&
                typeof googletag === 'object' &&
                Object.keys(googletag || {}).length > 0
            ) {
                googletag.cmd = googletag.cmd || [];
                pbjs.que = pbjs.que || [];

                googletag.cmd.push(() => {
                    console.time();
                    console.info(
                        `::: Se cargara un PREBID ::: /${dfpId}/${slotName}_0`
                    );

                    googletag.pubads().disableInitialLoad();
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();

                    const callAdserver = gptSlots => {
                        if (pbjs.adserverCalled) return;
                        pbjs.adserverCalled = true;

                        setTimeout(() => {
                            googletag.pubads().refresh(gptSlots, {
                                changeCorrelator: false
                            });
                        }, 1000);
                    };

                    // request pbjs bids when it loads
                    pbjs.que.push(() => {
                        pbjs.rp.requestBids({
                            callback: callAdserver,
                            gptSlotObjects: [adDetails.adUnit]
                        });
                    });

                    // failsafe in case PBJS doesn't load
                    setTimeout(() => {
                        callAdserver([adDetails.adUnit]);
                    }, 2500);
                    console.timeEnd();
                });
            }

            resolve(adDetails);
        });
    };

    const adInstancer = () => {
        bannersLoaded.push(`/${dfpId}/${slotName}`);
        ArcAdLib.getInstance().registerAd(
            {
                id,
                slotName,
                dimensions,
                display,
                targeting: { ...targeting, adstest: hasAdsTestParam() },
                sizemap,
                prerender: window.arcAdsPrerenderer
            },
            dfpId
        );
    };

    !instanced &&
        !bannersLoaded.includes(`/${dfpId}/${slotName}`) &&
        adInstancer();

    return (
        <div id={id} className="com-banner">
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
    sizemap: PropTypes.shape({
        breakpoints: PropTypes.array,
        refresh: PropTypes.bool
    }),
    bidding: PropTypes.shape({
        prebid: PropTypes.object
    }),
    children: PropTypes.arrayOf(PropTypes.nodes),
    display: PropTypes.string
};

export default Ads;
