import React from 'react';
import PropTypes from 'prop-types';
import { getMediaItem } from '../../_helpers/mediaHelper';
import { openingVideoMediaStyles, videoStyles } from './styles';

function NotaVideoOpeningMedia({ mediaData, variant }) {
    if (!mediaData) return null;

    const classes = openingVideoMediaStyles({ variant });

    const videoClasses = videoStyles({ variant });

    const mediaItem = getMediaItem({
        mediaData,
        classes: videoClasses,
        hasAutoplay: 'true',
        isOpening: true
    });

    return <div className={classes}>{mediaItem}</div>;
}

NotaVideoOpeningMedia.propTypes = {
    mediaData: PropTypes.shape({}),
    variant: PropTypes.oneOf(['horizontal', 'vertical'])
};

NotaVideoOpeningMedia.defaultProps = {
    mediaData: null,
    variant: 'vertical'
};

export default NotaVideoOpeningMedia;
