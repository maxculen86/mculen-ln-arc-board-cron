import React from 'react';
import PropTypes from 'prop-types';

function LiveTopic({ children }) {
    return <li className="w-max flex ai-center">{children}</li>;
}

LiveTopic.propTypes = {
    children: PropTypes.node.isRequired
};

export default LiveTopic;
