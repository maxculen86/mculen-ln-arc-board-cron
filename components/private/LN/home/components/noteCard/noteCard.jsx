import React, { useState, useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Article from './article';

import {
    getLead,
    getTitle,
    getSubhead,
    getAuthors,
    getImageId,
    getUrl
} from './getData';

const NoteCard = ({ content, customFields, isOpening, belongsTo }) => {
    const [lead, setLead] = useState(getLead(customFields, content));
    const [title, setTitle] = useState(getTitle(customFields, content));
    const [imageId, setImageId] = useState(getImageId(customFields, content));
    const [authors, setAuthors] = useState(getAuthors(customFields, content));
    const [subhead, setSubhead] = useState(getSubhead(customFields, content));
    const [url, setUrl] = useState(getSubhead(customFields, content));

    useEffect(() => {
        setLead(getLead(customFields, content));
        setTitle(getTitle(customFields, content));
        setSubhead(getSubhead(customFields, content));
        setAuthors(getAuthors(customFields, content));
        setImageId(getImageId(customFields, content, belongsTo));
        setUrl(getUrl(content));
    }, [belongsTo, content, customFields, subhead]);

    // if (!content) throw Error('No se encontró contenido');

    if (isOpening && belongsTo === 'apertura' && (!title || !imageId))
        throw Error(
            'El título e imagen son obligatorios para un artículo de apertura'
        );

    if (!(title && (imageId || subhead))) {
        throw Error(
            'La nota debe contar con una imagen o bajada y con un título'
        );
    }
    // TODO: agregar las urls correspondientes para los <a></a>
    return (
        <Article
            title={title}
            imageId={
                belongsTo === 'caja tema' &&
                subhead &&
                (imageId || imageId === undefined)
                    ? null
                    : imageId
            }
            lead={lead}
            subhead={subhead}
            authors={authors}
            url={url}
        />
    );
};

NoteCard.propTypes = {
    content: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }).isRequired,
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        promo_items: PropTypes.shape({
            basic: PropTypes.shape({
                resized_urls: PropTypes.array
            })
        }),
        credits: PropTypes.shape({
            by: PropTypes.array
        })
    }).isRequired,
    customFields: PropTypes.shape({
        imageId: PropTypes.string,
        lead: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.string,
        isOpening: PropTypes.bool,
        canonical_url: PropTypes.string
    }),
    isOpening: PropTypes.bool,
    belongsTo: PropTypes.string
};

NoteCard.defaultProps = {
    customFields: {
        imageId: undefined,
        lead: undefined,
        title: undefined,
        description: undefined,
        authors: undefined
    },
    isOpening: undefined,
    belongsTo: undefined
};

export default Consumer(NoteCard);
