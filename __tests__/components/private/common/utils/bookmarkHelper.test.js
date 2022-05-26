import 'regenerator-runtime/runtime';
import toggleBookmark, {
    getBookmarkContent
} from '../../../../../components/private/common/utils/bookmarkHelper';
import notaExample from '../../../../../__mocks__/data/nota/body/globalContent.json';
import BookmarkApiNoteFormat from '../../../../../__mocks__/data/bookmark/APINoteData.json';

describe('Components - Private - Common - Utils - bookmarkHelper =>', () => {
    describe('toggleBookmark', () => {
        const token = '469C121D-238F-4447-A656-A32E50DBB997';
        const bookmarkId = 'd08588de-88ef-48ca-8254-ee46860f25ee';
        const setToast = jest.fn();
        const setBookmark = jest.fn();

        // global.fetch = jest.fn();
        // fetch
        //     .mockImplementationOnce(() => Promise.reject('API is down'))
        //     .mockImplementationOnce(() =>
        //         Promise.resolve({ bookmarkId: bookmarkId })
        //     );

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ bookmarkId })
            })
        );

        afterEach(() => {
            fetch.mockClear();
        });

        it('Should return null without token and without bookmarkId or globalContent', () => {
            expect(toggleBookmark()).toBeNull();
            expect(toggleBookmark(token, null, null)).toBeNull();
            expect(fetch).not.toBeCalled();
        });
        it('Should call fetch with proper endpoint, token and DELETE method when bookmarkId is defined (bookmark already saved -> action delete bookmark)', () => {
            expect(
                toggleBookmark(token, null, bookmarkId, setBookmark, setToast)
            ).toBeTruthy();
            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks/${bookmarkId}`,
                {
                    body: '{}',
                    headers: {
                        Authorization: token
                    },
                    method: 'DELETE'
                }
            );
            expect(setToast).toBeCalledWith({});
            // expect(setBookmark).toBeCalledWith(bookmarkId);
        });

        it('Should call fetch with proper endpoint, token and POST method when bookmarkId is not defined (bookmark not saved -> action create bookmark)', () => {
            expect(
                toggleBookmark(token, notaExample, null, setBookmark, setToast)
            ).toBeTruthy();
            expect(fetch).toBeCalledWith(
                `https://api-personalizacion.lanacion.com.ar/personalizacion/v1/zones/lanacion/bookmarks`,
                {
                    body: JSON.stringify(BookmarkApiNoteFormat),
                    headers: {
                        Authorization: token
                    },
                    method: 'POST'
                }
            );
        });
    });
});
