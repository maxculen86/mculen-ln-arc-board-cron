import { SEGMENTATION_API, SEGMENTATION_APIKEY } from 'fusion:environment';
import { getAuthTokens } from '../../../../private/common/auth/helper/loginHelper';

export function getCachedSegments() {
    try {
        const segments = JSON.parse(localStorage.getItem('userSegments'));
        const timestamp = localStorage.getItem('userSegmentsTimestamp');

        if (segments && timestamp) {
            return {
                segments,
                timestamp: new Date(JSON.parse(timestamp))
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function setCachedSegments(segments) {
    localStorage.setItem('userSegments', JSON.stringify(segments));
    localStorage.setItem(
        'userSegmentsTimestamp',
        JSON.stringify(new Date().toISOString())
    );
}

export function areCacheSegmentsValid(timestamp) {
    const now = new Date();
    const updateDay = 6; // Actualización semanal los sábados

    const daysSinceCache = Math.floor(
        (now - timestamp) / (24 * 60 * 60 * 1000)
    );

    if (daysSinceCache === 0) {
        return true;
    }

    const cacheCreatedDay = timestamp.getDay();
    const daysUntilNextUpdate = (updateDay - cacheCreatedDay + 7) % 7 || 7;
    const isDataExpired = daysSinceCache >= daysUntilNextUpdate;
    return !isDataExpired;
}

export async function fetchUserSegments() {
    const { accessToken } = await getAuthTokens();
    if (!accessToken) {
        console.error('No accessToken disponible para consulta de segmentos');
        return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const siteId = '1';

    const response = await fetch(`${SEGMENTATION_API}${siteId}`, {
        method: 'GET',
        headers: {
            access_token: accessToken,
            apikey: SEGMENTATION_APIKEY
        },
        signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
        throw new Error(`Error API segmentación: ${response.status}`);
    }

    const data = await response.json();
    return data.userSegments || [];
}
