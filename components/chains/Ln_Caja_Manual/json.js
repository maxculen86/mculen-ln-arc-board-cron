/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';

const CajaManual = props => {
    const { customFields, children } = props;

    try {
        return {
            information: customFields,
            articles: children
        };
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);
