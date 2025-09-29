import React from 'react';
import PropTypes from 'prop-types';
import LiveblogAuthorsBox from '../authorsBox/default';

function BodyPosts({ children }) {
    if (!children) return null;
    return (
        <>
            <LiveblogAuthorsBox />
            <div className="liveblog-editorial-body-posts grid_md gap-32_m mb-32">
                {children}
            </div>
        </>
    );
}

BodyPosts.propTypes = {
    children: PropTypes.node.isRequired
};
export default BodyPosts;
