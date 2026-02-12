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
    it('should fallback to first section if primarySection is invalid (no _id)', () => {
        const sections = [
            {
                _id: 'fallback-section',
                name: 'Fallback Section',
                path: '/fallback'
            }
        ];

        const invalidPrimarySection = { type: 'reference' };

        const result = buildBreadcrumbSections({
            sections,
            primarySection: invalidPrimarySection,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'Fallback Section',
                path: '/fallback'
            }
        ]);
    });
    it('should hydrate primarySection from sections list if name is missing but ID exists', () => {
        const primaryId = 'section-id';
        const sections = [
            {
                _id: primaryId,
                name: 'Hydrated Section Name',
                path: '/hydrated-path'
            }
        ];

        const incompletePrimarySection = {
            _id: primaryId,
            path: '/hydrated-path',
            name: '' // Missing name
        };

        const result = buildBreadcrumbSections({
            sections,
            primarySection: incompletePrimarySection,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'Hydrated Section Name',
                path: '/hydrated-path'
            }
        ]);
    });

    it('should fallback to first valid section if primarySection is completely invalid (no ID)', () => {
        const sections = [
            {
                _id: 'valid-section',
                name: 'Fallback Section',
                path: '/fallback'
            }
        ];

        const invalidPrimarySection = { type: 'reference' }; // No _id

        const result = buildBreadcrumbSections({
            sections,
            primarySection: invalidPrimarySection,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'Fallback Section',
                path: '/fallback'
            }
        ]);
    });
    it('should fallback to first valid section (with name) if primarySection is invalid', () => {
        const sections = [
            {
                _id: 'invalid-section',
                name: '',
                path: '/invalid'
            },
            {
                _id: 'valid-section',
                name: 'Valid Section',
                path: '/valid'
            }
        ];

        const invalidPrimarySection = { type: 'reference' };

        const result = buildBreadcrumbSections({
            sections,
            primarySection: invalidPrimarySection,
            siteTitle: 'LA NACION'
        });

        expect(result).toEqual([
            {
                name: 'LA NACION',
                path: '/'
            },
            {
                name: 'Valid Section',
                path: '/valid'
            }
        ]);
    });
});
