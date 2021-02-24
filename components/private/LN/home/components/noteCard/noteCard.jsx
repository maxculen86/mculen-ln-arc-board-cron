import React, { useState, useEffect } from 'react';

import PropTypes from 'fusion:prop-types';

import ModArticle from '../../../../common/mod-article';
import get from '../../../../common/utils/get';
import {
    transform,
    getWithMedia,
    getWithSubhead,
    getLabel
} from './noteCardHelper';

const NoteCard = ({
    id: featureId,
    isAdmin,
    article: content,
    image,
    articleProps,
    customFields,
    outputType,
    promoItems
}) => {
    const [article, setArticle] = useState(
        transform(content, customFields, promoItems)
    );
    const [withMedia, setWithMedia] = useState(
        getWithMedia(customFields, articleProps, article)
    );
    const [withSubhead, setWithSubhead] = useState(
        getWithSubhead(articleProps, withMedia)
    );
    const [label, setLabel] = useState(
        getLabel(articleProps, customFields, withMedia)
    );

    useEffect(() => {
        setWithMedia(getWithMedia(customFields, articleProps, article));
    }, [article, articleProps, customFields]);

    useEffect(() => {
        setArticle(transform(content, customFields, promoItems));
        setLabel(getLabel(articleProps, customFields, withMedia));
        setWithSubhead(getWithSubhead(articleProps, withMedia));
    }, [articleProps, content, customFields, promoItems, withMedia]);

    return (
        (article && (
            <ModArticle
                articleData={article}
                withMedia={withMedia}
                link={get(article, 'website_url')}
                titleSize={get(articleProps, 'titleSize')}
                titleText={get(article, 'headlines.basic')}
                authors={get(article, 'marquesina')}
                subheadText={withSubhead && get(article, 'subheadlines.basic')}
                leadText={get(article, 'label.volanta.text')}
                outputType={outputType}
                isRenderAuthor={get(customFields, 'opinion', false)}
                label={label}
            />
        )) || <></>
    );
};

NoteCard.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    article: PropTypes.shape({
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
        }),
        display_date: PropTypes.string,
        marquesina: PropTypes.string,
        website_url: PropTypes.string
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

export default NoteCard;
