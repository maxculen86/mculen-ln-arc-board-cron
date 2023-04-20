import renderProps from '../../../../../../../../../../components/private/LN/api/global/components/features/article/LN10/renderProps';

describe('renderProps', () => {
    const articleSourceNota = {
        id: 'article_id',
        title: 'Article title',
        customFields: {
            noteId: 'note_id',
            authors: 'author_name',
            customField1: 'custom_value_1',
            customField2: 'custom_value_2'
        }
    };
    const articleImage = {
        url: 'http://example.com/image.png'
    };
    const articleVideo = {
        url: 'http://example.com/video.mp4'
    };
    const props = {
        customFields: {
            noteId: 'note_id',
            title: 'Article title',
            authors: 'author_name',
            lead: 'Article lead',
            chapita: 'Article chapita',
            opinion: 'Article opinion',
            html: '<p>Article content</p>',
            variant: 'regular',
            chapitaStyle: 'chapita_style'
        }
    };
    const configs = {};

    it('should return null when articleSourceNota is not defined', () => {
        const result = renderProps(
            undefined,
            articleImage,
            articleVideo,
            props,
            configs
        );
        expect(result).toBeNull();
    });

    it('should return null when props or customFields is not defined', () => {
        const result = renderProps(
            articleSourceNota,
            articleImage,
            articleVideo,
            {},
            configs
        );
        expect(result).toBeNull();
    });

    it('should add additionalProperties to articleSourceNota', () => {
        const result = renderProps(
            articleSourceNota,
            articleImage,
            articleVideo,
            props,
            configs
        );
        expect(result).toEqual({
            ...articleSourceNota,
            additionalProperties: {
                noteId: 'note_id',
                title: 'Article title',
                authors: 'author_name',
                lead: 'Article lead',
                chapita: 'Article chapita',
                opinion: 'Article opinion',
                image: articleImage,
                video: articleVideo,
                html: '<p>Article content</p>',
                variant: 'regular',
                chapitaStyle: 'chapita_style',
                idRender: undefined
            }
        });
    });
});
