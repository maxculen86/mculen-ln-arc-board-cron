/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import NotaSnippet from '../../LN/nota/snippet/receta';
import SnippetNoticia from '../../LN/nota/snippet/noticia';
import LiveblogSnippet from '../../LN/nota/snippet/liveblog';
import SnippetAcumulado from '../../LN/acumulado/snippet';
import SnippetHowTo from '../../LN/nota/snippet/howTo';
import {
    LIVEBLOG,
    LIVEBLOG_EDITORIAL,
    HOWTO
} from '../utils/subtypes/subtypeHelper';

const config = {
    'la-nacion-ar': {
        'LN-nota-receta': NotaSnippet,
        'LN-nota-noticia': SnippetNoticia,
        'LN-nota-infografia': SnippetNoticia,
        'LN-nota-storytelling': SnippetNoticia,
        'LN-nota-storytelling-v2': SnippetNoticia,
        'LN-nota-foto-al-100': SnippetNoticia,
        'LN-nota-html-libre': SnippetNoticia,
        'LN-acumulado': SnippetAcumulado,
        'LN-nota-video': SnippetNoticia,
        'LN-Nota-Liveblog_Editorial': SnippetNoticia,
        'LN-Nota-Video-100': SnippetNoticia,
        'LN-Nota-Cards': SnippetNoticia,
        'LN-Nota-Opinion': SnippetNoticia
    }
};

function snippetIndex(props) {
    const { arcSite, layout, globalContent = {} } = props;
    const { subtype } = globalContent;
    const sitio = config[arcSite];
    if (!sitio) return null;

    const Snippet = sitio[layout];

    if (!Snippet) return null;
    return (
        <>
            <Snippet {...props} />
            {(subtype === LIVEBLOG || subtype === LIVEBLOG_EDITORIAL) && (
                <LiveblogSnippet {...props} />
            )}
            {subtype === HOWTO && <SnippetHowTo {...props} />}
        </>
    );
}

snippetIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string
    }).isRequired
};

export default snippetIndex;
