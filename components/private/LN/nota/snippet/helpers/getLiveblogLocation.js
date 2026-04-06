import get from '../../../../common/utils/get';

const DEFAULT_LOCATION = {
    addressLocality: 'Buenos Aires',
    addressRegion: 'AR'
};

const getLiveblogLocation = globalContent => {
    const rawLocation = get(globalContent, 'label.location.text', '').trim();

    if (!rawLocation) return DEFAULT_LOCATION;

    const [addressRegion = '', addressLocality = ''] =
        rawLocation.split(/\s*[|>]\s*/);

    if (!addressRegion || !addressLocality) return DEFAULT_LOCATION;

    return {
        addressLocality,
        addressRegion
    };
};

export { DEFAULT_LOCATION, getLiveblogLocation };
