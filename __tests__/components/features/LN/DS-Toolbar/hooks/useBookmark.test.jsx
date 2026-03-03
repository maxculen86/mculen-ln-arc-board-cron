import { renderHook, act } from '@testing-library/react';
import useBookmark from '../../../../../../components/features/LN/DS-Toolbar/hooks/useBookmark';
import useCheckBookmark from '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark';
import toggleBookmark, {
    getStatusMessage
} from '../../../../../../components/private/common/utils/bookmarkHelper';
import renderToasts from '../../../../../../components/features/ui/ln/toastsContainer/renderToast';
import useTermica from '../../../../../../components/private/common/hooks/useTermica';

jest.mock(
    '../../../../../../components/private/common/hooks/bookmark/useCheckBookmark'
);
jest.mock('../../../../../../components/private/common/utils/bookmarkHelper');
jest.mock(
    '../../../../../../components/features/ui/ln/toastsContainer/renderToast'
);
jest.mock('../../../../../../components/private/common/hooks/useTermica');

describe('Components - features - LN - DS-Toolbar - hooks - useBookmark', () => {
    const defaultProps = {
        noteId: 'note-123',
        suscription: true,
        token: 'test-token',
        accessToken: 'access-token',
        globalContent: { _id: 'note-123', title: 'Test Note' },
        openBarrier: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useTermica.mockReturnValue(true);
        useCheckBookmark.mockReturnValue(false);
        toggleBookmark.mockResolvedValue({
            status: 'success',
            bookmarkContent: {}
        });
        getStatusMessage.mockReturnValue({
            title: 'Guardado',
            message: 'Nota guardada correctamente',
            variant: 'success'
        });
    });

    describe('initial state', () => {
        it('returns correct initial values', () => {
            const { result } = renderHook(() => useBookmark(defaultProps));

            expect(result.current).toHaveProperty('onToggleBookmark');
            expect(result.current).toHaveProperty('bookmarkName');
            expect(result.current).toHaveProperty('bookmark');
            expect(result.current).toHaveProperty('termicaBookmark');
        });

        it('returns bookmark-filled icon when bookmarked', () => {
            useCheckBookmark.mockReturnValue(true);

            const { result } = renderHook(() => useBookmark(defaultProps));

            expect(result.current.bookmarkName).toBe('bookmark-filled');
        });

        it('returns bookmark icon when not bookmarked', () => {
            useCheckBookmark.mockReturnValue(false);

            const { result } = renderHook(() => useBookmark(defaultProps));

            expect(result.current.bookmarkName).toBe('bookmark');
        });
    });

    describe('termicaBookmark', () => {
        it('returns termicaBookmark value from useTermica', () => {
            useTermica.mockReturnValue(true);

            const { result } = renderHook(() => useBookmark(defaultProps));

            expect(result.current.termicaBookmark).toBe(true);
            expect(useTermica).toHaveBeenCalledWith('bookmark_web');
        });

        it('does not set bookmark when termicaBookmark is false', () => {
            useTermica.mockReturnValue(false);
            useCheckBookmark.mockReturnValue(true);

            const { result } = renderHook(() => useBookmark(defaultProps));

            expect(result.current.bookmark).toBe('');
        });
    });

    describe('onToggleBookmark', () => {
        it('calls openBarrier when user is not subscribed', async () => {
            const openBarrier = jest.fn();
            const { result } = renderHook(() =>
                useBookmark({
                    ...defaultProps,
                    suscription: false,
                    openBarrier
                })
            );

            await act(async () => {
                result.current.onToggleBookmark();
            });

            expect(openBarrier).toHaveBeenCalled();
            expect(toggleBookmark).not.toHaveBeenCalled();
        });

        it('shows toast after successful toggle', async () => {
            const { result } = renderHook(() => useBookmark(defaultProps));

            await act(async () => {
                result.current.onToggleBookmark();
            });

            expect(renderToasts).toHaveBeenCalledWith({
                buttonProps: {
                    className:
                        'ds-custom-buttom-toast bg-neutral-1 text-black-default hover:bg-neutral-1-lighten border-black-default w-fit',
                    color: 'custom',
                    variant: 'outline'
                },
                title: 'Guardado',
                description: 'Nota guardada correctamente',
                color: 'success'
            });
        });

        it('calls getStatusMessage with correct params', async () => {
            toggleBookmark.mockResolvedValue({
                status: 'created',
                bookmarkContent: { id: '123' }
            });

            const { result } = renderHook(() => useBookmark(defaultProps));

            await act(async () => {
                result.current.onToggleBookmark();
            });

            expect(getStatusMessage).toHaveBeenCalledWith('created', {
                id: '123'
            });
        });
    });

    describe('useCheckBookmark integration', () => {
        it('passes correct params to useCheckBookmark', () => {
            renderHook(() => useBookmark(defaultProps));

            expect(useCheckBookmark).toHaveBeenCalledWith(
                true,
                defaultProps.token,
                defaultProps.accessToken,
                defaultProps.noteId,
                defaultProps.suscription
            );
        });
    });
});
