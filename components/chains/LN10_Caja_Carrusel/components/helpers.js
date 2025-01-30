import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';

export const registeredIdsSetAndInteractions = new Set();

export const handleEventSwipeVideo = ({
    videoIdObserved = '',
    videoTitle = ''
}) => {
    if (
        !registeredIdsSetAndInteractions ||
        registeredIdsSetAndInteractions.has(videoIdObserved)
    ) {
        return;
    }

    registeredIdsSetAndInteractions.add(videoIdObserved);

    if (registeredIdsSetAndInteractions.size > 2) {
        addEventToDataLayerV2({
            event: 'video_view',
            contentType: 'video_story',
            origin: 'video_story',
            rest: {
                page_title: videoTitle,
                id_video: videoIdObserved
            }
        });
    }
};

// TODO: Utilizar components/private/LN/common/utils/dynamicallyLoadScript.js, agregando mejora que pueda ser async y que use getElementsByTagName
export const isScriptLoaded = id => {
    const scripts = Array.from(document.getElementsByTagName('script'));
    return scripts.some(script =>
        script.src.includes(`cdn.jwplayer.com/libraries/${id}`)
    );
};
