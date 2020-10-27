/* eslint-disable react/require-default-props */
import React, { useCallback } from 'react';
import PropTypes from 'fusion:prop-types';
import useMutationObserver from '../../../common/hooks/useMutationObserver';
import hasAdsTestParam from '../utils/hasAdsTesParam';

import ArcAdLib from './arcAdLib';

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

    ArcAdLib.getInstance().registerAd(
        {
            id,
            slotName,
            dimensions,
            display,
            targeting: { ...targeting, adstest: hasAdsTestParam() },
            sizemap,
            bidding
        },
        dfpId,
        bidding
    );

    const onMutate = useCallback(
        mutations => {
            mutations.forEach(mutation => {
                const nodes = mutation.addedNodes;
                nodes.forEach(node => {
                    if (node.localName === 'iframe') {
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
