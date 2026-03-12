import React from 'react';
import { getMediaItem } from '../../../_helpers/mediaHelper';

function MediaVideo100({ data = {} }) {
    const { mediaData } = data;
    const mediaItem = getMediaItem({
        mediaData,
        classes: {
            mediaContainerClassesProps: 'mb-0'
        }
    });
    return (
        <div className="bg-neutral-dark-1 pt-80 -mt-88 pt-102_m -mt-110_m pt-72_l -mt-80_l">
            <div
                className="h-100 flex flex-column jc-center lay"
                id="video-100-opening-media"
            >
                {mediaItem}
            </div>
        </div>
    );
}

export default MediaVideo100;
