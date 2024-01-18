import get from './get';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';
import { getVideoData } from '../../../features/private-global/common/utils/getVideoData';
import { filterImagesByProportion } from '../../../features/private-global/common/utils/filterImagesByProportion';

const getListOfOpeningImages = (video, basicImageMobile, basicImageDsk) => {
    if (video && basicImageMobile) {
        return filterImagesByProportion(basicImageMobile, '2:3');
    }

    if (basicImageMobile) {
        return [
            ...filterImagesByProportion(basicImageDsk, '3:2'),
            ...filterImagesByProportion(basicImageMobile, '2:3')
        ];
    }

    return get(basicImageDsk, 'resized_urls', []);
};

const getAperturaStorytelling = (
    videoJW,
    basicImageDsk,
    basicImageMobile,
    device = 'desktop'
) => {
    const isMobile = device !== 'desktop';

    const { dataJw = {}, videoUrl = '', posterUrl = '' } =
        (videoJW && getVideoData(videoJW)) || {};

    const data = isMobile
        ? basicImageMobile
        : (videoJW && dataJw) || basicImageDsk;

    const { alt_text: altText = '', url = '', caption = '' } = data || {};

    const resizedUrls = getListOfOpeningImages(
        videoJW,
        basicImageMobile,
        basicImageDsk
    );

    const defaultUrl = get(getShortestImage(resizedUrls), 'resizedUrl', url);

    return {
        videoUrl: isMobile ? '' : videoUrl,
        defaultUrl,
        posterUrl,
        resizedUrls,
        altText,
        caption
    };
};

export default getAperturaStorytelling;
