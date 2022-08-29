/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import NotaSnippet from '../../LN/nota/snippet/receta';
import NoticiaSnippet from '../../LN/nota/snippet/noticia';
import LiveblogSnippet from '../../LN/nota/snippet/liveblog';
import PaywallSnippet from '../../LN/nota/snippet/paywall';
import SnippetAcumulado from '../../LN/acumulado/snippet';
import ProgramSnippet from '../../OTT/programa/snippet/programSnippet';
import { LIVEBLOG } from '../utils/subtypes/subtypeHelper';

const config = {
    ott: {
        'OTT-ficha': ProgramSnippet
    },
    'la-nacion-ar': {
        'LN-nota-receta': NotaSnippet,
        'LN-nota-noticia': NoticiaSnippet,
        'LN-nota-infografia': NoticiaSnippet,
        'LN-nota-storytelling': NoticiaSnippet,
        'LN-nota-foto-al-100': NoticiaSnippet,
        'LN-nota-html-libre': NoticiaSnippet,
        'LN-acumulado': SnippetAcumulado,
        'LN-nota-video': NoticiaSnippet
    }
};

const snippetIndex = props => {
    const { arcSite, layout, globalContent = {} } = props;
    const { subtype, type } = globalContent;

    const sitio = config[arcSite];
    if (!sitio) return null;

    const Snippet = sitio[layout];

    if (!Snippet) return null;
    return (
        <>
            <Snippet {...props} />
            {subtype === LIVEBLOG && <LiveblogSnippet {...props} />}
            {type === 'story' && <PaywallSnippet {...props} />}
        </>
    );
};

snippetIndex.propTypes = {
    arcSite: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string
    }).isRequired
};

export default snippetIndex;
