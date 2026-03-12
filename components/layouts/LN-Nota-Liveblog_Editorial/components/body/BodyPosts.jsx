import React from 'react';
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

export default BodyPosts;
