import getAuthorsPhoto from '../../../../../components/private/common/utils/getAuthorsPhoto';

jest.mock('fusion:environment', () => ({
    __esModule: true,
    RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
    SITE_LANACION: 'https://sandbox.lanacion.com.ar'
}));

describe('getAuthorsPhoto test', () => {
    const author1 = {
        credits: {
            by: [
                {
                    author: 'Carlos Pagni',
                    type: 'author',
                    image: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                            }
                        ]
                    },
                    alt_text: 'Foto de Carlos Pagni'
                }
            ]
        }
    };

    const author2 = {
        credits: {
            by: [
                {
                    author: 'Joaquín Morales Solá',
                    type: '',
                    image: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png'
                            }
                        ]
                    },
                    alt_text: 'Foto de Joaquín Morales Solá'
                }
            ]
        }
    };

    const author3 = {
        credits: {
            by: [
                {
                    author: 'Jorge Fernández Díaz',
                    type: 'author',
                    image: {
                        resized_urls: [
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png'
                            },
                            {
                                resizedUrl:
                                    'https://resizer.glanacion.com/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
                            }
                        ]
                    },
                    alt_text: 'Foto de Jorge Fernández Díaz'
                }
            ]
        }
    };

    it('Check the photo values of authores', () => {
        const photoCarlos = getAuthorsPhoto(author1);
        const photoJoaquin = getAuthorsPhoto(author2);
        const photoJorge = getAuthorsPhoto(author3);

        expect(photoCarlos.resized_urls.length).toBe(1);
        expect(photoCarlos.url).toBe(
            'https://sandbox.lanacion.com.ar/resizer/PNjDoOm_Gkxjqpjax5_jKzkLX6k=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/91/2219591.png'
        );
        expect(photoJoaquin).toBe(null);
        expect(photoJorge.resized_urls.length).toBe(2);
        expect(photoJorge.url).toBe(
            'https://sandbox.lanacion.com.ar/resizer/sAWtYLpCf60HZM-pSOuv4VDCNWs=/80x0/filters:quality(80)/bucket.glanacion.com/anexos/fotos/55/2089255.png'
        );
    });
});
