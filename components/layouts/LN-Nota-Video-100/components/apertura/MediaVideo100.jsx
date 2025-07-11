import React from 'react';
import PropTypes from 'prop-types';
import { getMediaItem } from '../../../LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialApertura';

function MediaVideo100({ data }) {
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

MediaVideo100.propTypes = {
    data: PropTypes.shape({
        mediaData: PropTypes.shape({
            subtype: PropTypes.string
        }),
        caption: PropTypes.shape({}),
        credit: PropTypes.shape({})
    })
};

MediaVideo100.defaultProps = {
    data: {}
};

export default MediaVideo100;
