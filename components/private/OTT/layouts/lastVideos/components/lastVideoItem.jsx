import React from 'react';
import VideoArticle from '../../../common/containers/videoArticle';

export default function LastVideoItem({ title, imgSrc, href }) {
    return <VideoArticle description={title} imgSrc={imgSrc} href={href} />;
}
