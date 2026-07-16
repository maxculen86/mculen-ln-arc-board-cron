import React from 'react';
import get from '../../../../../private/common/utils/get';
import VideoPlayer from '../../../common/video/default';
import { WrapperBody } from '../../../common/wrapperBody/default';
import RawHtml from '../../../common/rawHtml/default';
import useVideoJwBody from '../../../common/video/utils/useVideoJwBody';

const MEDIA_TYPE_VIDEO = 'video';
const MEDIA_TYPE_HTML = 'html';
const WIDTH_SEVENTY = '70';
const WIDTH_HUNDRED = '100';

function CustomMultimedia({ data }) {
    const mediaType = get(data, 'embed.config.mediaType', '');
    const width = get(data, 'embed.config.variant', WIDTH_HUNDRED);
    const variant = width === WIDTH_SEVENTY ? 'seventy' : 'hundred';

    if (mediaType === MEDIA_TYPE_VIDEO) {
        const body = useVideoJwBody(data);
        const { epigraphTitle } = body.videoData;
        return (
            <WrapperBody variant={variant} className="mb-64 aspect-16/9">
                <VideoPlayer
                    videoData={body.videoData}
                    loadingType="lazy"
                    fetchPriority="low"
                    showCaption={!!epigraphTitle}
                    classnames={{
                        container: 'w-full',
                        caption: 'mx-auto w-fit'
                    }}
                />
            </WrapperBody>
        );
    }

    if (mediaType === MEDIA_TYPE_HTML) {
        const content = get(data, 'embed.config.content', '');
        const { _id: idMedia } = data;

        if (content && idMedia) {
            return (
                <WrapperBody variant={variant} className="mb-64">
                    <RawHtml
                        htmlData={content}
                        idMedia={idMedia}
                        className="h-full"
                    />
                </WrapperBody>
            );
        }
    }

    return null;
}

CustomMultimedia.arcType = 'custom-multimedia';

export default CustomMultimedia;
