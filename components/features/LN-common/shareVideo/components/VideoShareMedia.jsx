import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { useAppContext } from 'fusion:context';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { useJWPlayer } from '../hooks/useJWPlayer';
import get from '../../../../private/common/utils/get';
import { getWWWResizedUrls } from '../../../../private/common/utils/image/getDataToLinkImage/_helper';

function VideoShareMedia({ id }) {
    const { globalContent } = useAppContext();
    const containerRef = useRef(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const { loadPlayer, setupPlayer, isScriptLoaded } = useJWPlayer(id);

    const promoItems = get(globalContent, 'promo_items', {});
    const resizedUrls = getWWWResizedUrls(promoItems);

    const { resizedUrl } = getShortestImage(resizedUrls);

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
            <Button
                onClick={() => setShowPlayer(true)}
                iconOnly
                isNegative
                className="p-0 w-100 h-100"
                size="inherit"
            >
                <Adaptableimage
                    src={resizedUrl}
                    alt="Imagen poster de video"
                    sources={getImagesToLoadWithPicture(false, resizedUrls)}
                    className="w-100"
                    loading="eager"
                    fetchPriority="high"
                />
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-dark-top"
                    aria-hidden="true"
                />
                <div className="absolute z-1 opacity-80">
                    <Icon color="inherit" width={77} height={77}>
                        <IconSprite name="mediaPlay" />
                    </Icon>
                </div>
            </Button>
        </div>
    );
}

VideoShareMedia.propTypes = {
    id: PropTypes.string.isRequired
};

export default memo(VideoShareMedia);
