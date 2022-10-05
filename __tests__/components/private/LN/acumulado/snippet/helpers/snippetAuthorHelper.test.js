import {
    formatForObjectArray,
    stringToArray,
    formatForOneElementArray,
    extractAffilations,
    getBooksAndPodcasts
} from '../../../../../../../components/private/LN/acumulado/snippet/helpers/snippetAuthorHelper';

describe('components - private - LN - acumulado - snippet - helpers - snippetAuthorHelper', () => {
    describe('formatForObjectArray function test', () => {
        it('When corrent array format should return a string array', () => {
            const objArr = [{ name: 'a' }, { name: 'b' }];
            expect(formatForObjectArray(objArr)).toStrictEqual(['a', 'b']);
        });
        it('When no data is sent return undefined', () => {
            expect(formatForObjectArray()).toBe(undefined);
        });
    });
    describe('stringToArray function', () => {
        it('When a string with commas is sent return an array split between commas', () => {
            const str = 'Politica, Economia';
            expect(stringToArray(str)).toStrictEqual(['Politica', 'Economia']);
        });
        it('When no data is sent return undefined', () => {
            expect(stringToArray()).toBe(undefined);
        });
    });
    describe('formatForOneElementArray function', () => {
        it('When two o more elements array is sent return the same array', () => {
            const arr = ['elementOne', 'elementTwo'];
            expect(formatForOneElementArray(arr)).toStrictEqual(arr);
        });
        it('When one element array is sent return poped element', () => {
            const arr = ['elementOne'];
            expect(formatForOneElementArray(arr)).toStrictEqual('elementOne');
        });
        it('When no data is sent return undefined', () => {
            expect(formatForOneElementArray()).toStrictEqual(undefined);
        });
    });

    describe('extractAffilations function', () => {
        it('When an affilation is sent return the correct object for schema', () => {
            const aff = 'Una afiliacion, Dos afiliaciones';
            expect(extractAffilations(aff)).toStrictEqual([
                {
                    '@type': 'NewsMediaOrganization',
                    name: 'Una afiliacion'
                },
                {
                    '@type': 'NewsMediaOrganization',
                    name: 'Dos afiliaciones'
                },
                {
                    '@type': 'NewsMediaOrganization',
                    name: 'La Nación',
                    url: 'https: //www.lanacion.com.ar'
                }
            ]);
        });
        it('When no data is sent return undefined', () => {
            expect(extractAffilations()).toStrictEqual(undefined);
        });
    });

    describe('getBooksAndPodcasts function', () => {
        it('When books and podcast are sent return the correct object for schema', () => {
            const books = [
                {
                    publisher: 'Juan Pravata',
                    title: 'Libro 1',
                    url: 'www.librito.com'
                },
                {
                    publisher: 'Juan Pravata',
                    title: 'Libro 2',
                    url: 'www.librito.com'
                },
                {
                    publisher: 'Juan Pravata',
                    title: 'Libro 3',
                    url: 'www.librito.com'
                }
            ];
            const podcast = [
                {
                    download_url: 'descarga.com/podcast',
                    name: 'Hola me llamo juan',
                    url: 'podacast.com/juancito'
                }
            ];
            expect(getBooksAndPodcasts(books, podcast)).toStrictEqual([
                {
                    '@type': 'Book',
                    name: 'Libro 1',
                    author: 'Juan Pravata',
                    format: 'https://schema.org/Paperback'
                },
                {
                    '@type': 'Book',
                    name: 'Libro 2',
                    author: 'Juan Pravata',
                    format: 'https://schema.org/Paperback'
                },
                {
                    '@type': 'Book',
                    name: 'Libro 3',
                    author: 'Juan Pravata',
                    format: 'https://schema.org/Paperback'
                },
                {
                    '@type': 'PodcastSeries',
                    name: 'Hola me llamo juan',
                    url: 'podacast.com/juancito',
                    associatedMedia: {
                        '@type': 'MediaObject',
                        contentUrl: 'descarga.com/podcast'
                    }
                }
            ]);
        });
        it('When only podcast are sent return the object without', () => {
            const podcast = [
                {
                    download_url: 'descarga.com/podcast',
                    name: 'Hola me llamo juan',
                    url: 'podacast.com/juancito'
                }
            ];
            expect(getBooksAndPodcasts([], podcast)).toStrictEqual([
                {
                    '@type': 'PodcastSeries',
                    associatedMedia: {
                        '@type': 'MediaObject',
                        contentUrl: 'descarga.com/podcast'
                    },
                    name: 'Hola me llamo juan',
                    url: 'podacast.com/juancito'
                }
            ]);
        });
        it('When no data is sent return undefined', () => {
            expect(getBooksAndPodcasts()).toStrictEqual(undefined);
        });
    });
});
