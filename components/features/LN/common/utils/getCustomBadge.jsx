import React from 'react';
import RatingBadge from '../ratingBadge/default';
import Icon from '../../../ui/ln/icon/default';

const getCustomBadge = ({ rating, isSubscriber }) => {
    if (rating)
        return <RatingBadge size={16} ratingProps={{ defaultValue: rating }} />;

    if (isSubscriber)
        return (
            <div data-tw style={{ display: 'contents' }}>
                <div className="flex items-center justify-center h-24 w-24 rounded-full border-neutral-1 border bg-warning-default">
                    <Icon size={14} name="crow" fill="--color-primary-dark" />
                </div>
            </div>
        );
    return null;
};

export default getCustomBadge;
