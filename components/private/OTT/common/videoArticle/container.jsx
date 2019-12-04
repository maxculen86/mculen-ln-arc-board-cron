import React from 'react';
import VideoArticleComponent from './component';
import withCorrectHref from '../../../common/hocs/withCorrectHref';

const VideoArticle = ({ description, imgSrc, href }) => {
    return (
        description &&
        imgSrc &&
        href && (
            <VideoArticleComponent
                description={description}
                imgSrc={imgSrc}
                href={href}
            />
        )
    );
};

export default withCorrectHref(VideoArticle);
