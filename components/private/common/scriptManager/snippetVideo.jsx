/* eslint-disable react/no-danger */
import React from 'react';
import SnippetRender from '../snippet/snippetRender';
import MillisecondsToTime from '../utils/millisecondsToTime';
import get from '../utils/get';
import {
    formatJwPlayerDate,
    getAlternativeDescription
} from '../videoPlayerJw/utils/helperJw';

function videoPlayerSnippet({ mediaData, minStream, paragraph, noteTitle }) {
    let firstParagraph = '';

    if (
        typeof paragraph === 'object' &&
        paragraph !== null &&
        typeof paragraph.content === 'string'
    ) {
        firstParagraph = paragraph.content;
    } else if (typeof paragraph === 'string') {
        firstParagraph = paragraph;
    }

    const {
        promo_items: promoItems,
        created_date: createdDate = '',
        duration = '',
        image = '',
        pubdate
    } = mediaData || {};

    if (!mediaData) return null;

    const caption = get(promoItems, 'basic.caption', '');
    const epigraph = get(mediaData, 'headlines.basic', '').trim() || caption;
    const basicUrl = get(promoItems, 'basic.url') || image;
    const minStreamUrl = get(minStream, 'url', '');
    const uploadDate = createdDate || formatJwPlayerDate(pubdate) || '';
    const description =
        epigraph ||
        firstParagraph.trim() ||
        getAlternativeDescription(uploadDate, noteTitle?.trim());

    const data = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: noteTitle?.trim() || 'LA NACION - Noticia',
        description,
        thumbnailUrl: [`${basicUrl}`],
        uploadDate,
        embedUrl: `${minStreamUrl}`,
        duration: `${MillisecondsToTime(duration)}`
    };

    return <SnippetRender data={data} />;
}

export default videoPlayerSnippet;
