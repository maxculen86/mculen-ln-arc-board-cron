/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { createRef, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../../ads';
import addEventListener from '../../../../../../../common/hooks/useEventListener';
import useMutationObserver from '../../../../../../../common/hooks/useMutationObserver';
import { onMutation, onLoad, onScroll, onClick } from './handlers';

// Quitar luego de la demo
const simulateLoadAds = () => {
    return setTimeout(() => {
        const adsElement =
            document.getElementById(
                'google_ads_iframe_/133919216/la_nacion_desktop/Nota/megatop_dsk_0__container__'
            ) ||
            document.getElementById(
                'google_ads_iframe_/133919216/la_nacion_mobile/Nota/megatop_mob_0__container__'
            );
        const test =
            "<img alt='' className='i-amphtml-fill-content i-amphtml-replaced-content'  src='https://tpc.googlesyndication.com/simgad/10253891865309241763' style='height: 100%'/>";
        adsElement.innerHTML = test;
    }, 3000);
};

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

    // Quitar luego de la demo
    const [ads] = useState(simulateLoadAds());
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
            // Quitar luego de la demo
            clearTimeout(ads);
        }
        return () => {
            clearTimeout(idTimeout);
        };
    }, [ads, megatopRef, showMegatop]);

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
