import React from 'react';
import PropTypes from 'prop-types';
import SnippetRender from '../../../../../private/common/snippet/snippetRender';
import get from '../../../../../private/common/utils/get';
import getPageType from './_helper';

export default function SchemaPageview({ globalContent, layout }) {
    const pagetype = getPageType(layout, get(globalContent, '_id'));

    const schema = {
        pagetype: getPageType(layout, get(globalContent, '_id')),
        ...(pagetype === 'acumulado' && {
            metarefresh: 'N/A'
        }),
        ...(pagetype === 'nota' && {
            valor: get(globalContent, 'content_restrictions.content_code'),
            subtype: get(globalContent, 'subtype'),
            nota_id: get(globalContent, '_id'),
            isListenable: get(globalContent, 'isListenable', false)
                ? 'si'
                : 'no'
        })
    };

    return <SnippetRender data={schema} id="pageview" />;
}

SchemaPageview.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        subtype: PropTypes.string,
        isListenable: PropTypes.bool,
        content_restrictions: PropTypes.shape({
            content_code: PropTypes.string
        })
    }).isRequired,
    layout: PropTypes.string.isRequired
};
