import { isHeaderNegative } from '../../../../../components/private/LN10/header/_helper';
describe('Tests function isHeaderNegative', () => {
    const layoutsName = {
        FotoAl100: 'LN-nota-foto-al-100',
        StoryTelling: 'LN-nota-storytelling',
        Video: 'LN-nota-video'
    };
    it('should return true when layout is in the validations array', () => {
        const params = {
            layout: 'LN-nota-foto-al-100',
            section: '',
            layoutsName
        };

        expect(isHeaderNegative(params)).toBe(true);
    });
    it('should return true when section is in the validations array', () => {
        const params = {
            layout: 'otherLayout',
            section: '/revista-hola',
            layoutsName
        };

        expect(isHeaderNegative(params)).toBe(true);
    });

    it('should return false when layout or section is not in the validations array', () => {
        const params = {
            layout: 'OtherLayout',
            section: '',
            layoutsName
        };
        expect(isHeaderNegative(params)).toBe(false);
    });
});
