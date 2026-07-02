import get from '../../../../private/common/utils/get';
import { getItemNearest } from '../../../../private/LN/common/utils/getItemNearest';
import {
    getImagesToLoadWithPicture,
    getShortestImage
} from '../../../../private/LN/common/utils/mediaHelper';
import getImageAltText from './getImageAltText';

export const MAX_VIDEO_SIZE = 3145728;

export const transformFooditVideoContent = (video = {}) => {
    const { poster = '', sources = [], type = 'video' } = video;
    const file = get(
        getItemNearest({ items: sources, target: 650 }),
        'file',
        ''
    );

    return {
        mediaVariant: 'video',
        poster,
        type,
        src: file
    };
};

export const transformFooditImageContent = (image = {}, isOpening = false) => {
    const { url = '', resized_urls: resizedUrls = [] } = image;
    const { resizedUrl = '' } = getShortestImage(resizedUrls);

    return {
        mediaVariant: 'image',
        src: resizedUrl || url,
        alt: getImageAltText(image),
        sources: getImagesToLoadWithPicture(false, resizedUrls),
        loading: isOpening ? 'eager' : 'lazy',
        fetchPriority: isOpening ? 'high' : 'low'
    };
};

const getFooditMediaContent = ({ image, video, isOpening = false }) => {
    const rules = [
        {
            validation: Boolean(video),
            data: transformFooditVideoContent(video)
        },
        {
            validation: Boolean(image),
            data: transformFooditImageContent(image, isOpening)
        }
    ];

    return get(
        rules.find(({ validation }) => validation),
        'data',
        {}
    );
};

export default getFooditMediaContent;
