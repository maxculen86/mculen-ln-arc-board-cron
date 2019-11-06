import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaSnippet from '../../LN/nota/snippet';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': NotaSnippet
    }
};

const snippetIndex = props => {
    const { arcSite, layout } = props;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const Snippet = sitio[layout];

    if (!Snippet) return null;
    return <Snippet {...props} />;
};

snippetIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default snippetIndex;
