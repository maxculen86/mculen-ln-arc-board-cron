/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React from 'react';
import { useFusionContext } from 'fusion:context';

import loginHelper from '../../utils/loginHelper';

export default Component => {
    return props => {
        const ref = React.createRef();
        const { isSubscribed } = loginHelper;

        const { outputType } = useFusionContext();

        return outputType !== 'amp' ? (
            <Component
                noShow
                subscription={isSubscribed()}
                {...props}
                ref={ref}
            />
        ) : null;
    };
};
