import React from 'react';
import { Rating as CommonRating } from '@ln/ds-common-rating';

/**
 * @typedef {import('@ln/ds-common-rating').RatingProps} RatingProps
 */
/**
 * @param {RatingProps} props
 * @returns {React.ReactElement}
 */
function Rating({ defaultValue = 0.5, precision = 0.5, ...props }) {
    return (
        <CommonRating
            defaultValue={defaultValue}
            precision={precision}
            {...props}
        />
    );
}

export default Rating;
