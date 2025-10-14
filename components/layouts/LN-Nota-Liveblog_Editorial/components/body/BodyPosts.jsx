import React from 'react';
import PropTypes from 'prop-types';
import AuthorBox from './authorBox/default';

function BodyPosts({ children }) {
    if (!children) return null;
    return (
        <>
            <AuthorBox />
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
