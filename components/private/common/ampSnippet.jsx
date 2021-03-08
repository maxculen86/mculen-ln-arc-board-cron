/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';

import NoticiaSnippet from '../LN/nota/snippet/noticia';
import RecetaSnippet from '../LN/nota/snippet/receta';

const AmpSnippet = props => {
    const { arcSite, layout } = props;

    const configuration = {
        'la-nacion-ar': {
            'LN-nota-receta': RecetaSnippet,
            'LN-nota-noticia': NoticiaSnippet,
            'LN-nota-infografia': NoticiaSnippet,
            'LN-nota-storytelling': NoticiaSnippet,
            'LN-nota-foto-al-100': NoticiaSnippet,
            'LN-nota-html-libre': NoticiaSnippet
        }
    };

    const site = configuration[arcSite];
    const Snippet = site[layout];

    if (!Snippet) return null;
    return <Snippet {...props} />;
};

AmpSnippet.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired
};

export default AmpSnippet;
