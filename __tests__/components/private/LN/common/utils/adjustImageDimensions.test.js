import { adjustImageDimensions } from '../../../../../../components/private/LN/common/utils/adjustImageDimensions';

describe('Components - Private - LN - Common - utils - adjustImageDimensions', () => {
    it('adjusts dimensions correctly with default newWidth', () => {
        const result = adjustImageDimensions(1920, 1080);
        expect(result).toEqual({ newWidth: 1280, newHeight: 720 });
    });

    it('adjusts dimensions correctly with specified newWidth', () => {
        const result = adjustImageDimensions(1920, 1080, 640);
        expect(result).toEqual({ newWidth: 640, newHeight: 360 });
    });

    it('if strings are passed as parameters, it converts them to numbers correctly', () => {
        const result = adjustImageDimensions('1920', '1080');
        expect(result).toEqual({ newWidth: 1280, newHeight: 720 });
    });
});
