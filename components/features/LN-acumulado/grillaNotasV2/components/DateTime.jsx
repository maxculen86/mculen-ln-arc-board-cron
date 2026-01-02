import React from 'react';

export function DateTime({ isoDate, displayDate }) {
    if (!isoDate || !displayDate) return null;
    return (
        <time dateTime={isoDate} className="text-14 text-neutral-light-600">
            {displayDate}
        </time>
    );
}
