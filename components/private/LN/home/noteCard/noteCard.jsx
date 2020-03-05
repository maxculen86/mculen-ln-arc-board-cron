import React, { useState, useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import Image from './image';

import {
    getLead,
    getTitle,
    getSubhead,
    getAuthors,
    getImageId
} from './getData';

const NoteCard = ({ content, customFields }) => {
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

    if (!content) throw Error('No se encontró contenido');
    if (!(title && (imageId || subhead)))
        throw Error(
            'La nota debe contar con una imagen o description y con un título'
        );
    // TODO: separar en otro componente que solo renderee el artículo
    // TODO: agregar las urls correspondientes para los <a></a>
    return (
        <article className="mod-article w-100-mobile firma-autor">
            <div className="com-media">
                <a href="" title={title}>
                    <Image imageId={imageId} />
                </a>
            </div>
            <div className="com-description">
                <h1 className="com-title">
                    <a href="" title={title}>
                        {lead && <em className="com-volanta">{lead}</em>}
                        {title}
                    </a>
                </h1>

                {subhead && (
                    <p className="com-subhead">
                        <a href="" title={title}>
                            {subhead}
                        </a>
                    </p>
                )}
                {authors && (
                    <strong className="com-author">
                        <a href="/" title={authors}>
                            {authors}
                        </a>
                    </strong>
                )}
            </div>
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
