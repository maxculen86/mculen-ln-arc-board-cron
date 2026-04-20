import get from '../../../../common/utils/get';

const DEFAULT_CONTENT_LOCATION = {
    '@type': 'Place',
    name: 'Buenos Aires',
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Buenos Aires',
        addressCountry: 'AR'
    }
};

const buildContentLocation = ({ cityName, countryCode }) => ({
    '@type': 'Place',
    name: cityName,
    address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: countryCode
    }
});

const getContentLocation = globalContent => {
    const rawText = get(globalContent, 'label.location.text', '');
    const rawLocation = typeof rawText === 'string' ? rawText.trim() : '';

    if (!rawLocation) return DEFAULT_CONTENT_LOCATION;

    const [countryCode = '', cityName = ''] = rawLocation.split(/\s*[|>]\s*/);

    if (!countryCode || !cityName) return DEFAULT_CONTENT_LOCATION;

    return buildContentLocation({
        cityName: cityName.trim(),
        countryCode: countryCode.trim()
    });
};

export { DEFAULT_CONTENT_LOCATION, getContentLocation };
