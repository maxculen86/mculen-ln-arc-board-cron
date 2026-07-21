import { configCallbackContentElements } from '../../../../../content/sources/utils/articleSourceNota/_configs';
import {
    NOTICIA,
    STORYTELLING
} from '../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('content - sources - utils - articleSourceNota - _configs', () => {
    const customMultimediaElement = {
        _id: 'custom-multimedia-id',
        type: 'custom_embed',
        subtype: 'custom-multimedia',
        embed: {
            config: {
                mediaType: 'html',
                variant: '70',
                content: '<iframe></iframe>'
            }
        }
    };

    it('should keep custom multimedia embeds for storytelling notes', async () => {
        const result = await configCallbackContentElements.custom_embed({
            element: customMultimediaElement,
            subtype: STORYTELLING
        });

        expect(result).toBe(customMultimediaElement);
    });

    it('should skip custom multimedia embeds for non-storytelling notes', async () => {
        const result = await configCallbackContentElements.custom_embed({
            element: customMultimediaElement,
            subtype: NOTICIA
        });

        expect(result).toEqual({});
    });
});
