import { renderProps } from '../../../../../../../../../../components/private/LN/api/global/components/features/article/LN/renderProps';
describe('renderProps LN9', () => {
    it('returns null if articleSourceNota is not defined', () => {
        const result = renderProps(undefined, null, null, {});
        expect(result).toBeNull();
    });
    it('returns null if props.customFields is not defined', () => {
        const result = renderProps({}, null, null, {});
        expect(result).toBeNull();
    });
    it('returns an object with additionalProperties if articleSourceNota and props.customFields are defined', () => {
        const result = renderProps(
            { some: 'data' },
            { some: 'image' },
            { some: 'video' },
            { customFields: { noteId: 123, title: 'Title' } }
        );
        expect(result).toEqual({
            some: 'data',
            additionalProperties: {
                noteId: 123,
                title: 'Title',
                authors: undefined,
                lead: undefined,
                chapita: undefined,
                opinion: undefined,
                image: { some: 'image' },
                video: { some: 'video' },
                html: undefined,
                variant: undefined,
                idRender: undefined
            }
        });
    });
    it('returns additionalProperties with null for image and video if not provided', () => {
        const result = renderProps({ some: 'data' }, null, undefined, {
            customFields: { noteId: 123, title: 'Title' }
        });
        expect(result).toEqual({
            some: 'data',
            additionalProperties: {
                noteId: 123,
                title: 'Title',
                authors: undefined,
                lead: undefined,
                chapita: undefined,
                opinion: undefined,
                image: null,
                video: null,
                html: undefined,
                variant: undefined,
                idRender: undefined
            }
        });
    });
});
