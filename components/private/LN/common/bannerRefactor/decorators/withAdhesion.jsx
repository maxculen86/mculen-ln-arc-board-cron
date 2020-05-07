/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef, useState } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

const stickComponent = element => {
    if (!element.classList.contains('--fixed'))
        element.classList.add('--fixed');
};

const hide = element => {
    if (element) element.style.display = 'none';
};

const show = element => {
    if (element) element.style.display = 'flex';
};

export default Component => {
    return withLoginData(props => {
        const scrollPosition = useRef(0);
        const [visible, setVisible] = useState(false);
        const ref = React.createRef();
        const fusionContext = useFusionContext();

        const {
            loginData: { subscription }
        } = props;

        const { outputType } = fusionContext;

        useLayoutEffect(() => {
            stickComponent(ref.current);

            const onScroll = () => {
                const windowY = window.scrollY;

                if (document.querySelector('#megatop_dsk')) {
                    const header = document.querySelector('#header');
                    const bounds = header.getBoundingClientRect();
                    if (bounds.top <= 0) {
                        if (!visible) setVisible(true);
                    }
                } else if (!visible) setVisible(true);

                if (windowY < scrollPosition.current) {
                    scrollPosition.current = windowY;
                    hide(ref.current);
                } else if (windowY >= scrollPosition.current) {
                    scrollPosition.current = windowY;
                    show(ref.current);
                }
            };

            window.addEventListener('scroll', onScroll);

            return () => window.removeEventListener('scroll', onScroll);
        }, [ref, visible]);

        if (subscription) return null;

        return outputType !== 'amp' ? <Component {...props} ref={ref} /> : null;
    });
};
