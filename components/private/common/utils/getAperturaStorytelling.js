import get from './get';
import { getShortestImage } from '../../LN/common/utils/mediaHelper';
import { getVideoData } from '../../../features/private-global/common/utils/getVideoData';
import { filterImagesByDevice } from '../../../features/private-global/common/utils/filterImagesByDevice';
import getImageAltText from '../../../features/foodit-global/common/utils/getImageAltText';

const getListOfOpeningImages = (video, basicImageMobile, basicImageDsk) => {
    if (video && basicImageMobile) {
        return filterImagesByDevice(basicImageMobile, 'mobile');
    }

    if (basicImageMobile) {
        return [
            ...filterImagesByDevice(basicImageDsk, 'desktop'),
            ...filterImagesByDevice(basicImageMobile, 'mobile')
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

    const { url = '', caption = '' } = data || {};
    const altText = getImageAltText(data || {});

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
        altText
    };
};

export default getAperturaStorytelling;
