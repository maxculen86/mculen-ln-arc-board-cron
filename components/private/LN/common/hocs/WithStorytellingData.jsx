import React, { useEffect, useState } from 'react';
import { getTypeOfDevice } from '@ln/hooks';
import get from '../../../common/utils/get';
import getApertura from '../../../common/utils/getApertura';
import {
    STORYTELLING,
    FOTOAL100
} from '../../../common/utils/subtypes/subtypeHelper';

export default function WithStorytellingData(WrappedComponent) {
    function Component(props) {
        const [storytellingData, setStorytellingData] = useState({
            apertura: {}
        });

        const getStorytellingData = () => {
            const promoItems = get(props, 'globalContent.promo_items', null);
            const storytellingMobile = get(
                promoItems,
                'storytelling_mobile',
                null
            );

            const basicImage = get(promoItems, 'basic', null);
            const videoBackground = get(promoItems, 'storytelling', null);
            const videoJw = get(promoItems, 'video_jw', null);
            const type = get(props, 'globalContent.type', null);
            const subtype = get(props, 'globalContent.subtype', null);
            const device = getTypeOfDevice({
                breakpoints: { mobile: 768, tablet: 1024 }
            });

            const isMobile = device !== 'desktop';

            return type === 'story' &&
                (subtype === STORYTELLING || subtype === FOTOAL100) &&
                (basicImage || videoBackground || storytellingMobile || videoJw)
                ? getApertura(
                      isMobile,
                      basicImage,
                      videoBackground,
                      storytellingMobile,
                      device,
                      videoJw
                  )
                : {};
        };

        useEffect(() => {
            setStorytellingData({ apertura: getStorytellingData() });
        }, []);

        return (
            <WrappedComponent {...props} storytellingData={storytellingData} />
        );
    }

    return Component;
}
