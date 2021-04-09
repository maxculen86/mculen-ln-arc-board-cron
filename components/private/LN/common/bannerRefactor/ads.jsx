/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import get from '../../../common/utils/get';
import hasAdsTestParam from '../utils/hasAdsTesParam';
import flatArray from '../../../common/utils/flatArray';
import { GlobalContext } from '../../../common/context/globalContext';

const bannersLoaded = [];

const Ads = props => {
    const {
        slotId: id,
        slotName,
        dimensions,
        dfpId,
        targeting,
        bidding,
        sizemap,
        slotGroup,
        subscription
    } = props;
    const [toInstance, setToInstance] = useState(() => false);
    const { dispatch } = useContext(GlobalContext);
    const prebidEnabled = get(bidding, 'prebid.enabled', false);

    useEffect(() => {
        if (!toInstance && !bannersLoaded.includes(`/${dfpId}/${slotName}`)) {
            bannersLoaded.push(`/${dfpId}/${slotName}`);
            setToInstance(() => true);

            console.log(`::: Banner position: ${id}`);

            dispatch({
                type: 'ADD_ADUNIT_DEFINITION',
                payload: {
                    adUnitPath: `/${dfpId}/${slotName}`,
                    size: flatArray(dimensions),
                    opt_div: id,
                    sizemap,
                    prebidEnabled,
                    targeting,
                    slotGroup,
                    subscription
                }
            });

            if (slotGroup === 'nota') {
                dispatch({
                    type: 'REMOVE_ITEM_FROM_SHALL_BE_EXLUDED_LIST',
                    payload: { id }
                });
            }

            if (slotGroup === 'acumulado') {
                if (
                    id.search('caja') === 0 &&
                    id.search(/(?:_tab)|(?:_mob)/) > -1
                )
                    dispatch({
                        type: 'ADD_BANNER_IN_GRILLAS',
                        payload: { id }
                    });
            }
        }
    }, [
        dfpId,
        dimensions,
        dispatch,
        id,
        prebidEnabled,
        sizemap,
        slotGroup,
        slotName,
        subscription,
        targeting,
        toInstance
    ]);

    return <div id={id} className="com-banner" />;
};

Ads.propTypes = {
    slotId: PropTypes.string.isRequired,
    dfpId: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    sizemap: PropTypes.shape({
        breakpoints: PropTypes.array,
        refresh: PropTypes.bool
    }),
    bidding: PropTypes.objectOf(PropTypes.string),
    slotGroup: PropTypes.string,
    subscription: PropTypes.bool
};

Ads.defaultProps = {
    sizemap: [],
    bidding: {},
    slotGroup: 'desktop',
    subscription: false
};

export default Ads;
/* 
import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import useMutationObserver from '../../../common/hooks/useMutationObserver';
import hasAdsTestParam from '../utils/hasAdsTesParam';
import { ADHESION_DSK } from './factory/constants/index';

import ArcAdLib from './arcAdLib';

const bannersLoaded = [];

const Ads = React.memo(
    props => {
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

        const onMutate = useCallback(
            mutations => {
                mutations.forEach(mutation => {
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

                            googletag.pubads().refresh(gptSlots, {
                                changeCorrelator: false
                            });
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
    },
    (prevProps, nextProps) => prevProps.slotName === nextProps.slotName
);

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
 */
