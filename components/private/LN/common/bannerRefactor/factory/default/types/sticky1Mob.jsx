/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props  */
/* eslint-disable react/forbid-prop-types      */

import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

import { slotsConfig } from '../../../config';

import Sticky2Mob from './sticky2Mob';

const isNotVisibleInViewport = element => {
    const bounds = element.getBoundingClientRect();
    return bounds.top < -100 && bounds.bottom < 0;
};

const hideElement = element => {
    if (element.classList.contains('--active')) {
        element.classList.remove('--active');
    }
};

const showElement = element => {
    if (!element.classList.contains('--active')) {
        element.classList.add('--active');
    }
};

const Sticky1Mob = props => {
    const scrollPos = useRef(0);

    const sticky1 = useRef();

    const { device } = props;

    useLayoutEffect(() => {
        const sticky2 = document.getElementById('sticky2_mob').parentElement;

        hideElement(sticky2);

        const handleScroll = () => {
            const windowY = window.scrollY;
            if (windowY < scrollPos.current) {
                // scrolls up
                scrollPos.current = windowY;
                hideElement(sticky2);
            } else if (windowY >= scrollPos.current) {
                // scrolls down
                scrollPos.current = windowY;
                if (isNotVisibleInViewport(sticky1.current)) {
                    // if sticky one is out of the viewport
                    showElement(sticky2);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (device !== 'mobile') return null;

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

    const stickyMob2Config = slotsConfig.nota.sticky2_mob;

    const config = { ...props, ...stickyMob2Config, slotId: 'sticky2_mob' };

    if (Object.values(show).some(element => element === false)) return <></>;

    return (
        <>
            <Sticky2Mob {...config} />
            <div ref={sticky1}>
                <div className={`mod-banner --bg-banner --${device}`}>
                    <div id="sticky1_mob" className="com-banner">
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
