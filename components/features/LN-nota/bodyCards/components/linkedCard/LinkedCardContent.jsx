import React from 'react';
import PropTypes from 'prop-types';

function LinkedCardContent({ children }) {
    return <div className="linked-card-content">{children}</div>;
}

LinkedCardContent.propTypes = {
    children: PropTypes.node.isRequired
};

export default LinkedCardContent;
