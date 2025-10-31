import React from 'react';
import PropTypes from 'prop-types';

function LinkedCardHeader({ children }) {
    return <div className="flex flex-column ai-center">{children}</div>;
}

LinkedCardHeader.propTypes = {
    children: PropTypes.node.isRequired
};

export default LinkedCardHeader;
