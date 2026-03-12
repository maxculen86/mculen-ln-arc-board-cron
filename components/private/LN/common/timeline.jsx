/* eslint-disable react/require-default-props */
import React from 'react';
import ModRowGap from '../../common/mod-rowgap';

function Timeline({ articles, content, orderClass }) {
    if (!articles || !content) return null;

    return (
        <ModRowGap classCondition={`timeline-home ${orderClass}`}>
            <div className="timeline-content">{content}</div>
            <div className="row-gap-tablet-2">{articles}</div>
        </ModRowGap>
    );
}

export default Timeline;
