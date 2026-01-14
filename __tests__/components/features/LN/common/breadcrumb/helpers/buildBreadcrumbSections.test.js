import buildBreadcrumbSections from '../../../../../../../components/features/LN/common/breadcrumb/helpers/buildBreadcrumbSections';

describe('buildBreadcrumbSections', () => {
    it('should return only the site root section when primarySection is not provided', () => {
        const result = buildBreadcrumbSections({
            sections: [],
            primarySection: undefined,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            }
        ]);
    });

    it('should return the primary section and the site root when primarySection has no parent', () => {
        const primarySection = {
            _id: 'deportes',
            name: 'Deportes',
            path: '/deportes'
        };

        const result = buildBreadcrumbSections({
            sections: [primarySection],
            primarySection: primarySection,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'Deportes',
                path: '/deportes'
            }
        ]);
    });

    it('should build the full breadcrumb hierarchy when primarySection has parents', () => {
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

        const result = buildBreadcrumbSections({
            sections,
            primarySection: sections[2],
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'News',
                path: '/news'
            },
            {
                name: 'Politics',
                path: '/news/politics'
            },
            {
                name: 'Elections',
                path: '/news/politics/elections'
            }
        ]);
    });
});
