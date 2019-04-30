import React from 'react';
import VideoArticle from '../../../common/videoArticle/container';

export default function LastVideoItem({ title, imgSrc, id }) {
    return <VideoArticle description={title} imgSrc={imgSrc} id={id} />;
}
