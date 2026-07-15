import React from 'react';
import get from '../../../../../private/common/utils/get';
import VideoPlayer from '../../../common/video/default';
import { WrapperBody } from '../../../common/wrapperBody/default';
import RawHtml from '../../../common/rawHtml/default';
import useVideoJwBody from '../../../common/video/utils/useVideoJwBody';

const MEDIA_TYPE_VIDEO = 'video';
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
            <WrapperBody variant={variant} className="mb-48">
                <VideoPlayer
                    videoData={body.videoData}
                    loadingType="lazy"
                    fetchPriority="low"
                    showCaption={!!epigraphTitle}
                />
            </WrapperBody>
        );
    }

    return <RawHtml data={data} variant={variant} />;
}

CustomMultimedia.arcType = 'custom-multimedia';

export default CustomMultimedia;
