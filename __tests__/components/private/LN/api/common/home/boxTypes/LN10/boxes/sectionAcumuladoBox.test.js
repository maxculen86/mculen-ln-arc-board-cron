import { sectionAcuBox } from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10/boxes/sectionAcumuladoBox';

describe('sectionAcumuladoBox LN10', () => {
    it('should return null when element is null', () => {
        expect(sectionAcuBox(null)).toBeNull();
    });

    it('should return null when element has no sectionAccumulated property', () => {
        const element = {};
        expect(sectionAcuBox(element)).toBeNull();
    });

    it('should return null when element.sectionAccumulated is an empty array', () => {
        const element = { sectionAccumulated: [] };
        expect(sectionAcuBox(element)).toBeNull();
    });

    it('should return the first element of element.sectionAccumulated array', () => {
        const element = { sectionAccumulated: [1, 2, 3] };
        expect(sectionAcuBox(element)).toBe(1);
    });
});
