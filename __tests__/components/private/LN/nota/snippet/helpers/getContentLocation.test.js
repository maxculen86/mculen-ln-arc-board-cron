import {
    DEFAULT_CONTENT_LOCATION,
    getContentLocation
} from '../../../../../../../components/private/LN/nota/snippet/helpers/getContentLocation';

describe('getContentLocation', () => {
    it('returns a Place built from K&L Location when the label uses pipes', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'US | Michigan'
                }
            }
        };

        expect(getContentLocation(globalContent)).toEqual({
            '@type': 'Place',
            name: 'Michigan',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Michigan',
                addressCountry: 'US'
            }
        });
    });

    it('returns a Place built from K&L Location when the label uses >', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'AR > Cordoba'
                }
            }
        };

        expect(getContentLocation(globalContent)).toEqual({
            '@type': 'Place',
            name: 'Cordoba',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cordoba',
                addressCountry: 'AR'
            }
        });
    });

    it('returns the default Place when the label is empty', () => {
        const globalContent = {
            label: {
                location: {
                    text: ''
                }
            }
        };

        expect(getContentLocation(globalContent)).toEqual(
            DEFAULT_CONTENT_LOCATION
        );
    });

    it('returns the default Place when the label is malformed', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'US'
                }
            }
        };

        expect(getContentLocation(globalContent)).toEqual(
            DEFAULT_CONTENT_LOCATION
        );
    });

    it('returns the default Place when label is missing', () => {
        expect(getContentLocation({})).toEqual(DEFAULT_CONTENT_LOCATION);
    });

    it('returns the default Place when the label text is not a string', () => {
        const globalContent = {
            label: {
                location: {
                    text: null
                }
            }
        };

        expect(getContentLocation(globalContent)).toEqual(
            DEFAULT_CONTENT_LOCATION
        );
    });
});
