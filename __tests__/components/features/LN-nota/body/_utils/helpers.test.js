import {
    isFotoAl100,
    isVideoJw,
    isExcludedType
} from '../../../../../../components/features/LN-nota/body/_utils/helpers';
import {
    FOTOAL100,
    NOTICIA,
    RECETA
} from '../../../../../../components/private/common/utils/subtypes/subtypeHelper';

describe('Components - Features - LN-nota - Body - Utils - Helpers', () => {
    describe('isFotoAl100 function', () => {
        it('should return true when noteSubtype is "FOTOAL100" and subtypeElement is not "custom-parallax"', () => {
            expect(isFotoAl100(FOTOAL100, 'text')).toBe(true);
        });

        it('should return false when noteSubtype is not "FOTOAL100", regardless of the value of subtypeElement', () => {
            expect(isFotoAl100(RECETA, 'image')).toBe(false);
            expect(isFotoAl100('otherSubtype', 'custom-parallax')).toBe(false);
        });

        it('should return false when noteSubtype is "FOTOAL100" but subtypeElement is "custom-parallax"', () => {
            expect(isFotoAl100(FOTOAL100, 'custom-parallax')).toBe(false);
        });

        it('should return false when noteSubtype is not "FOTOAL100" and subtypeElement is "custom-parallax"', () => {
            expect(isFotoAl100(NOTICIA, 'custom-parallax')).toBe(false);
        });
    });

    describe('isVideoJw function', () => {
        it('should return true when componentElement.arcType and subtypeElement are both "video_jw"', () => {
            const componentElement = { arcType: 'video_jw' };
            const subtypeElement = 'video_jw';
            expect(isVideoJw(componentElement, subtypeElement)).toBe(true);
        });

        it('should return false when componentElement.arcType is not "video_jw"', () => {
            const componentElement = { arcType: 'text' };
            const subtypeElement = 'video_jw';
            expect(isVideoJw(componentElement, subtypeElement)).toBe(false);
        });

        it('should return false when subtypeElement is not "video_jw"', () => {
            const componentElement = { arcType: 'video_jw' };
            const subtypeElement = 'text';
            expect(isVideoJw(componentElement, subtypeElement)).toBe(false);
        });
    });
});
