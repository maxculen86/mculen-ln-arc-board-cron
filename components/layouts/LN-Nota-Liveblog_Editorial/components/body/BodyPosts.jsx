import React from 'react';
import PropTypes from 'prop-types';

function BodyPosts({ children }) {
    if (!children) return null;
    return <div className="grid_md gap-32_m mb-32">{children}</div>;
}

BodyPosts.propTypes = {
    children: PropTypes.node.isRequired
};
export default BodyPosts;
