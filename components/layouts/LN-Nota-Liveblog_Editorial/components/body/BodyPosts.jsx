import React from 'react';
import PropTypes from 'prop-types';

function BodyPosts({ children }) {
    return <div className="grid_md gap-32_m">{children}</div>;
}

BodyPosts.propTypes = {
    children: PropTypes.node.isRequired
};
export default BodyPosts;
