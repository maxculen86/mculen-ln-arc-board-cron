/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import NotaSnippet from '../../LN/nota/snippet/receta';
import NoticiaSnippet from '../../LN/nota/snippet/noticia';
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
        'LN-nota-noticia': NoticiaSnippet,
        'LN-nota-infografia': NoticiaSnippet,
        'LN-nota-storytelling': NoticiaSnippet,
        'LN-nota-storytelling-v2': NoticiaSnippet,
        'LN-nota-foto-al-100': NoticiaSnippet,
        'LN-nota-html-libre': NoticiaSnippet,
        'LN-acumulado': SnippetAcumulado,
        'LN-nota-video': NoticiaSnippet,
        'LN-Nota-Liveblog_Editorial': NoticiaSnippet,
        'LN-Nota-Video-100': NoticiaSnippet,
        'LN-Nota-Cards': NoticiaSnippet,
        'LN-Nota-Opinion': NoticiaSnippet
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

export default snippetIndex;
