import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import toggleBookmark, {
    getBookmarkContent
} from '../../../../../components/private/common/utils/bookmarkHelper';
import notaExample from '../../../../../__mocks__/data/nota/body/globalContent.json';
import BookmarkApiNoteFormat from '../../../../../__mocks__/data/bookmark/APINoteData.json';
import { getAuthFromCookie } from '../../../../../auth/helper/loginHelper';

jest.mock('../../../../../auth/helper/loginHelper', () => ({
    getAuthFromCookie: jest.fn()
}));

describe('Components - Private - Common - Utils - bookmarkHelper =>', () => {
    describe('toggleBookmark', () => {
        const setBookmark = jest.fn();
        const dispatch = jest.fn();
        const _globalContent = {
            _id: 'noteId',
            taxonomy: { primary_section: { name: 'sectionName' } }
        };
        const accessToken = '469C121D-238F-4447-A656-A32E50DBB997';
        const token = '469C121D-238F-4447-A656-A32E50DBB997';
        const bookmarkId = 'd08588de-88ef-48ca-8254-ee46860f25ee';
        const bearerAccessToken = `Bearer ${accessToken}`;
        const setToast = jest.fn();

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ bookmarkId })
            })
        );

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should return null if _globalContent is empty and isDelete is false', async () => {
            const result = await toggleBookmark(
                false,
                setBookmark,
                dispatch,
                {}
            );

            expect(result).toBeNull();
        });

        it('should call fetch with DELETE method when isDelete', async () => {
            getAuthFromCookie
                .mockResolvedValueOnce(token)
                .mockResolvedValueOnce(bearerAccessToken);

            await toggleBookmark(
                bookmarkId,
                setBookmark,
                dispatch,
                _globalContent
            );

            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks/${bookmarkId}`,
                {
                    body: '{}',
                    headers: {
                        Authorization: bearerAccessToken,
                        'X-Token': token
                    },
                    method: 'DELETE'
                }
            );
        });

        it('should call fetch with POST method when isDelete is false', async () => {
            getAuthFromCookie
                .mockResolvedValueOnce(token)
                .mockResolvedValueOnce(bearerAccessToken);

            await toggleBookmark('', setBookmark, dispatch, notaExample);

            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v2/zones/lanacion/bookmarks`,
                {
                    body: JSON.stringify(BookmarkApiNoteFormat),
                    headers: {
                        Authorization: bearerAccessToken,
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
