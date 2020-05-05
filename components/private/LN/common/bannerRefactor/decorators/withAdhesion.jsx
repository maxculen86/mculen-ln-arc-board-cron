/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

export default Component => {
    return React.memo(props => {
        const scrollPosition = useRef(0);

        const ref = React.createRef();
        const fusionContext = useFusionContext();

        /* const {
            loginData: { subscription }
        } = props; */

        const { outputType } = fusionContext;

        useLayoutEffect(() => {
            const handleScroll = () => {
                const windowY = window.scrollY;
                if (windowY < scrollPosition.current) {
                    scrollPosition.current = windowY;
                    console.log('going up');
                } else if (windowY >= scrollPosition.current) {
                    scrollPosition.current = windowY;
                    console.log('going down');
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        return outputType !== 'amp' ? <Component {...props} ref={ref} /> : null;
    });
};
