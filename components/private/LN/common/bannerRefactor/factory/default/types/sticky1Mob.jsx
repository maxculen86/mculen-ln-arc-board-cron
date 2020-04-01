/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props  */
/* eslint-disable react/forbid-prop-types      */

import React, { useRef, useLayoutEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Ads from '../../../ads';

import { slotsConfig } from '../../../config';

import Sticky2Mob from './sticky2Mob';

const Sticky1Mob = props => {
    const scrollPos = useRef(0);

    const sticky1 = useRef();
    const sticky2 = useRef();

    useLayoutEffect(() => {
        const handleScroll = () => {
            const windowY = window.scrollY;
            if (windowY < scrollPos.current) {
                // Scrolls up
                scrollPos.current = windowY;
                const bounding = sticky1.current.getBoundingClientRect();
                if (
                    bounding.top >= 0 &&
                    bounding.bottom <=
                        (window.innerHeight ||
                            document.documentElement.clientHeight)
                ) {
                    // If sticky1 is within the viewport
                    sticky2.current.classList.add('hlp-none');
                }
            } else if (windowY >= scrollPos.current) {
                // Scrolls down
                scrollPos.current = windowY;
                const bounding = sticky1.current.getBoundingClientRect();
                if (
                    !(
                        bounding.top >= 0 &&
                        bounding.bottom <=
                            (window.innerHeight ||
                                document.documentElement.clientHeight)
                    )
                ) {
                    // If sticky1 is out of the viewport
                    sticky1.current.classList.add('hlp-none');
                    sticky2.current.classList.remove('hlp-none');
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
        device,
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
            <div ref={sticky2} className="hlp-none">
                <Sticky2Mob {...config} />
            </div>
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
