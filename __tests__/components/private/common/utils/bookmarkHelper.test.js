import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import { act } from '@testing-library/react';
import toggleBookmark, {
    getBookmarkContent
} from '../../../../../components/private/common/utils/bookmarkHelper';
import notaExample from '../../../../../__mocks__/data/nota/body/globalContent.json';
import BookmarkApiNoteFormat from '../../../../../__mocks__/data/bookmark/APINoteData.json';
import { getAuthTokens } from '../../../../../auth/helper/loginHelper';

jest.mock('../../../../../auth/helper/loginHelper');

describe('Components - Private - Common - Utils - bookmarkHelper =>', () => {
    describe('toggleBookmark', () => {
        const accessToken = '469C121D-238F-4447-A656-A32E50DBB997';
        const token = '469C121D-238F-4447-A656-A32E50DBB997';
        const bookmarkId = 'd08588de-88ef-48ca-8254-ee46860f25ee';
        const setToast = jest.fn();
        const setBookmark = jest.fn();

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ bookmarkId })
            })
        );

        beforeEach(() => {
            getAuthTokens.mockImplementation(() => ({
                token,
                accessToken: `Bearer ${accessToken}`
            }));
        });

        afterEach(() => {
            fetch.mockClear();
        });

        it('Should return null without token and without bookmarkId or globalContent', () => {
            expect(toggleBookmark()).toBeNull();
            expect(
                toggleBookmark({
                    isDelete: null,
                    setBookmark,
                    dispatch: setToast
                })
            ).toBeNull();
            expect(fetch).not.toBeCalled();
        });
        it('Should call fetch with proper endpoint, token and DELETE method when bookmarkId is defined (bookmark already saved -> action delete bookmark)', async () => {
            await act(async () => {
                toggleBookmark({
                    isDelete: bookmarkId,
                    setBookmark,
                    dispatch: setToast
                });
            });

            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks/${bookmarkId}`,
                {
                    body: '{}',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'X-Token': token
                    },
                    method: 'DELETE'
                }
            );
        });

        it('Should call fetch with proper endpoint, token and POST method when bookmarkId is not defined (bookmark not saved -> action create bookmark)', async () => {
            await act(async () => {
                toggleBookmark({
                    isDelete: null,
                    setBookmark,
                    setToast,
                    _globalContent: notaExample
                });
            });
            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks`,
                {
                    body: JSON.stringify(BookmarkApiNoteFormat),
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'X-Token': token
                    },
                    method: 'POST'
                }
            );
        });
    });
    describe('getBookmarkContent', () => {
        it('Should return note data according to personalizacion api structure', () => {
            const dataForApi = getBookmarkContent(notaExample);
            expect(dataForApi).toBeDefined();
            const {
                id,
                templateId,
                url,
                categoria,
                tags,
                titulo,
                bajada,
                autores,
                enviarApps,
                fechaActualizacion,
                fecha,
                imagen: { absoluteUrl, parametros }
            } = dataForApi;

            parametros.map(size => {
                expect(size.alto).toBeDefined(); // Verifica que la propiedad 'alto' esté definida
                expect(typeof size.alto).toBe('number'); // Verifica que 'alto' sea un número
            });

            expect(id).toBe(notaExample._id);
            expect(templateId).toBe(Number(notaExample.subtype));
            expect(url).toBe(notaExample.canonical_url);
            expect(categoria.slug).toBe(
                notaExample.taxonomy.primary_section._id
            );
            expect(categoria.valor).toBe(
                notaExample.taxonomy.primary_section.name
            );
            expect(tags).toHaveLength(4);
            expect(titulo).toBe(notaExample.headlines.mobile);
            expect(bajada).toBe(notaExample.subheadlines.basic);
            expect(autores).toHaveLength(2);
            expect(enviarApps).toBe(true);
            expect(fecha).toBe('12 de mayo de 2020 • 08:24');
            expect(fechaActualizacion).toBe('10 de noviembre de 2021 • 07:44');
            expect(parametros.length).toBe(
                notaExample.promo_items.basic.resized_urls.length
            );

            expect(absoluteUrl).toBe(
                'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TWKBIKLZYBARBFLM5BOAXGYP3I.jpg'
            );
        });
    });
});
