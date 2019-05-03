import React from 'react';
import Video from './video';
import VideoInfo from './videoInfo';

export default function videoTab({
    videoId,
    title,
    date,
    categories,
    shareConfig
}) {
    return (
        <>
            <Video videoId={videoId} />
            <VideoInfo
                title={title}
                date={date}
                categories={categories}
                shareConfig={shareConfig}
            />
        </>
    );
}
