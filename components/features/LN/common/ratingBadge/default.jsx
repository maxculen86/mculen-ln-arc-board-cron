import React from 'react';
import { cx } from '@ln/ds-cva';
import Rating from '../../../ui/ln/rating/default';
import Icon from '../../../ui/ln/icon/default';

function RatingBadge({ size = 16, containerProps, ratingProps }) {
    const { className: containerClassName, ...restContainerProps } =
        containerProps || {};

    const classNameContainer = cx(
        'box-border rounded-full bg-neutral-1 border border-muted w-fit flex items-center',
        { 'py-8 px-12 h-32': size === 16 },
        { 'py-12 px-16 h-44': size === 20 },
        containerClassName
    );

    return (
        <div data-tw style={{ display: 'contents' }}>
            <div className={classNameContainer} {...restContainerProps}>
                <Rating
                    readOnly
                    size={size}
                    emptyIcon={
                        <Icon
                            name="star-rating"
                            fill="var(--color-base-lighten)"
                            size={size}
                        />
                    }
                    icon={
                        <Icon name="star-rating" fill="#BB3B80" size={size} />
                    }
                    {...ratingProps}
                />
            </div>
        </div>
    );
}

export default RatingBadge;
