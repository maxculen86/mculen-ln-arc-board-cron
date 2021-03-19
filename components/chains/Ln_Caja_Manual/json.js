/* eslint-disable react/prop-types */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import {
    cajaTemasCustomsFields,
    validateChainManual,
    getCommonPropsJson
} from '../../private/LN/common/utils/cajaTemasHelperApi';
//import CajaTema from '../../private/LN/common/cajaTema';

const CajaManual = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: {
            url,
            title,
            layout = '',
            backgroundColor,
            imageId,
            hideTitle,
            hideCaja
        },
        outputType,
        childProps,
        children,
        type
    } = props;

    //if (hideCaja) return {};

    try {
        const { notesQuantity } = getCommonPropsJson(props);
        //const error = validateChainManual(childProps, layout);

        let resp = [];
        let posicion = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i].length !== 0) {
                posicion = posicion + 1;
                const objnota = {
                    NotaId: children[i].NotaId,
                    Url: children[i].Url,
                    Tipo: 'Ln_Caja_Manual',
                    Posicion: posicion
                };
                resp.push(objnota);
            }
        }
        return resp;
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default Consumer(CajaManual);

/* const CajaManual = ({ children }) => {
    return 'Caja Manual';
};
export default CajaManual; */
