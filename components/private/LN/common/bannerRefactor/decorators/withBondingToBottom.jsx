/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

const glue = element => {
    if (!element.classList.contains('--fixed'))
        element.classList.add('--fixed');
};

const hide = element => {
    if (element.classList.contains('--fixed')) {
        element.classList.remove('--fixed');
    }

    if (!element.classList.contains('hlp-none')) {
        element.classList.add('hlp-none');
    }
};

const show = element => {
    if (!element.classList.contains('--fixed')) {
        element.classList.add('--fixed');
    }

    if (element.classList.contains('hlp-none')) {
        element.classList.remove('hlp-none');
    }
};

export default Component => {
    return withLoginData(props => {
        const scrollPosition = useRef(0);
        const ref = React.createRef();
        const fusionContext = useFusionContext();
        const headerRef = useRef(document.querySelector('#header') || null);
        const megatopRef = useRef(
            document.querySelector('#megatop_dsk') || null
        );

        const {
            loginData: { subscription }
        } = props;

        const { outputType } = fusionContext;

        useLayoutEffect(() => {
            glue(ref.current);
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

        if (subscription) return null;

        return outputType !== 'amp' ? <Component {...props} ref={ref} /> : null;
    });
};
