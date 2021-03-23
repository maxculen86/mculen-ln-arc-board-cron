/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';

const CajaManual = props => {
    const { children } = props;

    try {
        return children;
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);
