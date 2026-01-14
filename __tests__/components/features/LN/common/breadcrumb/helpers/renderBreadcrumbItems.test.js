import renderBreadcrumbItems from '../../../../../../../components/features/LN/common/breadcrumb/helpers/renderBreadcrumbItems';

describe('renderBreadcrumbItems', () => {
    it('should render all sections as links when lastLinked is true', () => {
        const sections = [
            { name: 'Home', path: '/' },
            { name: 'Deportes', path: '/deportes' }
        ];

        const result = renderBreadcrumbItems({
            sections,
            lastLinked: true,
            extraOpts: {},
            host: undefined
        });

        expect(result).toHaveLength(2);

        result.forEach(item => {
            expect(item.type).toBe('a');
        });
    });

    it('should render all except the last section as links and render the last one as text when lastLinked is false', () => {
        const sections = [
            { name: 'Home', path: '/' },
            { name: 'Deportes', path: '/deportes' }
        ];

        const result = renderBreadcrumbItems({
            sections,
            lastLinked: false,
            extraOpts: {},
            host: undefined
        });

        expect(result).toHaveLength(2);

        const [firstItem, lastItem] = result;

        expect(firstItem.type).toBe('a');

        expect(lastItem.type).toBe('span');
        expect(lastItem.key).toBe(sections[1].path);
        expect(lastItem.props.children).toContain('Deportes');
    });

    it('should return an empty array when sections is empty', () => {
        const result = renderBreadcrumbItems({
            sections: [],
            lastLinked: false,
            extraOpts: {},
            host: undefined
        });

        expect(result).toEqual([]);
    });

    it('should render a single section as text when there is only one section and lastLinked is false', () => {
        const sections = [{ name: 'Opinion', path: '/opinion' }];

        const result = renderBreadcrumbItems({
            sections,
            lastLinked: false,
            extraOpts: {},
            host: undefined
        });

        expect(result).toHaveLength(1);

        const item = result[0];

        expect(item.type).toBe('span');
        expect(item.props.children).toContain('Opinion');
    });

    it('should render a single section as link when there is only one section and lastLinked is true', () => {
        const sections = [{ name: 'Opinion', path: '/opinion' }];

        const result = renderBreadcrumbItems({
            sections,
            lastLinked: true,
            extraOpts: {},
            host: undefined
        });

        expect(result).toHaveLength(1);
        expect(result[0].type).toBe('a');
    });
});
