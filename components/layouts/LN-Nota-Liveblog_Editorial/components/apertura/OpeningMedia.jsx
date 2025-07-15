import React from 'react';
import PropTypes from 'prop-types';
import { getMediaItem } from '../../_helpers/liveblogEditorialApertura';
import OpeningEpigraph from './OpeningEpigraph';

function OpeningMedia({ data }) {
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
                <OpeningEpigraph
                    variant="desktop"
                    title={caption}
                    credit={credit}
                />
            </div>
        </div>
    );
}

OpeningMedia.propTypes = {
    data: PropTypes.shape({
        mediaData: PropTypes.shape({
            subtype: PropTypes.string
        }),
        caption: PropTypes.shape({}),
        credit: PropTypes.shape({})
    })
};

OpeningMedia.defaultProps = {
    data: {}
};

export default OpeningMedia;
