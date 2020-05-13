/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { createRef, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../../ads';
import addEventListener from '../../../../../../../common/hooks/useEventListener';
import useMutationObserver from '../../../../../../../common/hooks/useMutationObserver';
import { onMutation, onLoad, onScroll, onClick } from './handlers';

const Megatop = props => {
    const {
        device,
        slotId: id,
        slotName,
        dimensions,
        targeting,
        dfpId,
        background
    } = props;

    if (device === 'tablet') return null;

    const [showMegatop, setShowMegatop] = useState(false);
    const [isMutationObserverActive, setIsMutationObserverActive] = useState(
        true
    );
    const wrapperElement = document.getElementById('wrapper');
    const windowRef = useRef(window || null);
    const wrapperRef = useRef(wrapperElement);
    const megatopRef = createRef();

    const observerConfig = {
        subtree: true,
        childList: true
    };

    const handleClick = () => {
        onClick(windowRef, wrapperRef);
    };

    const handleScroll = () => {
        onScroll(megatopRef, wrapperRef, device);
    };

    const handleMutation = mutations => {
        onMutation(mutations, id, setShowMegatop);
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
        if (showMegatop) {
            idTimeout = onLoad(megatopRef, handleClick);
            setIsMutationObserverActive(false);
        }
        return () => {
            clearTimeout(idTimeout);
        };
    }, [megatopRef, showMegatop]);

    return (
        <div
            ref={megatopRef}
            className="mod-banner --megatop"
            style={{
                height: !showMegatop ? '0px' : '100vh',
                transition: 'height 1000ms ease-in-out 0s'
            }}
        >
            <button
                type="button"
                className="com-button"
                onClick={handleClick}
                data-section="Megatop-nota"
            >
                Publicidad | <span>Bajar al sitio</span>
            </button>
            <div id={id} className="com-banner">
                <Ads
                    id={id}
                    slotName={slotName}
                    dimensions={dimensions}
                    targeting={targeting}
                    dfpId={dfpId}
                    background={background ? '--bg-banner' : ''}
                    extraClasses="com-banner"
                />
            </div>
        </div>
    );
};

Megatop.propTypes = {
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
    background: PropTypes.string
};

Megatop.defaultProps = {
    background: undefined
};

export default Megatop;
