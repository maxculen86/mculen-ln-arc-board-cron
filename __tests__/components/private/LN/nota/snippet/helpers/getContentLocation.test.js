import { getContentLocation } from '../../../../../../../components/private/LN/nota/snippet/helpers/getContentLocation';

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

    it('returns undefined when the label is empty', () => {
        const globalContent = {
            label: {
                location: {
                    text: ''
                }
            }
        };

        expect(getContentLocation(globalContent)).toBeUndefined();
    });

    it('returns undefined when the label is malformed', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'US'
                }
            }
        };

        expect(getContentLocation(globalContent)).toBeUndefined();
    });

    it('returns undefined when label is missing', () => {
        expect(getContentLocation({})).toBeUndefined();
    });

    it('returns undefined when the label text is not a string', () => {
        const globalContent = {
            label: {
                location: {
                    text: null
                }
            }
        };

        expect(getContentLocation(globalContent)).toBeUndefined();
    });
});
