/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React from 'react';
import { useFusionContext } from 'fusion:context';
import { isSubscribed } from '../../utils/contextHelper';

export default Component => {
    return props => {
        const ref = React.createRef();

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
