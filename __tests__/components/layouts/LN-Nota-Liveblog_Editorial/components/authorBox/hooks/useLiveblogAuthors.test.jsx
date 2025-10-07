import { renderHook } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import get from '../../../../../../../components/private/common/utils/get';
import { getUniqueAuthorsFromPosts } from '../../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts';
import { useLiveblogAuthors } from '../../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/components/body/authorBox/hook/useLiveblogAuthors';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock(
    '../../../../../../../components/layouts/LN-Nota-Liveblog_Editorial/_helpers/getUniqueAuthorsFromPosts'
);
jest.mock('../../../../../../../components/private/common/utils/get');

describe('LN-Nota-Liveblog_Editorial - components - authorsBox - hooks - useLiveblogAuthors', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('returns authors and shouldShow=true when there are 3 or more authors and the box is enabled', () => {
        const mockAuthors = [
            { id: '1', name: 'Ana' },
            { id: '2', name: 'Juan' },
            { id: '3', name: 'Luis' }
        ];

        useAppContext.mockReturnValue({
            globalContent: { content_elements: [{}, {}] }
        });

        get.mockImplementation((obj, path, fallback) => {
            if (path === 'label.mostrar_caja_autores.text') return 'Si';
            return fallback;
        });

        getUniqueAuthorsFromPosts.mockReturnValue(mockAuthors);

        const { result } = renderHook(() => useLiveblogAuthors());

        expect(result.current.authors).toEqual(mockAuthors);
        expect(result.current.shouldShow).toBe(true);
    });

    it('returns shouldShow=false when there are less than 3 authors', () => {
        const mockAuthors = [{ id: '1', name: 'Ana' }];

        useAppContext.mockReturnValue({
            globalContent: { content_elements: [{}] }
        });

        get.mockReturnValue('Si');
        getUniqueAuthorsFromPosts.mockReturnValue(mockAuthors);

        const { result } = renderHook(() => useLiveblogAuthors());

        expect(result.current.authors).toEqual(mockAuthors);
        expect(result.current.shouldShow).toBe(false);
    });

    it('returns shouldShow=false when "mostrar_caja_autores" is "No"', () => {
        const mockAuthors = [
            { id: '1', name: 'Ana' },
            { id: '2', name: 'Juan' },
            { id: '3', name: 'Luis' }
        ];

        useAppContext.mockReturnValue({
            globalContent: { content_elements: [{}] }
        });

        get.mockReturnValue('No');
        getUniqueAuthorsFromPosts.mockReturnValue(mockAuthors);

        const { result } = renderHook(() => useLiveblogAuthors());

        expect(result.current.authors).toEqual(mockAuthors);
        expect(result.current.shouldShow).toBe(false);
    });
});
