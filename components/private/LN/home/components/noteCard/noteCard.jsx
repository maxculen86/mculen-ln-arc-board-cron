import React, { useState, useEffect } from 'react';

import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';

import Article from './article';
import PageBuilderMessage from '../../common/components/pageBuilderMessage/pageBuilderMessage';

import { validateNoteCard } from './validation';
import {
    getLead,
    getTitle,
    getSubhead,
    getAuthors,
    getImageId,
    getUrl
} from './getData';

const NoteCard = ({
    id: featureId,
    isAdmin,
    content,
    customFields,
    isOpening,
    belongsTo
}) => {
    const [lead, setLead] = useState(getLead(customFields, content));
    const [title, setTitle] = useState(getTitle(customFields, content));
    const [imageId, setImageId] = useState(getImageId(customFields, content));
    const [authors, setAuthors] = useState(getAuthors(customFields, content));
    const [subhead, setSubhead] = useState(getSubhead(customFields, content));
    const [url, setUrl] = useState(getUrl(content));
    const [error, setError] = useState();

    useEffect(() => {
        setLead(getLead(customFields, content));
        setTitle(getTitle(customFields, content));
        setSubhead(getSubhead(customFields, content));
        setAuthors(getAuthors(customFields, content));
        setImageId(getImageId(customFields, content, belongsTo));
        setUrl(getUrl(content));
    }, [content, customFields, belongsTo]);

    useEffect(() => {
        setError(
            validateNoteCard(isOpening, belongsTo, title, imageId, subhead)
        );
    }, [belongsTo, imageId, isOpening, subhead, title]);

    // if (!content) throw Error('No se encontró contenido');

    if (isAdmin && !!error) {
        return <PageBuilderMessage type={error.type} message={error.message} />;
    }

    return (
        // <Static id={featureId}>
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
        // </Static>
    );
};

NoteCard.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
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
