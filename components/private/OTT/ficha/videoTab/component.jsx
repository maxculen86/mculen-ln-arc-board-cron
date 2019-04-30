import React from 'react';
import Video from './video';
import VideoInfo from './videoInfo';

export default function videoTab({
    videoSrc,
    title,
    date,
    categories,
    shareConfig,
    videoHtml
}) {
    return (
        <>
            <section
                className={'apertura'}
                dangerouslySetInnerHTML={{ __html: videoHtml }}
            />
            {/* <Video src={videoSrc} /> */}
            <VideoInfo
                title={title}
                date={date}
                categories={categories}
                shareConfig={shareConfig}
            />
        </>
    );
}
