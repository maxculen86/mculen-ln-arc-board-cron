/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

const stickComponent = element => element.classList.add('--fixed');

const hide = element => {
    element.style.display = 'none';
};

const show = element => {
    element.style.display = 'flex';
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

        useEffect(() => {
            /* const button = document.createElement('button');
            button.classList.add('icon-close');
            button.addEventListener('click', () => ref.current.remove());
            ref.current.appendChild(button); */
            /* const img = document.createElement('img');
            img.src =
                'https://i.e-planning.net/esb/4/1/3fb8/ea7d639f35554c9b/close.png';
            img.style.width = '20px';
            img.style.position = 'absolute';
            img.style.right = '0px';
            img.style.top = '0px';
            img.style.left = 'auto';
            img.style.cursor = 'pointer';
            ref.current.querySelector('.com-banner').appendChild(img); */
            //return () => ref.current ? ref.current.removeChild(ref.current.firstChild) : {};
        }, [ref]);

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
