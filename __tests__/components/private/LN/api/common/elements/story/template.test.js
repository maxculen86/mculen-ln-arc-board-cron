import {
    HOWTO,
    LIVEBLOG,
    NOTICIA,
    VIDEO,
    VIDEOAL100,
    FOTOAL100
} from '../../../../../../../../components/private/common/utils/subtypes/subtypeHelper';
import { getStoryTemplate } from '../../../../../../../../components/private/LN/api/common/elements/story/template';

describe('getStoryTemplate function', () => {
    it('should map LIVEBLOG to NOTICIA', () => {
        expect(getStoryTemplate(LIVEBLOG)).toBe(NOTICIA);
    });

    it('should map HOWTO to NOTICIA', () => {
        expect(getStoryTemplate(HOWTO)).toBe(NOTICIA);
    });

    it('should map VIDEOAL100 to VIDEO', () => {
        expect(getStoryTemplate(VIDEOAL100)).toBe(VIDEO);
    });

    it('should return the same templateId (FOTOAL100) when it does not exist in the map', () => {
        expect(getStoryTemplate(FOTOAL100)).toBe(FOTOAL100);
    });

    it('should return undefined when templateId is undefined', () => {
        expect(getStoryTemplate(undefined)).toBeUndefined();
    });
});
