import { validatePropsRender } from '../../../../../../../../../../../components/private/LN/api/global/components/features/article/LN10/props/validatePropsRender';
describe('validatePropsRender', () => {
    it('should throw an error if props are missing', () => {
        expect(() => {
            validatePropsRender({}, {}, {}, null, {});
        }).toThrow(TypeError);
    });

    it('should return the correct props with hideAuthors set to true', () => {
        const result = validatePropsRender(
            { credits: { by: ['John Doe', 'Jane Doe'] } },
            {},
            {},
            {
                customFields: { hideAuthors: true }
            },
            {}
        );
        expect(result.propsRender.customFields.authors).toBeNull();
        expect(result.propsRender.customFields.variant).toBe('regular');
        expect(result.articleSourceNotaRender).toEqual({}); // articleSourceNota without the credits property
        expect(result.articleImageRender).toEqual({});
        expect(result.articleVideoRender).toEqual({});
    });

    it('should return the correct props with hideImage set to true', () => {
        const result = validatePropsRender(
            {},
            {},
            {},
            {
                customFields: { hideImage: true }
            },
            {}
        );
        expect(result.articleImageRender).toBeNull();
    });

    it('should return the correct props with variant set to author and one author', () => {
        const result = validatePropsRender(
            { credits: { by: ['John Doe'] } },
            {},
            {},
            {
                customFields: { variant: 'author' }
            },
            {}
        );
        expect(result.propsRender.customFields.imageId).toBeNull();
        expect(result.propsRender.customFields.video).toBeNull();
        expect(result.articleImageRender).toBeNull();
        expect(result.articleVideoRender).toBeNull();
        expect(result.propsRender.customFields.variant).toBe('author');
    });

    it('should return the correct props with variant set to author and multiple authors', () => {
        const result = validatePropsRender(
            { credits: { by: ['John Doe', 'Jane Doe'] } },
            {},
            {},
            {
                customFields: { variant: 'author' }
            },
            {}
        );
        expect(result.propsRender.customFields.variant).toBe('regular');
    });
});
