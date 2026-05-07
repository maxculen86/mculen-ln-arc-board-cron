import get from '../../../../common/utils/get';

const getLiveblogLocation = globalContent => {
    const rawLocation = get(globalContent, 'label.location.text', '').trim();

    if (!rawLocation) return undefined;

    const [addressRegion = '', addressLocality = ''] =
        rawLocation.split(/\s*[|>]\s*/);

    if (!addressRegion || !addressLocality) return undefined;

    return {
        addressLocality,
        addressRegion
    };
};

export { getLiveblogLocation };
