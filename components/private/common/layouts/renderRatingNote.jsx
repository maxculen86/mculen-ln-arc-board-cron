import React from 'react';
import { useAppContext } from 'fusion:context';
import RatingBadge from '../../../features/LN/common/ratingBadge/default';
import { NOTICIA } from '../utils/subtypes/subtypeHelper';

function RenderRatingNote() {
    const { globalContent } = useAppContext();
    const { subtype, content_elements: contentElements } = globalContent || {};

    const ratingElement = contentElements.find(
        element => element.type === 'numeric_rating'
    );

    const numericRating = ratingElement?.numeric_rating;
    if (subtype !== NOTICIA || !ratingElement) return null;

    return (
        <RatingBadge
            size={20}
            ratingProps={{ defaultValue: numericRating }}
            containerProps={{ className: 'mt-12 mb-16' }}
        />
    );
}

export default RenderRatingNote;
