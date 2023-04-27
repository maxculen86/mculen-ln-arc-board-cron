/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../snippet/snippetRender';
import MillisecondsToTime from '../utils/millisecondsToTime';
import get from '../utils/get';

const videoPlayerSnippet = ({ mediaData, minStream, parrafo, tituloNota }) => {
    const { content: primerParrafo = '' } = parrafo || {};
    const {
        promo_items: promoItems,
        created_date: createdDate = '',
        duration
    } = mediaData || {};

    if (!mediaData) return null;

    const notaTitle = tituloNota || '';
    const caption = get(promoItems, 'basic.caption', '');
    const epigrafe = get(mediaData, 'headlines.basic', '').trim() || caption;
    const basicUrl = get(promoItems, 'basic.url', '');
    const minStreamUrl = get(minStream, 'url', '');

    const data = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: notaTitle || 'LA NACION - Noticia',
        description: `${epigrafe || primerParrafo || parrafo}`,
        thumbnailUrl: [`${basicUrl}`],
        uploadDate: `${createdDate.replace(/T/g, ' ').replace(/Z/g, '') || ''}`,
        embedUrl: `${minStreamUrl}`,
        duration: `${MillisecondsToTime(duration)}`
    };

    return <SnippetRender data={data} />;
};

videoPlayerSnippet.propTypes = {
    mediaData: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                url: PropTypes.string,
                caption: PropTypes.string
            })
        }),
        created_date: PropTypes.string.isRequired,
        publish_date: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired
    }).isRequired,
    minStream: PropTypes.shape({
        height: PropTypes.number,
        url: PropTypes.string
    }).isRequired,
    tituloNota: PropTypes.string.isRequired,
    parrafo: PropTypes.oneOfType([
        PropTypes.shape({
            content: PropTypes.string
        }),
        PropTypes.string
    ]).isRequired
};

export default videoPlayerSnippet;
