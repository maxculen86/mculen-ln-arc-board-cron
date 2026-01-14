import getPrimaryTree from '../../../../../../../components/features/LN/common/breadcrumb/helpers/getPrimaryTree';

describe('getPrimaryTree', () => {
    it('should push the current section into resultSections', () => {
        const section = {
            _id: 'deportes',
            name: 'Deportes',
            path: '/deportes'
        };

        const resultSections = [];

        getPrimaryTree([], section, resultSections);

        expect(resultSections).toEqual([
            {
                name: 'Deportes',
                path: '/deportes'
            }
        ]);
    });

    it('should not modify resultSections when section is undefined', () => {
        const resultSections = [];

        getPrimaryTree([], undefined, resultSections);

        expect(resultSections).toEqual([]);
    });

    it('should recursively push parent sections until parent_id is "/"', () => {
        const sections = [
            {
                _id: 'root',
                name: 'News',
                path: '/news',
                parent_id: '/'
            },
            {
                _id: 'child',
                name: 'Politics',
                path: '/news/politics',
                parent_id: 'root'
            },
            {
                _id: 'leaf',
                name: 'Elections',
                path: '/news/politics/elections',
                parent_id: 'child'
            }
        ];

        const resultSections = [];

        getPrimaryTree(sections, sections[2], resultSections);

        expect(resultSections).toEqual([
            {
                name: 'Elections',
                path: '/news/politics/elections'
            },
            {
                name: 'Politics',
                path: '/news/politics'
            },
            {
                name: 'News',
                path: '/news'
            }
        ]);
    });

    it('should stop recursion when parent_id is "/"', () => {
        const sections = [
            {
                _id: 'root',
                name: 'Home',
                path: '/',
                parent_id: '/'
            }
        ];

        const resultSections = [];

        getPrimaryTree(sections, sections[0], resultSections);

        expect(resultSections).toEqual([
            {
                name: 'Home',
                path: '/'
            }
        ]);
    });

    it('should stop recursion when parent section is not found', () => {
        const sections = [
            {
                _id: 'child',
                name: 'Subsection',
                path: '/subsection',
                parent_id: 'missing'
            }
        ];

        const resultSections = [];

        getPrimaryTree(sections, sections[0], resultSections);

        expect(resultSections).toEqual([
            {
                name: 'Subsection',
                path: '/subsection'
            }
        ]);
    });
});
