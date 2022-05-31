import React from 'react';
import Video from './video';
import VideoInfo from './videoInfo';

export default function videoTab({ videoId, title, date, analytics = [] }) {
    return (
        <>
            <div
                itemScope
                itemType="http://schema.org/VideoObject"
                style={{ display: 'none' }}
            >
                {analytics.map((elem, index) => (
                    <meta
                        itemProp={elem.itemProp}
                        content={elem.content}
                        key={index}
                    />
                ))}
            </div>
            <Video videoId={videoId} />
            <VideoInfo title={title} date={date} />
        </>
    );
}
