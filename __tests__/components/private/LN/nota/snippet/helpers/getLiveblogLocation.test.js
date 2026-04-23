import {
    DEFAULT_LOCATION,
    getLiveblogLocation
} from '../../../../../../../components/private/LN/nota/snippet/helpers/getLiveblogLocation';

describe('getLiveblogLocation', () => {
    it('returns the configured location when the label uses pipes', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'US | Washington'
                }
            }
        };

        expect(getLiveblogLocation(globalContent)).toEqual({
            addressLocality: 'Washington',
            addressRegion: 'US'
        });
    });

    it('returns the configured location when the label uses >', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'AR > Cordoba'
                }
            }
        };

        expect(getLiveblogLocation(globalContent)).toEqual({
            addressLocality: 'Cordoba',
            addressRegion: 'AR'
        });
    });

    it('returns the default location when the label is empty', () => {
        const globalContent = {
            label: {
                location: {
                    text: ''
                }
            }
        };

        expect(getLiveblogLocation(globalContent)).toEqual(DEFAULT_LOCATION);
    });

    it('returns the default location when the label is malformed', () => {
        const globalContent = {
            label: {
                location: {
                    text: 'US'
                }
            }
        };

        expect(getLiveblogLocation(globalContent)).toEqual(DEFAULT_LOCATION);
    });
});
