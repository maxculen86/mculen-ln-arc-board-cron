/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { createRef, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../../ads';
import addEventListener from '../../../../../../../common/hooks/useEventListener';
import useMutationObserver from '../../../../../../../common/hooks/useMutationObserver';
import { onMutation, onLoad, onScroll, onClick } from './handlers';

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

    const [showComercial, setShowComercial] = useState(false);
    const [isMutationObserverActive, setIsMutationObserverActive] = useState(
        true
    );
    const wrapperElement = document.getElementById('wrapper');
    const windowRef = useRef(window || null);
    const wrapperRef = useRef(wrapperElement);
    const comercialRef = createRef();

    const observerConfig = {
        subtree: true,
        childList: true
    };

    const handleClick = () => {
        onClick(windowRef, wrapperRef);
    };

    const handleScroll = () => {
        onScroll(comercialRef, wrapperRef, device);
    };

    const handleMutation = mutations => {
        onMutation(mutations, id, setShowComercial);
    };

    useMutationObserver(
        isMutationObserverActive,
        handleMutation,
        id,
        observerConfig
    );

    addEventListener('scroll', handleScroll, window);

    useLayoutEffect(() => {
        let idTimeout;
        if (showComercial) {
            idTimeout = onLoad(comercialRef, handleClick);
            setIsMutationObserverActive(false);
        }
        return () => {
            clearTimeout(idTimeout);
        };
    }, [comercialRef, showComercial]);

    return (
        <div
            ref={comercialRef}
            className="mod-banner --comercial"
            // style={{
            //     height: !showComercial ? '0px' : '100vh',
            //     transition: 'height 1000ms ease-in-out 0s'
            // }}
        >
            <button
                type="button"
                className="com-button --secondary --compact"
                onClick={handleClick}
                data-section="Comercial-nota"
            >
                CERRAR
            </button>
            <Ads
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
