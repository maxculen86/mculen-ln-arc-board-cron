/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import SnippetAutor from './autor';
import SnippetWiki from '../../nota/snippet/wiki';

const acumulados = {
    author: SnippetAutor,
    tags: SnippetWiki
};

function SnippetAcumulado(props) {
    const { globalContent } = props || {};
    const { node_type: nodeType } = globalContent || {};

    const Snippet = acumulados[nodeType];
    if (!Snippet) return null;

    return <Snippet {...props} />;
}

export default SnippetAcumulado;
