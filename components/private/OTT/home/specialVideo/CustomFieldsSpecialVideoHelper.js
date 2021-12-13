'use strict';

import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

const buildSpecialVideoCustomFields = count => {
    const resp = {};
    for (let i = 1; i <= count; i++) {
        Object.assign(resp, {
            [`idVideo${i}`]: PropTypes.string.tag({
                idVideo: 'Id Video',
                group: `Video ${i}`
            })
        });
    }

    return resp;
};

const getSpecialVideoCustomFields = (count, props) => {
    const resp = [];
    for (let i = 1; i <= count; i++) {
        resp.push({
            idVideo: get(props, `customFields.idVideo${i}`, null)
        });
    }

    return resp;
};

export { buildSpecialVideoCustomFields, getSpecialVideoCustomFields };
