import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getViewport } from '../../../common/utils/homeHelper';

import ModArticle from '../../../../common/mod-article';
import get from '../../../../common/utils/get';
import {
    transform,
    getWithMedia,
    getWithSubhead,
    getLabel,
    getIsRenderAutor
} from './noteCardHelper';

const NoteCard = ({
    id: featureId,
    isAdmin,
    article: content,
    image,
    articleProps,
    customFields,
    outputType,
    promoItems,
    index,
    boxPosition,
    layout,
    isInHomeAperturaOrBomba,
    videoBackground,
    isPowa
}) => {
    const [article, setArticle] = useState(
        transform(content, customFields, promoItems)
    );
    const [withMedia, setWithMedia] = useState(
        getWithMedia(customFields, articleProps, article)
    );
    const [withSubhead, setWithSubhead] = useState(
        getWithSubhead(articleProps, withMedia, customFields)
    );
    const [label, setLabel] = useState(
        getLabel(content, customFields, withMedia)
    );
    const [isRenderAutor, setIsRenderAutor] = useState(
        getIsRenderAutor(customFields, layout)
    );
    const { device } = getViewport();

    useEffect(() => {
        setWithMedia(getWithMedia(customFields, articleProps, article));
    }, [article, articleProps, customFields]);

    useEffect(() => {
        setArticle(transform(content, customFields, promoItems));
        setLabel(getLabel(content, customFields, withMedia));
        setWithSubhead(getWithSubhead(articleProps, withMedia, customFields));
        setIsRenderAutor(getIsRenderAutor(customFields, layout));
    }, [articleProps, content, customFields, promoItems, withMedia, layout]);

    return (
        (article && (
            <ModArticle
                articleData={article}
                withMedia={withMedia}
                link={get(article, 'website_url')}
                titleSize={
                    (!withMedia && get(articleProps, 'titleSizeNoMedia')) ||
                    get(articleProps, 'titleSize')
                }
                titleText={get(article, 'headlines.basic')}
                titleTag={
                    (isInHomeAperturaOrBomba &&
                        get(articleProps, 'titleTagApertura')) ||
                    get(articleProps, 'titleTag', 'h2')
                }
                authors={get(article, 'marquesina')}
                subheadText={
                    get(articleProps, 'skipSubhead', false)
                        ? false
                        : withSubhead && get(article, 'subheadlines.basic')
                }
                subheadTag={
                    (isInHomeAperturaOrBomba &&
                        get(articleProps, 'subheadTagApertura')) ||
                    get(articleProps, 'subheadTag', 'h3')
                }
                leadText={get(article, 'label.volanta.text')}
                outputType={outputType}
                isRenderAuthor={
                    get(articleProps, 'skipRenderAuthor', false)
                        ? false
                        : isRenderAutor
                }
                label={!get(customFields, 'html') && label}
                anexo={
                    get(articleProps, 'skipHtml', false)
                        ? false
                        : !isRenderAutor && get(customFields, 'html')
                }
                boxPosition={boxPosition}
                artPosition={`0${Number(index) + 1}`.slice(-2)}
                videoBackground={videoBackground}
                isPowa={isPowa}
                device={device}
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
