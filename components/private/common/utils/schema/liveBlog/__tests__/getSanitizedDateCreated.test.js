import { getSanitizedDateCreated } from '../generatePostObject';

describe('getSanitizedDateCreated', () => {
    it('returns empty string when createdDate is empty', () => {
        expect(getSanitizedDateCreated('', '2024-01-15T00:00:00.000Z')).toBe(
            ''
        );
    });

    it('returns ISO of createdDate when it is before datePublished', () => {
        const result = getSanitizedDateCreated(
            '2024-01-10T00:00:00Z',
            '2024-01-15T00:00:00.000Z'
        );
        expect(result).toBe('2024-01-10T00:00:00.000Z');
    });

    it('returns ISO of createdDate when it equals datePublished', () => {
        const result = getSanitizedDateCreated(
            '2024-01-15T00:00:00Z',
            '2024-01-15T00:00:00.000Z'
        );
        expect(result).toBe('2024-01-15T00:00:00.000Z');
    });

    it('returns datePublishedISO when createdDate is after datePublished (migrated content)', () => {
        const result = getSanitizedDateCreated(
            '2024-01-20T00:00:00Z',
            '2024-01-15T00:00:00.000Z'
        );
        expect(result).toBe('2024-01-15T00:00:00.000Z');
    });

    it('returns empty string when createdDate is invalid', () => {
        expect(
            getSanitizedDateCreated(
                'fecha-invalida',
                '2024-01-15T00:00:00.000Z'
            )
        ).toBe('');
    });
});
