import React from 'react';
import VideoPlayer from '../../features/LN/common/video/default';
import MediaIframe from '../../features/LN/common/iframe/default';
import { MediaItemImage } from '../LN-Nota-Opinion/components/apertura/MediaItemImage';

export const getMediaType = (type, subtype) =>
    type === 'raw_html' ? 'iframe' : type || subtype;

const mediaRenderers = {
    image: mediaData => <MediaItemImage data={mediaData} />,
    video_jw: mediaData => <VideoPlayer data={mediaData} />,
    iframe: mediaData => <MediaIframe html={mediaData.content} />
};

export const getMediaItem = ({ mediaData }) => {
    if (!mediaData) return null;

    const { type, subtype } = mediaData;
    const baseType = getMediaType(type, subtype);

    const resolvedType =
        baseType === 'custom_embed' && subtype === 'video_jw'
            ? 'video_jw'
            : baseType;

    const renderer = mediaRenderers[resolvedType];
    return renderer ? renderer(mediaData) : null;
};
