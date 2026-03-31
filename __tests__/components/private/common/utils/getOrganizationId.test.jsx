import getOrganizationId from '../../../../../components/private/common/utils/getOrganizationId';

describe('schemaHelpers', () => {
    describe('getOrganizationId', () => {
        test('returns correct organization ID when host is provided', () => {
            const siteProperties = {
                host: 'https://www.lanacion.com.ar'
            };

            const result = getOrganizationId(siteProperties);

            expect(result).toBe('https://www.lanacion.com.ar/#organization');
        });

        test('returns correct organization ID for foodit', () => {
            const siteProperties = {
                host: 'https://foodit.lanacion.com.ar/'
            };

            const result = getOrganizationId(siteProperties);

            expect(result).toBe('https://foodit.lanacion.com.ar/#organization');
        });

        test('returns correct organization ID for club-la-nacion', () => {
            const siteProperties = {
                host: 'https://club.lanacion.com.ar'
            };

            const result = getOrganizationId(siteProperties);

            expect(result).toBe('https://club.lanacion.com.ar/#organization');
        });

        test('returns null when host is missing', () => {
            const siteProperties = {
                title: 'Test Site'
            };

            const result = getOrganizationId(siteProperties);

            expect(result).toBeNull();
        });

        test('returns null when siteProperties is null', () => {
            const result = getOrganizationId(null);

            expect(result).toBeNull();
        });

        test('returns null when siteProperties is undefined', () => {
            const result = getOrganizationId(undefined);

            expect(result).toBeNull();
        });

        test('returns null when siteProperties is empty object', () => {
            const result = getOrganizationId({});

            expect(result).toBeNull();
        });
    });
});
