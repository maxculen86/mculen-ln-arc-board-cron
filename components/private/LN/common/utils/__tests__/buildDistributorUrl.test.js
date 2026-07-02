import buildDistributorUrl from '../buildDistributorUrl';
import formatDistributorName from '../formatDistributorName';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock('../formatDistributorName', () => jest.fn(name => name));

describe('buildDistributorUrl', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('builds the correct URL for a valid distributor name', () => {
        const result = buildDistributorUrl('Agencia Noticias');

        expect(result).toBe(
            'https://www.lanacion.com.ar/distributor/Agencia Noticias/'
        );
    });

    it('returns null when distributorName is undefined', () => {
        const result = buildDistributorUrl(undefined);

        expect(result).toBeNull();
    });

    it('returns null when distributorName is null', () => {
        const result = buildDistributorUrl(null);

        expect(result).toBeNull();
    });

    it('returns null when distributorName is an empty string', () => {
        const result = buildDistributorUrl('');

        expect(result).toBeNull();
    });

    it('returns null when distributorName is "LA NACION"', () => {
        const result = buildDistributorUrl('LA NACION');

        expect(result).toBeNull();
    });

    it('builds a URL for a distributor with special characters', () => {
        const result = buildDistributorUrl('Distrib. (SA)');

        expect(result).toBe(
            'https://www.lanacion.com.ar/distributor/Distrib. (SA)/'
        );
    });

    it('builds a URL for a single-character distributor name', () => {
        const result = buildDistributorUrl('A');

        expect(result).toBe('https://www.lanacion.com.ar/distributor/A/');
    });

    it('calls formatDistributorName with the provided name when it is valid', () => {
        buildDistributorUrl('Agencia Noticias');

        expect(formatDistributorName).toHaveBeenCalledWith('Agencia Noticias');
    });

    it('does NOT call formatDistributorName when distributorName is undefined', () => {
        buildDistributorUrl(undefined);

        expect(formatDistributorName).not.toHaveBeenCalled();
    });

    it('does NOT call formatDistributorName when distributorName is null', () => {
        buildDistributorUrl(null);

        expect(formatDistributorName).not.toHaveBeenCalled();
    });

    it('does NOT call formatDistributorName when distributorName is an empty string', () => {
        buildDistributorUrl('');

        expect(formatDistributorName).not.toHaveBeenCalled();
    });

    it('does NOT call formatDistributorName when distributorName is "LA NACION"', () => {
        buildDistributorUrl('LA NACION');

        expect(formatDistributorName).not.toHaveBeenCalled();
    });
});
