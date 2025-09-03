import { useAppContext } from 'fusion:context';
import { getMediaItem } from '../../../_helpers/mediaHelper';
import get from '../../../../private/common/utils/get';

function OpeningMedia() {
    const { globalContent } = useAppContext();
    const media = get(globalContent, 'promo_items.basic', null);

    if (!media) return null;

    // TODO: Clases por defecto. Reemplazar por las clases definitivas.
    const classes = {
        containerClass: 'nota-cards__opening-media',
        videoClass: 'nota-cards__opening-video',
        imageClass: 'nota-cards__opening-image'
    };

    const result = getMediaItem({
        mediaData: media,
        classes,
        hasAutoplay: false
    });

    return result;
}

export default OpeningMedia;
