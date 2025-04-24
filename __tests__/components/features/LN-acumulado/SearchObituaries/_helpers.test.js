import { handleSearch } from '../../../../../components/features/LN-acumulado/SearchObituaries/_helpers';

jest.mock('fusion:environment', () => {
    return {
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

const originalLocation = window.location;

beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
});

afterAll(() => {
    window.location = originalLocation;
});

describe('components - features - LN-acumulado - SearchObituaries - _helpers - handleSearch', () => {
    it('redirects with keyword and time filter', () => {
        handleSearch('juan pérez', { value: '24' });

        expect(window.location.href).toBe(
            `https://www.lanacion.com.ar/buscador/?query=juan%20p%C3%A9rez&fkey=section|pubdate&fval=avisos|24`
        );
    });

    it('redirects with default keyword and no time filter', () => {
        handleSearch('', { value: 'all' });

        expect(window.location.href).toBe(
            `https://www.lanacion.com.ar/buscador/?query=avisos&fkey=section&fval=avisos`
        );
    });

    it('redirects with keyword only (no time filter)', () => {
        handleSearch('maria', { value: 'all' });

        expect(window.location.href).toBe(
            `https://www.lanacion.com.ar/buscador/?query=maria&fkey=section&fval=avisos`
        );
    });

    it('redirects with time filter only (no keyword)', () => {
        handleSearch('', { value: '168' });

        expect(window.location.href).toBe(
            `https://www.lanacion.com.ar/buscador/?query=avisos&fkey=section|pubdate&fval=avisos|168`
        );
    });
});
