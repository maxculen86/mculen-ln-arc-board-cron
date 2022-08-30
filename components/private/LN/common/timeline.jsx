/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ModRowGap from '../../common/mod-rowgap';

const Timeline = ({ articles, content, orderClass }) => {
    if (!articles || !content) return <></>;

    return (
        <ModRowGap classCondition={`timeline-home ${orderClass}`}>
            <div className="timeline-content">{content}</div>
            <div className="row-gap-tablet-2">{articles}</div>
        </ModRowGap>
    );
};

Timeline.propTypes = {
    orderClass: PropTypes.string,
    content: PropTypes.node,
    articles: PropTypes.node
};

export default Timeline;
