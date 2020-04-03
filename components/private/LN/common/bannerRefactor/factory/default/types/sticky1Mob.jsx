/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props  */
/* eslint-disable react/forbid-prop-types      */

import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

import { slotsConfig } from '../../../config';

import Sticky2Mob from './sticky2Mob';

const isVisibleInViewport = element => {
    const bounds = element.getBoundingClientRect();
    return (
        bounds.top >= 0 &&
        bounds.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
    );
};

const hideElement = element => {
    if (window.getComputedStyle(element).display !== 'none') {
        element.style.display = 'none';
    }
};

const showElement = element => {
    if (window.getComputedStyle(element).display !== 'flex') {
        element.style.display = 'flex';
    }
};

const Sticky1Mob = props => {
    const scrollPos = useRef(0);

    const sticky1 = useRef();

    const { device } = props;
    if (device !== 'mobile') return null;

    useLayoutEffect(() => {
        const sticky2 = document.getElementById('sticky2_mob').parentElement;

        hideElement(sticky2);

        const handleScroll = () => {
            const windowY = window.scrollY;
            if (windowY < scrollPos.current) {
                // scrolls up
                scrollPos.current = windowY;
                if (isVisibleInViewport(sticky1.current)) {
                    // if sticky one is in the viewport
                    hideElement(sticky2);
                }
            } else if (windowY >= scrollPos.current) {
                // scrolls down
                scrollPos.current = windowY;
                if (!isVisibleInViewport(sticky1.current)) {
                    // if sticky one is out of the viewport
                    showElement(sticky2);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollPos.current]);

    const {
        slotId: id,
        slotName,
        dimensions,
        dfpId,
        targeting,
        sticky,
        background,
        show,
        bidding
    } = props;

    const ad = (
        <Ads
            id={id}
            slotName={slotName}
            dimensions={dimensions}
            targeting={targeting}
            bidding={bidding}
            dfpId={dfpId}
            background={background ? '--bg-banner' : ''}
        />
    );

    const stickyMob2Config = slotsConfig['nota']['sticky2_mob'];

    const config = { ...props, ...stickyMob2Config, slotId: 'sticky2_mob' };

    return (
        <>
            <Sticky2Mob {...config} />
            <div ref={sticky1}>
                <div className={`--bg-banner --${device}`}>
                    <div id="sticky1_mob" className="banner">
                        {ad}
                    </div>
                </div>
            </div>
        </>
    );
};

Sticky1Mob.propTypes = {
    slotId: PropTypes.string.isRequired,
    device: PropTypes.string.isRequired,
    dfpId: PropTypes.string.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        .isRequired,
    slotName: PropTypes.string.isRequired,
    targeting: PropTypes.shape({
        seccion: PropTypes.string,
        sitio: PropTypes.string
    }).isRequired,
    bidding: PropTypes.object.isRequired,
    background: PropTypes.string
};

export default Sticky1Mob;
