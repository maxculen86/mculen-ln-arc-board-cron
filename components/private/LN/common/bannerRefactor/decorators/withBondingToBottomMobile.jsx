/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React, { useLayoutEffect, useRef } from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

/* const glue = element => {
    if (!element.classList.contains('--fixed'))
        element.classList.add('--fixed');
}; */

const hide = element => {
    /* if (element) element.style.display = 'none'; */
    /* if (element) {
        if (!element.classList.contains('hlp-none'))
            element.classList.add('hlp-none');
    } */
    if (element) element.style.visibility = 'hidden';
};

const show = element => {
    /* if (element) element.style.display = 'flex'; */
    /* if (element) {
        if (element.classList.contains('hlp-none'))
            element.classList.remove('hlp-none');
    } */
    if (element) element.style.visibility = 'visible';
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
            // glue(ref.current);
            hide(ref.current);
            const onScroll = () => {
                const windowY = window.scrollY;
                show(ref.current);
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

        // if (subscription) return null;

        return outputType !== 'amp' ? (
            <Component subscription={subscription} {...props} ref={ref} />
        ) : null;
    });
};
