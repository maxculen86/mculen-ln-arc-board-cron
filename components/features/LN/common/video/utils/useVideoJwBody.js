import { extractVideoData } from './videoDataUtils';

export default function useVideoJwBody(data) {
    const videoData = extractVideoData(data);
    const { playerId, mediaId } = videoData;

    return {
        videoData,
        playerId,
        mediaId
    };
}
