/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import PropTypes from 'fusion:prop-types';
import useMutationObserver from '../../../common/hooks/useMutationObserver';
import hasAdsTestParam from '../utils/hasAdsTesParam';
import { ADHESION_DSK } from './factory/constants/index';

import ArcAdLib from './arcAdLib';

const PREBID_TIMEOUT = 2000;

const runRefreshEvent = ad => {
    if (window.blockArcAdsLoad) return 'blockArcAdsLoad';
    if (window.googletag && googletag.pubadsReady) {
        window.googletag.pubads().refresh([ad]);
    } else {
        setTimeout(() => {
            runRefreshEvent(ad);
        }, 200);
    }

    return true;
};

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

    if (window) {
        window.arcAdsPrerenderer = adDetails => {
            return new Promise(resolve => {
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

                    const initAdserver = () => {
                        googletag.cmd.push(() => {
                            pbjs.que.push(() => {
                                pbjs.setTargetingForGPTAsync([
                                    adDetails.adSlot
                                ]);

                                runRefreshEvent(adDetails.adUnit);
                            });
                        });

                        resolve(adDetails);
                    };

                    pbjs.que.push(() => {
                        const { adUnits = [] } = pbjs;
                        const _id = adDetails.adUnit
                            .getAdUnitPath()
                            .split('/')[1];
                        const code = prebid.code
                            ? `/${_id}/${prebid.code}`
                            : adDetails.adSlot;

                        // Se borran atributos innecesarios
                        delete prebid.code;
                        delete prebid.enabled;
                        delete prebid.useSlotForAdUnit;

                        const isCodeAdded =
                            adUnits.filter(e => e.code === code).length > -1;

                        if (isCodeAdded) resolve(adDetails);

                        const thisAdUnit = {
                            code: adDetails.adSlot,
                            ...prebid
                        };
                        pbjs.addAdUnits([{ ...thisAdUnit }]);
                        pbjs.setConfig({
                            priceGranularity: 'dense',
                            rubicon: { singleRequest: true },
                            useBidCache: true,
                            bidderTimeout: PREBID_TIMEOUT
                        });
                        pbjs.requestBids({
                            bidsBackHandler: initAdserver,
                            timeout: PREBID_TIMEOUT
                        });
                    });

                    // En caso de que PBJS no cargue
                    /* setTimeout(() => {
                        initAdserver();
                    }, FAILSAFE_TIMEOUT); */
                }

                resolve(adDetails);
            });
        };

        ArcAdLib.getInstance().registerAd(
            {
                id,
                slotName,
                dimensions,
                display,
                targeting: { ...targeting, adstest: hasAdsTestParam() },
                sizemap,
                bidding,
                prerender: window.arcAdsPrerenderer
            },
            dfpId,
            bidding
        );

        const onMutate = useCallback(
            mutations => {
                mutations.forEach(mutation => {
                    const nodes = mutation.addedNodes;
                    nodes.forEach(node => {
                        const {
                            nodeId,
                            style: { width },
                            localName
                        } = node;

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
    }

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
