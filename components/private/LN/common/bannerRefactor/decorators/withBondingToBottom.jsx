/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';
import { isSubscribed } from '../../utils/contextHelper';

const hide = element => {
    if (element) element.style.visibility = 'hidden';
};

const show = element => {
    if (element) element.style.visibility = 'visible';
};

export default Component => {
    return props => {
        const scrollPosition = useRef(0);
        const ref = React.createRef();
        const fusionContext = useFusionContext();
        const headerRef = useRef(document.querySelector('#header') || null);
        const megatopRef = useRef(
            document.querySelector('#megatop_dsk') || null
        );

        const { outputType } = fusionContext;

        useLayoutEffect(() => {
            hide(ref.current);
            const onScroll = () => {
                const windowY = window.scrollY;

                if (headerRef.current) {
                    const bounds = headerRef.current.getBoundingClientRect();
                    if (megatopRef.current) {
                        if (bounds.top <= 0) {
                            show(ref.current);
                        }
                    }

                    if (windowY < scrollPosition.current) {
                        scrollPosition.current = windowY;
                    } else if (windowY >= scrollPosition.current) {
                        scrollPosition.current = windowY;
                        if (bounds.top <= 0) {
                            show(ref.current);
                        }
                    }
                }
            };

            window.addEventListener('scroll', onScroll);

            return () => window.removeEventListener('scroll', onScroll);
        }, [ref]);

        // if (subscription) return null;

        return outputType !== 'amp' ? (
            <Component subscription={isSubscribed()} {...props} ref={ref} />
        ) : null;
    };
};
