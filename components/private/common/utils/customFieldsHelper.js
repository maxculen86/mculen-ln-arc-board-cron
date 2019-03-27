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
            [`homeSubheader${i}`]: PropTypes.string.tag({ 
                name: 'Bajada en Home',
                group: `Nota ${i}` 
            }),
            [`homeTeaser${i}`]: PropTypes.string.tag({ 
                name: 'Volanta en Home',
                group: `Nota ${i}` 
            }),
            [`homeAuthor${i}`]: PropTypes.string.tag({ 
                name: 'Autor en Home',
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
            bajada: get(props, `customFields.homeSubheader${i}`, null),
            volanta: get(props, `customFields.homeTeaser${i}`, null),
            autor: get(props, `customFields.homeAuthor${i}`, null),
            destacarMarca: get(props, `customFields.articleMark${i}`, null),
        })
    }

    return resp;
}

export {
    buildArticlesCustomFields,
    getArticlesCustomFields
}