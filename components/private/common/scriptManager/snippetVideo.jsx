/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import SnippetRender from '../snippet/snippetRender';
import MillisecondsToTime from '../utils/millisecondsToTime';
import get from '../utils/get';

const videoPlayerSnippet = ({ mediaData, minStream, parrafo, tituloNota }) => {
    const { content: primerParrafo } = parrafo || {};
    const {
        promo_items: promoItems,
        created_date: createdDate = '',
        duration
    } = mediaData || {};
    const caption = get(promoItems, 'basic.caption', null);
    const epigrafe = get(mediaData, 'headlines.basic', caption);

    const data = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${tituloNota.replace(/"/g, '\\"') || 'LA NACION - Noticia'}`,
        description: `${epigrafe || primerParrafo}`,
        thumbnailUrl: [`${promoItems.basic.url}`],
        uploadDate: `${createdDate.replace(/T/g, ' ').replace(/Z/g, '') || ''}`,
        embedUrl: `${minStream.url}`,
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
    parrafo: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default videoPlayerSnippet;
