/* eslint-disable no-param-reassign            */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-curly-spacing      */

import React from 'react';
import { useFusionContext } from 'fusion:context';

import withLoginData from '../../hocs/withLoginData';

export default Component => {
    return withLoginData(props => {
        const {
            loginData: { subscription }
        } = props;

        const { outputType } = useFusionContext();

        return outputType !== 'amp' ? (
            <Component noShow subscription={subscription} {...props} />
        ) : null;
    });
};
