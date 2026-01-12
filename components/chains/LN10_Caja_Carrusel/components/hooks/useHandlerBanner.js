import { useEffect, useState } from 'react';
import { getTypeOfDevicev2 } from '@ln/utils';
import {
    getUnicBannerInDom,
    displayUnicBanner,
    hideBanner
} from '../../../../private/LN/common/utils/bannerHelper';
import get from '../../../../private/common/utils/get';

function useHandlerBanner({ listVideoData, currentIndex, isMobile = false }) {
    const [isBannerViewed, setIsBannerViewed] = useState(false);

    function handleBannerViewed({ currentPosition, isShowBack = false }) {
        const nextPosition = isShowBack
            ? currentPosition - 1
            : currentPosition + 1;
        const isBanner = get(listVideoData[nextPosition], 'isBanner', false);
        if (isBanner && !isBannerViewed && !isMobile) {
            setIsBannerViewed(true);
        }
    }

    useEffect(() => {
        const isBanner = get(listVideoData[currentIndex], 'isBanner', false);
        if (isMobile && isBanner) {
            setIsBannerViewed(true);
        }
    }, [isMobile, currentIndex]);

    useEffect(() => {
        const liBannerContainer = document.querySelector(
            `li[data-scroller-index="${currentIndex}"]`
        );

        hideBanner(
            ['quesale_dsk', 'quesale_mob', 'quesale_tab'],
            liBannerContainer,
            true
        );

        const suffixConfig = {
            desktop: '_dsk',
            mobile: '_mob',
            tablet: '_tab'
        };

        const device = getTypeOfDevicev2({
            breakpoints: {
                mobile: 768,
                tablet: 1024
            }
        });

        const banner = getUnicBannerInDom(
            `quesale${suffixConfig[device]}`,
            device
        );

        if (isBannerViewed && banner) {
            try {
                const optDiv = get(banner, 'opt_div');
                displayUnicBanner({ ...banner, slotId: optDiv });
            } catch (error) {
                console.error('Error al cargar el banner:', error);
            }
        }
    }, [isBannerViewed]);

    return { handleBannerViewed, isBannerViewed };
}

export default useHandlerBanner;
