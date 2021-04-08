/* eslint-disable react-hooks/rules-of-hooks */
import React, { createRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../../ads';
import useMutationObserver from '../../../../../../../common/hooks/useMutationObserver';
import { onMutation, onLoad } from './handlers';
import ComButton from '../../../../../../../common/com-button';

const Comercial = props => {
    const {
        device,
        slotId: id,
        slotName,
        dimensions,
        targeting,
        dfpId,
        bidding,
        slotGroup,
        show,
        sizemap
    } = props;

    if (device === 'tablet') return null;

    const [showElement, setShowElement] = useState(false);
    const [isMutationObserverActive, setIsMutationObserverActive] = useState(
        true
    );
    const comercialRef = createRef();
    const adsRef = createRef();

    const observerConfig = {
        subtree: true,
        childList: true
    };

    const handleClick = () => {
        setShowElement(false);
    };

    const handleMutation = mutations => {
        onMutation(mutations, id, setShowElement);
    };

    useMutationObserver(
        isMutationObserverActive,
        handleMutation,
        id,
        observerConfig
    );

    useLayoutEffect(() => {
        let idTimeout;
        if (showElement) {
            idTimeout = onLoad(comercialRef, () => setShowElement(false));
            setIsMutationObserverActive(false);
        }
        return () => {
            clearTimeout(idTimeout);
        };
    }, [comercialRef, showElement]);

    return (
        <div
            ref={comercialRef}
            className={`mod-banner --comercial${(!showElement && ' hlp-none') ||
                ''}`}
        >
            <ComButton
                classCondition="--primary --compact"
                textname="CERRAR"
                onClick={handleClick}
            />
            <Ads
                ref={adsRef}
                slotId={id}
                slotName={slotName}
                dimensions={dimensions}
                dfpId={dfpId}
                targeting={targeting}
                show={show}
                bidding={bidding || {}}
                sizemap={sizemap}
                slotGroup={slotGroup}
            />
        </div>
    );
};

Comercial.propTypes = {
    device: PropTypes.string.isRequired,
    slotId: PropTypes.string.isRequired,
    slotName: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    dfpId: PropTypes.number.isRequired,
    bidding: PropTypes.objectOf(PropTypes.string),
    show: PropTypes.shape({
        termicas: PropTypes.bool,
        collection: PropTypes.bool
    }),
    slotGroup: PropTypes.string,
    sizemap: PropTypes.shape({
        breakpoints: PropTypes.array,
        refresh: PropTypes.bool
    })
};

Comercial.defaultProps = {
    bidding: {},
    show: {
        termicas: false,
        collections: false
    },
    slotGroup: 'desktop',
    sizemap: []
};

export default Comercial;
