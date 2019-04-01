'use strict'

import PropTypes from 'prop-types';
import get from 'lodash.get';


const buildHeaderCustomFields = (count) => {
    let resp = {};
    for (let i = 1; i <= count; i++) {
        Object.assign(resp, {
            [`description${i}`]: PropTypes.string.tag({
                name: 'Descripcion',
                group: `Link ${i}`
            }),
            [`href${i}`]: PropTypes.string.tag({
                name: 'Link al programa',
                group: `Link ${i}`
            })
        })
    }

    return resp;
}

const getHeaderCustomFields = (count, props) => {
    let resp = [];
    for (let i = 1; i <= count; i++) {
        resp.push({
            description: get(props, `customFields.description${i}`, null),
            href: get(props, `customFields.href${i}`, null)
        })
    }

    return resp;
}

export {
    buildHeaderCustomFields,
    getHeaderCustomFields
}