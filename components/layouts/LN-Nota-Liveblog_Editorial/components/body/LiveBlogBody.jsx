import React from 'react';
import PropTypes from 'prop-types';
import BodyTop from './BodyTop';
import BodyPre from './BodyPre';
import BodyPost from './BodyPost';
import BodyPosts from './BodyPosts';
import PostDivider from './PostDivider';

function LiveBlogBody({ children }) {
    return (
        <div className="grid pt-32_m grid-cols-12_m">
            <section
                className="pt-8 pb-24 grid-col-2-2_m grid-col-2-11_lg"
                id="body-liveblog-editorial"
            >
                <div className="pb-24">{children}</div>
            </section>
        </div>
    );
}

LiveBlogBody.Top = BodyTop;
LiveBlogBody.Pre = BodyPre;
LiveBlogBody.Posts = BodyPosts;
LiveBlogBody.Post = BodyPost;
LiveBlogBody.Divider = PostDivider;

LiveBlogBody.propTypes = {
    children: PropTypes.node.isRequired
};

export default LiveBlogBody;
