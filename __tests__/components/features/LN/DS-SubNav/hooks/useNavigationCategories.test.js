import { useContent } from 'fusion:content';
import useNavigationCategories from '../../../../../../components/features/LN/DS-SubNav/hooks/useNavigationCategories';
import { isPrimarySection } from '../../../../../../components/features/LN/DS-SubNav/_helpers';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/LN/DS-SubNav/_helpers',
    () => ({
        isPrimarySection: jest.fn()
    })
);

describe('Components - features - LN - DS-SubNav - hooks - useNavigationCategories', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useContent.mockReturnValue(null);
        isPrimarySection.mockReturnValue(false);
    });

    describe('when no options provided', () => {
        it('returns navigation as null and isPrimarySection as false', () => {
            const result = useNavigationCategories();

            expect(result).toEqual({
                navigation: null,
                isPrimarySection: false
            });
        });

        it('calls useContent with undefined source and query', () => {
            useNavigationCategories();

            expect(useContent).toHaveBeenCalledWith({
                source: undefined,
                query: undefined,
                filter: undefined
            });
        });
    });

    describe('when hierarchyManual is provided', () => {
        it('calls useContent with navigationSource', () => {
            useNavigationCategories({
                hierarchyManual: 'manual-hierarchy',
                website: 'la-nacion-ar'
            });

            expect(useContent).toHaveBeenCalledWith({
                source: 'navigationSource',
                query: {
                    hierarchy: 'manual-hierarchy',
                    website: 'la-nacion-ar'
                },
                filter: undefined
            });
        });

        it('returns navigation from response children', () => {
            const mockChildren = [{ _id: '/cat1' }, { _id: '/cat2' }];
            useContent.mockReturnValue({ children: mockChildren });

            const result = useNavigationCategories({
                hierarchyManual: 'manual-hierarchy',
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(mockChildren);
        });
    });

    describe('when hierarchyManual is not provided', () => {
        it('calls useContent with undefined source', () => {
            useNavigationCategories({
                globalContent: { _id: '/economia' }
            });

            expect(useContent).toHaveBeenCalledWith({
                source: undefined,
                query: undefined,
                filter: undefined
            });
        });

        it('returns navigation from globalContent children', () => {
            const mockChildren = [{ _id: '/child1' }, { _id: '/child2' }];

            const result = useNavigationCategories({
                globalContent: { _id: '/economia', children: mockChildren },
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(mockChildren);
        });
    });

    describe('hideCategories behavior', () => {
        it('returns null navigation when hideCategories is true', () => {
            const mockChildren = [{ _id: '/cat1' }];
            useContent.mockReturnValue({ children: mockChildren });

            const result = useNavigationCategories({
                hierarchyManual: 'manual',
                hideCategories: 'true'
            });

            expect(result.navigation).toBeNull();
        });

        it('returns navigation when hideCategories is false', () => {
            const mockChildren = [{ _id: '/cat1' }];
            useContent.mockReturnValue({ children: mockChildren });

            const result = useNavigationCategories({
                hierarchyManual: 'manual',
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(mockChildren);
        });

        it('defaults hideCategories to false', () => {
            const mockChildren = [{ _id: '/cat1' }];
            useContent.mockReturnValue({ children: mockChildren });

            const result = useNavigationCategories({
                hierarchyManual: 'manual'
            });

            expect(result.navigation).toEqual(mockChildren);
        });
    });

    describe('isPrimarySection', () => {
        it('calls isPrimarySection with sectionId from globalContent', () => {
            useNavigationCategories({
                globalContent: { _id: '/economia' }
            });

            expect(isPrimarySection).toHaveBeenCalledWith('/economia');
        });

        it('calls isPrimarySection with empty string when no globalContent', () => {
            useNavigationCategories({});

            expect(isPrimarySection).toHaveBeenCalledWith('');
        });

        it('returns isPrimarySection true when helper returns true', () => {
            isPrimarySection.mockReturnValue(true);

            const result = useNavigationCategories({
                globalContent: { _id: '/economia' }
            });

            expect(result.isPrimarySection).toBe(true);
        });

        it('returns isPrimarySection false when helper returns false', () => {
            isPrimarySection.mockReturnValue(false);

            const result = useNavigationCategories({
                globalContent: { _id: '/economia/mercados' }
            });

            expect(result.isPrimarySection).toBe(false);
        });
    });

    describe('navigation priority', () => {
        it('prioritizes response over globalContent children', () => {
            const responseChildren = [{ _id: '/response' }];
            const globalChildren = [{ _id: '/global' }];
            useContent.mockReturnValue({ children: responseChildren });

            const result = useNavigationCategories({
                hierarchyManual: 'manual',
                globalContent: { _id: '/economia', children: globalChildren },
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(responseChildren);
        });

        it('falls back to globalContent children when response is empty', () => {
            const globalChildren = [{ _id: '/global' }];
            useContent.mockReturnValue({ children: [] });

            const result = useNavigationCategories({
                hierarchyManual: 'manual',
                globalContent: { _id: '/economia', children: globalChildren },
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(globalChildren);
        });

        it('falls back to globalContent children when response is null', () => {
            const globalChildren = [{ _id: '/global' }];
            useContent.mockReturnValue(null);

            const result = useNavigationCategories({
                globalContent: { _id: '/economia', children: globalChildren },
                hideCategories: 'false'
            });

            expect(result.navigation).toEqual(globalChildren);
        });
    });

    describe('filter parameter', () => {
        it('passes filter to useContent', () => {
            const mockFilter = 'custom-filter';

            useNavigationCategories({
                hierarchyManual: 'manual',
                filter: mockFilter
            });

            expect(useContent).toHaveBeenCalledWith(
                expect.objectContaining({
                    filter: mockFilter
                })
            );
        });
    });
});
