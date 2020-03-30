import React, { useState, useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Article from './article';

import {
    getLead,
    getTitle,
    getSubhead,
    getAuthors,
    getImageId
} from './getData';

const NoteCard = ({ content, customFields, isOpening }) => {
    const [lead, setLead] = useState(getLead(customFields, content));
    const [title, setTitle] = useState(getTitle(customFields, content));
    const [imageId, setImageId] = useState(getImageId(customFields, content));
    const [authors, setAuthors] = useState(getAuthors(customFields, content));
    const [subhead, setSubhead] = useState(getSubhead(customFields, content));

    useEffect(() => {
        setLead(getLead(customFields, content));
        setTitle(getTitle(customFields, content));
        setSubhead(getSubhead(customFields, content));
        setAuthors(getAuthors(customFields, content));
        setImageId(getImageId(customFields, content));
    }, [content, customFields]);

    if (isOpening && (!title || !imageId))
        throw Error(
            'El título e imagen son obligatorios para un artículo de apertura'
        );

    // if (!content) throw Error('No se encontró contenido');

    if (!(title && (imageId || subhead))) {
        throw Error(
            'La nota debe contar con una imagen o bajada y con un título'
        );
    }
    // TODO: agregar las urls correspondientes para los <a></a>
    return (
        <Article
            title={title}
            imageId={imageId}
            lead={lead}
            subhead={subhead}
            authors={authors}
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
        isOpening: PropTypes.bool
    }),
    isOpening: PropTypes.bool
};

NoteCard.defaultProps = {
    customFields: {
        imageId: undefined,
        lead: undefined,
        title: undefined,
        description: undefined,
        authors: undefined
    },
    isOpening: undefined
};

export default Consumer(NoteCard);
