import mapSectionsToLinks from '../../../../../../../components/features/LN/common/breadcrumb/helpers/mapSectionsToLinks';

describe('mapSectionsToLinks', () => {
    it('should return an array of anchor elements', () => {
        const sections = [{ name: 'Deportes', path: '/deportes' }];

        const result = mapSectionsToLinks(sections, {}, undefined);

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(1);

        const link = result[0];

        expect(link.type).toBe('a');
        expect(link.props.href).toBe('/deportes/');
        expect(link.props.title).toBe('Noticias de Deportes');
    });

    it('should use recipe text for the last recipe section', () => {
        const sections = [
            {
                name: 'Postres',
                path: '/recetas/postres',
                id: '/recetas/postres'
            }
        ];

        const result = mapSectionsToLinks(sections, {}, undefined);

        const link = result[0];

        expect(link.props.title).toBe('Recetas de postres');
        expect(link.props.children).toContain('Recetas de postres');
    });

    it('should apply extraOpts to anchor props', () => {
        const sections = [{ name: 'Deportes', path: '/deportes' }];
        const extraOpts = { 'data-section': 'test' };

        const result = mapSectionsToLinks(sections, extraOpts, undefined);

        const link = result[0];

        expect(link.props['data-section']).toBe('test');
    });
});
