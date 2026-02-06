import React, { memo, useEffect, useRef, useState } from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { Icon } from '@ln/common-ui-icon';
import { Button } from '@ln/contenidos-ui-button';
import { useAppContext } from 'fusion:context';
import { cx } from '@ln/cva';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { useJWPlayer } from '../hooks/useJWPlayer';
import get from '../../../../private/common/utils/get';
import { getWWWResizedUrls } from '../../../../private/common/utils/image/getDataToLinkImage/_helper';
import { buttonShowPlayerClasses, videoShareMediaClasses } from '../styles';

// TODO cambiar variant por context
function VideoShareMedia({ id, variant = 'vertical' }) {
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
        <div className={videoShareMediaClasses({ variant })}>
            <Button
                onClick={() => setShowPlayer(true)}
                iconOnly
                isNegative
                className={buttonShowPlayerClasses({ variant })}
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
                    className={cx(
                        variant === 'vertical' && [
                            'absolute',
                            'top-0',
                            'left-0',
                            'right-0',
                            'bottom-0',
                            'bg-gradient-dark-top',
                            'ratio-9-16'
                        ]
                    )}
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

export default memo(VideoShareMedia);
