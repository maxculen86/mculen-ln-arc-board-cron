import { renderHook, act } from '@testing-library/react';
import useComments from '../../../../../../components/features/LN/DS-Toolbar/hooks/useComments';
import useFetch from '../../../../../../components/private/common/hooks/useFetch';
import { conditionallyCallViafoura } from '../../../../../../components/private/common/utils/commentsHelper';
import { scrollToComments } from '../../../../../../components/private/LN/common/utils/shareHelper';
import { addEventToDataLayerV2 } from '../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock('../../../../../../components/private/common/hooks/useFetch');
jest.mock(
    '../../../../../../components/private/common/utils/commentsHelper',
    () => ({
        conditionallyCallViafoura: jest.fn()
    })
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/shareHelper',
    () => ({
        scrollToComments: jest.fn()
    })
);
jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock('fusion:environment', () => ({
    VIAFOURA_UUID: 'test-viafoura-uuid'
}));

describe('Components - features - LN - DS-Toolbar - hooks - useComments', () => {
    const defaultProps = {
        noteId: 'note-123',
        firstPublishDate: '2024-01-01T00:00:00Z',
        displayComments: true
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useFetch.mockReturnValue({ data: null });
        conditionallyCallViafoura.mockReturnValue(true);
    });

    describe('initial state', () => {
        it('returns correct structure', () => {
            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current).toHaveProperty('showButton');
            expect(result.current).toHaveProperty('total');
            expect(result.current).toHaveProperty('handleGoToComments');
        });

        it('showButton is true when displayComments is true', () => {
            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current.showButton).toBe(true);
        });

        it('showButton is false when displayComments is false', () => {
            const { result } = renderHook(() =>
                useComments({ ...defaultProps, displayComments: false })
            );

            expect(result.current.showButton).toBe(false);
        });
    });

    describe('total comments', () => {
        it('returns total when total_visible_content is greater than 0', () => {
            useFetch.mockReturnValue({
                data: { total_visible_content: 5 }
            });

            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current.total).toBe(5);
        });

        it('returns null when total_visible_content is 0', () => {
            useFetch.mockReturnValue({
                data: { total_visible_content: 0 }
            });

            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current.total).toBe(null);
        });

        it('returns null when data is null', () => {
            useFetch.mockReturnValue({ data: null });

            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current.total).toBe(null);
        });

        it('returns null when total_visible_content does not exist', () => {
            useFetch.mockReturnValue({ data: {} });

            const { result } = renderHook(() => useComments(defaultProps));

            expect(result.current.total).toBe(null);
        });
    });

    describe('useFetch integration', () => {
        it('calls useFetch with correct url when viafoura should be called', () => {
            conditionallyCallViafoura.mockReturnValue(true);

            renderHook(() => useComments(defaultProps));

            expect(useFetch).toHaveBeenCalledWith({
                url: `https://livecomments.viafoura.co/v4/livecomments/test-viafoura-uuid/contentcontainer/id?container_id=${defaultProps.noteId}`,
                options: {
                    method: 'GET',
                    headers: {
                        accept: 'application/json'
                    }
                }
            });
        });

        it('calls useFetch with null url when viafoura should not be called', () => {
            conditionallyCallViafoura.mockReturnValue(false);

            renderHook(() => useComments(defaultProps));

            expect(useFetch).toHaveBeenCalledWith({
                url: null,
                options: {
                    method: 'GET',
                    headers: {
                        accept: 'application/json'
                    }
                }
            });
        });

        it('passes firstPublishDate to conditionallyCallViafoura', () => {
            renderHook(() => useComments(defaultProps));

            expect(conditionallyCallViafoura).toHaveBeenCalledWith(
                defaultProps.firstPublishDate
            );
        });
    });

    describe('handleGoToComments', () => {
        it('calls scrollToComments', () => {
            const { result } = renderHook(() => useComments(defaultProps));

            act(() => {
                result.current.handleGoToComments();
            });

            expect(scrollToComments).toHaveBeenCalled();
        });

        it('sends correct datalayer event', () => {
            const { result } = renderHook(() => useComments(defaultProps));

            act(() => {
                result.current.handleGoToComments();
            });

            expect(addEventToDataLayerV2).toHaveBeenCalledWith({
                event: 'e_linkclick',
                action: 'toolbar',
                category: 'nota',
                label: 'ver_comentarios'
            });
        });

        it('calls scrollToComments and datalayer in sequence', () => {
            const callOrder = [];
            scrollToComments.mockImplementation(() => callOrder.push('scroll'));
            addEventToDataLayerV2.mockImplementation(() =>
                callOrder.push('datalayer')
            );

            const { result } = renderHook(() => useComments(defaultProps));

            act(() => {
                result.current.handleGoToComments();
            });

            expect(callOrder).toEqual(['scroll', 'datalayer']);
        });
    });
});
