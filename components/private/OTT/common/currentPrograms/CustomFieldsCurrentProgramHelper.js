'use strict';

import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

const buildCurrentProgramsCustomFields = count => {
    const resp = {};
    for (let i = 1; i <= count; i++) {
        Object.assign(resp, {
            [`description${i}`]: PropTypes.string.tag({
                name: 'Descripcion',
                group: `Programa ${i}`
            }),
            [`href${i}`]: PropTypes.string.tag({
                name: 'Link al programa',
                group: `Programa ${i}`
            }),
            [`imgSrc${i}`]: PropTypes.string.tag({
                name: 'URL de la imagen',
                group: `Programa ${i}`
            })
        });
    }

    return resp;
};

const getCurrentProgramsCustomFields = (count, props) => {
    const resp = [];
    for (let i = 1; i <= count; i++) {
        resp.push({
            description: get(props, `customFields.description${i}`, null),
            href: get(props, `customFields.href${i}`, null),
            imgSrc: get(props, `customFields.imgSrc${i}`, null)
        });
    }

    return resp;
};

export { buildCurrentProgramsCustomFields, getCurrentProgramsCustomFields };
