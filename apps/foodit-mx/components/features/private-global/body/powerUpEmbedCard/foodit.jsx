import React, { useMemo } from 'react';
import CommonCardFoodit from '../../../foodit-global/common/CommonCardFoodit/foodit';
import {
    getFooditAuthor,
    getHighestPriorityTag
} from '../../../foodit-global/common/utils/notaFooditHelper';
import { getShortestImage } from '../../../../private/LN/common/utils/mediaHelper';

function PowerUpEmbedCard({ data = {} }) {
    if (!data) return null;

    const {
        _id: dataId = '',
        embed: {
            config: {
                noteId = '',
                title = '',
                url = '',
                preparationTime = 1,
                image = '',
                altTextImage = '',
                hasVideo = {},
                arcData = {},
                sections = [],
                resizedImages = []
            } = {}
        } = {}
    } = data;

    const {
        _id: arcDataId = '',
        headlines: { basic: arcHeadline = '' } = {},
        canonical_url: arcCanonicalUrl = '',
        promo_items: {
            basic: { url: promoImageUrl = '', alt_text: promoAltText = '' } = {}
        } = {}
    } = arcData;

    const itemId = noteId || arcDataId || dataId;
    const itemHeadline = title || arcHeadline;
    const itemLinkUrl = url || arcCanonicalUrl;
    const itemPreparationTime = preparationTime;
    const itemImage = image || promoImageUrl;
    const itemAltText = altTextImage || promoAltText || itemHeadline;
    const itemHasVideo = Boolean(hasVideo);

    let itemAuthorText = '';
    try {
        itemAuthorText = getFooditAuthor(arcData) || '';
    } catch (error) {
        console.warn('Error getting author from arcData:', error);
    }

    const validSections = Array.isArray(sections) ? sections : [];
    const priorityTag = useMemo(() => {
        try {
            return validSections.length > 0
                ? getHighestPriorityTag(validSections)
                : null;
        } catch (error) {
            console.warn('Error getting priority tag:', error);
            return null;
        }
    }, [validSections]);

    const resizedUrl = useMemo(() => {
        try {
            if (Array.isArray(resizedImages) && resizedImages.length > 0) {
                const { resizedUrl: imageUrl = '' } =
                    getShortestImage(resizedImages) || {};
                return imageUrl;
            }
            return '';
        } catch (error) {
            console.warn('Error getting resized image:', error);
            return '';
        }
    }, [resizedImages]);

    if (!itemId || !itemHeadline) return null;

    return (
        <div className="w-100">
            <CommonCardFoodit
                articleId={itemId}
                linksProps={{
                    href: itemLinkUrl,
                    title: itemHeadline
                }}
                title={itemHeadline}
                variant="recipe"
                container="link"
                size="small"
                tag={priorityTag}
                src={resizedUrl || itemImage}
                alt={itemAltText}
                author={itemAuthorText}
                showTime={Boolean(itemPreparationTime)}
                time={String(itemPreparationTime)}
                contentCode="receta"
                mediaVariant="image"
                isOpening={false}
                loading="lazy"
                fetchPriority="low"
                hasVideo={itemHasVideo}
            />
        </div>
    );
}

export default PowerUpEmbedCard;
