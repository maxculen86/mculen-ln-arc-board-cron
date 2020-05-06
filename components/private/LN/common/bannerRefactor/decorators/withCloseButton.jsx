/* eslint-disable react/jsx-props-no-spreading */

import React, { useLayoutEffect } from 'react';

export default Component => {
    return props => {
        const ref = React.createRef();

        useLayoutEffect(() => {
            const closeButton = '<button class="icon-close"></button>';
            ref.current.appendChild(closeButton);
        }, [ref]);

        return <Component {...props} ref={ref} />;
    };
};
