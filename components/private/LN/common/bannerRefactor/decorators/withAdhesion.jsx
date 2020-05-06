/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

const stickComponent = element => element.classList.add('--fixed');

const hide = element => {
    element.style.display = 'none';
};

const show = element => {
    element.style.display = 'block';
};

export default Component => {
    return withLoginData(props => {
        const scrollPosition = useRef(0);

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
        }, [ref]);

        if (subscription) return null;

        return outputType !== 'amp' ? <Component {...props} ref={ref} /> : null;
    });
};
