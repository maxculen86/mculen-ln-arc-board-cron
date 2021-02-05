import React from 'react';
import PropTypes from 'fusion:prop-types';

import NotaSnippet from '../../LN/nota/snippet/receta';
import NoticiaSnippet from '../../LN/nota/snippet/noticia';
import SnippetAcumulado from '../../LN/acumulado/snippet';

const config = {
    OTT: {},
    'la-nacion-ar': {
        'LN-nota-receta': NotaSnippet,
        'LN-nota-noticia': NoticiaSnippet,
        'LN-nota-infografia': NoticiaSnippet,
        'LN-nota-storytelling': NoticiaSnippet,
        'LN-nota-foto-al-100': NoticiaSnippet,
        'LN-nota-html-libre': NoticiaSnippet,
        'LN-acumulado': SnippetAcumulado
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
