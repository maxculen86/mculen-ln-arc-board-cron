import {
    getCachedSegments,
    setCachedSegments,
    areCacheSegmentsValid,
    fetchUserSegments
} from './helpers';

export async function getUserSegments() {
    try {
        const cached = getCachedSegments();
        if (cached && areCacheSegmentsValid(cached.timestamp))
            return cached.segments;

        const userSegments = await fetchUserSegments();
        setCachedSegments(userSegments);
        return userSegments;
    } catch (error) {
        console.error('Error consultando segmentación:', error);
        throw error;
    }
}
