import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import useGridArticlesLN from '../../../../../../components/features/LN-acumulado/grillaNotasV2/hooks/useGridArticles';
import get from '../../../../../../components/private/common/utils/get';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/get');

describe('Components - features - LN-acumulado - grillaNotasV2 - hooks - useGridArticlesLN', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should returns items, hasMoreArticles and totalCount', () => {
        useAppContext.mockReturnValue({
            globalContent: {
                Payload: {
                    items: [{ slug: 'tag1' }],
                    content_elements: []
                },
                distributorId: 'dist123',
                node_type: 'section',
                type: 'someType',
                acumuladoGeneral: {
                    cantidad_notas: 30
                }
            }
        });

        const mockElements = [
            { _id: '1', title: 'Articulo 1' },
            { _id: '2', title: 'Articulo 2' }
        ];

        useContent.mockReturnValue({
            content_elements: mockElements,
            next: 2,
            count: 60
        });

        get.mockImplementation((obj, path, def) => {
            const parts = path.split('.');
            let val = obj;
            for (const part of parts) {
                if (val && Object.prototype.hasOwnProperty.call(val, part)) {
                    val = val[part];
                } else {
                    return def;
                }
            }
            return val === undefined ? def : val;
        });

        const hookResult = useGridArticlesLN({
            id: '/economia',
            layout: 'LN-acumulado-v2',
            page: 1
        });

        expect(useAppContext).toHaveBeenCalled();
        expect(useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                source: 'acuArticlesSource',
                query: expect.objectContaining({
                    sectionId: '/economia',
                    size: 30,
                    page: 1
                })
            })
        );

        expect(hookResult.articles).toEqual(mockElements);
        expect(hookResult.hasMoreArticles).toBe(true);
        expect(hookResult.totalCount).toBe(60);
    });
});
