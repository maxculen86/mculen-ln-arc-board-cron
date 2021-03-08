import React from 'react';
import PropTypes from 'fusion:prop-types';

import SnippetAutor from './autor';

const acumulados = {
    author: SnippetAutor
};

const SnippetAcumulado = props => {
    const {
        globalContent: { node_type: nodeType }
    } = props || {};

    const Snippet = acumulados[nodeType];
    if (!Snippet) return null;

    return <Snippet {...props} />;
};

SnippetAcumulado.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default SnippetAcumulado;
