/* eslint-disable react/prop-types */

import Consumer from 'fusion:consumer';

const CajaManual = props => {
    const {
        customFields: { hideCaja, layout },
        children
    } = props;

    try {
        return {
            id_caja: null,
            visible: hideCaja || false,
            digramacion_caja: layout,
            notas: children
        };
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);
