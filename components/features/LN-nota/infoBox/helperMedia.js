import React from 'react';
import VideoZocalo from './components/videoZocalo/default';

const mediaComponents = {
    video: VideoZocalo
};

export const getMediaComponent = mediaConfig => {
    if (!mediaConfig) return undefined;

    const { type, ...config } = mediaConfig;
    const MediaComponent = mediaComponents[type];

    return <MediaComponent {...config} />;
};
