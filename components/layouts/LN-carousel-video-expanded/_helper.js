import { addEventToDataLayerV2 } from '../../private/LN/common/utils/addEventToDataLayer';

const trackShareView = (videoId, title) => {
    addEventToDataLayerV2({
        event: 'share_view',
        origin: 'share',
        rest: {
            id_video: videoId,
            content_type: 'video_story',
            page_title: title
        }
    });
};

export default trackShareView;
