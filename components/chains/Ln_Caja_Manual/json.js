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

        const resp = [];
        return children;
        //resp.push(children);
        //return resp;

        for (let i = 0; i < children.length; i++) {
            if (children[i] && children[i].length !== 0) {
                const objnota = {
                    id: children[i].NotaId,
                    url: children[i].Url
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
