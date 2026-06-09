import React from 'react';
import RatingBadge from '../ratingBadge/default';
import IconSubscribe from '../iconSubscribe/default';

const getCustomBadge = ({ rating, isSubscriber }) => {
    if (rating)
        return <RatingBadge size={16} ratingProps={{ defaultValue: rating }} />;

    if (isSubscriber) {
        return (
            <div data-tw style={{ display: 'contents' }}>
                <IconSubscribe />
            </div>
        );
    }
    return null;
};

export default getCustomBadge;
