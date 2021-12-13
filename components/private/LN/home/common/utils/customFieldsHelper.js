'use strict';

import PropTypes from 'fusion:prop-types';
import get from 'lodash.get';

const buildArticlesCustomFields = count => {
    const resp = {};
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
            [`articleMark${i}`]: PropTypes.oneOf([
                '<Ninguna>',
                'Video',
                'Infografía',
                'Audio',
                'Podcast',
                'Galería'
            ]).tag({
                name: 'Chapita',
                group: `Nota ${i}`,
                defaultValue: '<Ninguna>'
            })
        });
    }

    return resp;
};

const getArticlesCustomFields = (count, props) => {
    const resp = [];
    for (let i = 1; i <= count; i++) {
        resp.push({
            id: get(props, `customFields.articleId${i}`, null),
            url: get(props, `customFields.articleUrl${i}`, null),
            isExclusive: get(props, `customFields.isExclusive${i}`, null),
            homeTitle: get(props, `customFields.homeTitle${i}`, null),
            subheader: get(props, `customFields.subheader${i}`, null),
            teaser: get(props, `customFields.teaser${i}`, null),
            marquee: get(props, `customFields.marquee${i}`, null),
            articleMark: get(props, `customFields.articleMark${i}`, null)
        });
    }

    return resp;
};

const getGenericBoxCustomFields = articlesCount => {
    const generalCustomFields = {
        hidden: PropTypes.bool.tag({
            name: 'Ocultar'
        })
    };
    const articlesCustomFields = buildArticlesCustomFields(articlesCount);
    return PropTypes.shape(
        Object.assign(generalCustomFields, articlesCustomFields)
    );
};

export {
    buildArticlesCustomFields,
    getArticlesCustomFields,
    getGenericBoxCustomFields
};
