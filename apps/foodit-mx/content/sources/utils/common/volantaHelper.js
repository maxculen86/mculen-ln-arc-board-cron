import get from '../../../../components/private/common/utils/get';

export const processVolanta = result => {
    const headlinesWeb = (get(result, 'headlines.web', '') || '').trim();

    if (!headlinesWeb) {
        return result.label;
    }

    return {
        ...(result.label || {}),
        volanta: {
            display: true,
            text: headlinesWeb
        }
    };
};
