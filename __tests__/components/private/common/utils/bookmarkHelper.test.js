import 'regenerator-runtime/runtime';
import env from '../../../../../__mocks__/fusion:environment';
import { act } from '@testing-library/react';
import toggleBookmark, {
    getBookmarkContent,
    getStatusMessage
} from '../../../../../components/private/common/utils/bookmarkHelper';
import notaExample from '../../../../../__mocks__/data/nota/body/globalContent.json';
import BookmarkApiNoteFormat from '../../../../../__mocks__/data/bookmark/APINoteData.json';
import { getAuthTokens } from '../../../../../components/private/common/auth/helper/loginHelper';

jest.mock('../../../../../components/private/common/auth/helper/loginHelper');

describe('Components - Private - Common - Utils - bookmarkHelper =>', () => {
    describe('toggleBookmark', () => {
        const accessToken = '469C121D-238F-4447-A656-A32E50DBB997';
        const token = '469C121D-238F-4447-A656-A32E50DBB997';
        const bookmarkId = 'd08588de-88ef-48ca-8254-ee46860f25ee';
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
                    setBookmark
                })
            ).toBeNull();
            expect(fetch).not.toBeCalled();
        });

        it('Should call fetch with proper endpoint, token and DELETE method when bookmarkId is defined (bookmark already saved -> action delete bookmark)', async () => {
            await act(async () => {
                toggleBookmark({
                    isDelete: bookmarkId,
                    setBookmark
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
                imagen: { absoluteUrl }
            } = dataForApi;

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

            expect(absoluteUrl).toBe(
                'https://resizer.glanacion.com/resizer/v2/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/TWKBIKLZYBARBFLM5BOAXGYP3I.jpg'
            );
        });
    });

    describe('getStatusMessage', () => {
        const SITE_LANACION = 'https://www.lanacion.com.ar';

        const baseToastProps = {
            buttonProps: {
                children: 'Mis Notas',
                title: 'Ir a mis notas',
                'area-label': 'Ir a mis notas',
                href: `${SITE_LANACION}/mis-notas/`
            }
        };

        it('should return success configuration for status 200 with bookmarkContent', () => {
            const result = getStatusMessage(200, true);
            expect(result).toEqual({
                ...baseToastProps,
                title: '¡Listo!',
                variant: 'success',
                message: 'Podés acceder desde "Menú de usuario"'
            });
        });

        it('should return success configuration for status 200 without bookmarkContent', () => {
            const result = getStatusMessage(200, false);
            expect(result).toEqual({
                ...baseToastProps,
                title: '¡Listo!',
                variant: 'success',
                message: 'Se borró de "Mis notas"'
            });
        });

        it('should return warning configuration for status 409', () => {
            const result = getStatusMessage(409, false);
            expect(result).toEqual({
                ...baseToastProps,
                title: '¡Atención!',
                variant: 'warning',
                message:
                    'No se pudo guardar porque llegaste al límite permitido.'
            });
        });

        it('should return default configuration for unknown status', () => {
            const result = getStatusMessage(500, false);
            expect(result).toEqual({
                ...baseToastProps,
                title: '¡Ups!',
                variant: 'danger',
                message: 'Hubo un problema de conexión. Reintenta más tarde.'
            });
        });
    });
});
