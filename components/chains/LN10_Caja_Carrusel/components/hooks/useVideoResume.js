import { useEffect, useRef } from 'react';
import { registerVideoResumeTracking } from '../../../../private/common/utils/videoPlayerHelper';

const useVideoResume = ({ player, title, videoId }) => {
    const cleanupRef = useRef(null);

    useEffect(() => {
        if (player) {
            cleanupRef.current?.();
            cleanupRef.current = registerVideoResumeTracking({
                player,
                defaultTitle: title,
                defaultId: videoId
            });
        }

        return () => {
            cleanupRef.current?.();
        };
    }, [player, title, videoId]);
};

export default useVideoResume;
