import React from 'react';
import { getMediaItem } from '../../_helpers/mediaHelper';
import { openingVideoMediaStyles, videoStyles } from './styles';

function NotaVideoOpeningMedia({ mediaData = null, variant = 'vertical' }) {
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

export default NotaVideoOpeningMedia;
