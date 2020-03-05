import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './image';
import {
    getLead,
    getTitle,
    getDescription,
    getAuthors,
    getImageId
} from './getData';

const NoteCard = ({ content, customFields }) => {
    const [lead, setLead] = useState(getLead(customFields, content));
    const [title, setTitle] = useState(getTitle(customFields, content));
    const [imageId, setImageId] = useState(getImageId(customFields, content));
    const [authors, setAuthors] = useState(getAuthors(customFields, content));
    const [description, setDescription] = useState(
        getDescription(customFields, content)
    );

    useEffect(() => {
        setLead(getLead(customFields, content));
        setTitle(getTitle(customFields, content));
        setDescription(getDescription(customFields, content));
        setAuthors(getAuthors(customFields, content));
        setImageId(getImageId(customFields, content));
    }, [content, customFields]);

    if (!content) throw Error('No se encontró contenido');
    if (!(title && (imageId || description)))
        throw Error(
            'La nota debe contar con una imagen o bajada y con un título'
        );
    return (
        <article className={`m art-02 ${lead ? 'lead' : ''}`}>
            {imageId && <Image imageId={imageId} />}
            <h2 className="content-titulo">
                {lead && <span className="lead">{`${lead} `}</span>}
                {content && customFields && title}
            </h2>
            {description && <p>{content && customFields && description}</p>}
            {authors && <h3>{content && customFields && authors}</h3>}
        </article>
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
        authors: PropTypes.string
    }).isRequired
};

export default NoteCard;
