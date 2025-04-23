/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Icon } from '@ln/common-ui-icon';
import get from '../../../../private/common/utils/get';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { useJWPlayer } from '../hooks/useJWPlayer';

function VideoShareMedia({ id }) {
    const { globalContent } = useAppContext();
    const containerRef = useRef(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const { loadPlayer, setupPlayer, isScriptLoaded } = useJWPlayer(id);

    const allImages = get(globalContent, `promo_items.basic.resized_urls`, []);
    const { resizedUrl } = getShortestImage(allImages);

    useEffect(() => {
        if (!showPlayer) return;

        loadPlayer();

        if (isScriptLoaded) {
            setupPlayer();
        }
    }, [showPlayer, isScriptLoaded, loadPlayer, setupPlayer]);

    if (showPlayer) {
        return <div id={id} ref={containerRef} />;
    }

    return (
        <div className="flex flex-column w-100 h-100 ratio-6-19 jc-center ai-center">
            <div
                className="relative flex w-100 h-100 ratio-2-3 jc-center ai-center cursor-pointer"
                onClick={() => setShowPlayer(true)}
            >
                <Adaptableimage
                    src={resizedUrl}
                    alt="Video thumbnail"
                    sources={getImagesToLoadWithPicture(allImages)}
                />
                <div className="absolute z-1">
                    <Icon size={48}>
                        <IconSprite name="play" />
                    </Icon>
                </div>
            </div>
        </div>
    );
}

VideoShareMedia.propTypes = {
    id: PropTypes.string.isRequired
};

export default memo(VideoShareMedia);
