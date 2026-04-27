import get from '../../../../common/utils/get';

const buildContentLocation = ({ cityName, countryCode }) => ({
    '@type': 'Place',
    name: cityName,
    address: {
        '@type': 'PostalAddress',
        addressLocality: cityName,
        addressCountry: countryCode
    }
});

export const getContentLocation = globalContent => {
    const rawText = get(globalContent, 'label.location.text', '');
    const rawLocation = typeof rawText === 'string' ? rawText.trim() : '';

    if (!rawLocation) return undefined;

    const [countryCode = '', cityName = ''] = rawLocation.split(/\s*[|>]\s*/);

    if (!countryCode || !cityName) return undefined;

    return buildContentLocation({
        cityName: cityName.trim(),
        countryCode: countryCode.trim()
    });
};
