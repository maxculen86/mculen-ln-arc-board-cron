import React from 'react';
import { getMediaItem } from '../../../_helpers/mediaHelper';
import ModFigcaption from '../../../../private/common/mod-figcaption';

function OpeningMedia({ data = {} }) {
    const { mediaData, caption, credit } = data;

    const mediaItem = getMediaItem({
        mediaData,
        classes: {
            videoContainerClassesProps: 'w-100 liveBlog_video',
            mediaContainerClassesProps: 'mb-0'
        },
        hasAutoplay: true
    });
    if (!mediaItem) return null;

    return (
        <div className="grid-col-7-13_md grid-col-6-13_md grid-col-8-17_lg grid-row-1_md">
            <div
                className="h-100 flex flex-column jc-center"
                id="liveBlog-opening-media"
            >
                {mediaItem}
                <div className="px-16 px-0_m pt-8 border border-bottom border-thin border-neutral-light-800 border-bottom-none_m">
                    <ModFigcaption
                        className="border-bottom-none mb-0 text-light-400"
                        title={caption}
                        credit={credit}
                    />
                </div>
            </div>
        </div>
    );
}

export default OpeningMedia;
