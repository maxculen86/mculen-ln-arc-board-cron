import pageBuilderValidator from '../../private/common/utils/pageBuilderValidator';
import get from '../../private/common/utils/get';
import { pushFooditEvent } from '../../features/foodit-global/common/utils/pushFooditEvent';

const normalizeVideoId = videoId =>
    typeof videoId === 'string' ? videoId.trim() : videoId;

export const validateCarouselVideos = ({ children = [] }) => {
    const rules = [
        {
            validation: children.length < 4 || children.length > 8,
            message:
                'Se permite un minimo de 4 y un maximo de 8 videos en el carrusel.'
        }
    ];

    return pageBuilderValidator(rules);
};

export const transformNodes = ({ children, childProps = [] }) => {
    let counterVideos = 0;
    return childProps.reduce((acc, properties, index) => {
        const { video, title, hideTitle, author } = get(
            properties,
            'customFields',
            {}
        );
        const child = children[index];
        counterVideos += 1;
        const videoId = normalizeVideoId(video);

        const newChildren = {
            id: videoId,
            title: title || '',
            displayTitle: hideTitle ? '' : title || '',
            author: author || '',
            counterVideo: counterVideos,
            node: child
        };

        acc.push(newChildren);

        return acc;
    }, []);
};

export const registeredVideoIds = new Set();

export const handleEventVideoView = ({
    videoIdObserved = '',
    videoTitle = ''
}) => {
    if (!registeredVideoIds || registeredVideoIds.has(videoIdObserved)) {
        return;
    }

    registeredVideoIds.add(videoIdObserved);

    pushFooditEvent({
        event: 'video_view',
        contentType: 'video_story',
        origin: 'home',
        rest: {
            video_title: videoTitle,
            id_video: videoIdObserved
        }
    });
};
