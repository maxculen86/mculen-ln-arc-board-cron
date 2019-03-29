'use strict'

import PropTypes from 'prop-types';
import get from 'lodash.get';

const buildArticlesCustomFields = (count) => {
    let resp = {};
    for (let i = 1; i <= count; i++) {
        Object.assign(resp, {
            [`articleId${i}`]: PropTypes.string.tag({ 
                name: 'Id',
                group: `Nota ${i}` 
            }),
            [`articleUrl${i}`]: PropTypes.string.tag({ 
                name: 'URL',
                group: `Nota ${i}` 
            }),
            [`isExclusive${i}`]: PropTypes.bool.tag({ 
                name: 'Sólo en LN',
                group: `Nota ${i}` 
            }),
            [`homeTitle${i}`]: PropTypes.string.tag({ 
                name: 'Título en Home',
                group: `Nota ${i}`
            }),
            [`subheader${i}`]: PropTypes.string.tag({ 
                name: 'Bajada',
                group: `Nota ${i}` 
            }),
            [`teaser${i}`]: PropTypes.string.tag({ 
                name: 'Volanta',
                group: `Nota ${i}` 
            }),
            [`marquee${i}`]: PropTypes.string.tag({ 
                name: 'Marquesina',
                group: `Nota ${i}`
            }),
            [`articleMark${i}`]: PropTypes.oneOf(
                ['<Ninguna>','Video', 'Infografía', 'Audio', 'Podcast', 'Galería']
            ).tag({
                name: 'Chapita',
                group: `Nota ${i}`,
                defaultValue: '<Ninguna>'
            })
        })
    }

    return resp;
}

const getArticlesCustomFields = (count, props) => {
    let resp = [];
    for (let i = 1; i <= count; i++) {
        resp.push({
            id: get(props, `customFields.articleId${i}`, null),
            url: get(props, `customFields.articleUrl${i}`, null),
            exclusivo: get(props, `customFields.isExclusive${i}`, null),
            titulo: get(props, `customFields.homeTitle${i}`, null),
            bajada: get(props, `customFields.subheader${i}`, null),
            volanta: get(props, `customFields.teaser${i}`, null),
            marquesina: get(props, `customFields.marquee${i}`, null),
            destacarMarca: get(props, `customFields.articleMark${i}`, null),
        })
    }

    return resp;
}

export {
    buildArticlesCustomFields,
    getArticlesCustomFields
}