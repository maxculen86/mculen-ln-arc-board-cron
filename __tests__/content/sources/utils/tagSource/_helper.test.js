import { extractIdFromImageUrl } from '../../../../../content/sources/utils/tagSource/_helper';

describe('Tests - tagSource - Helper', () => {
    describe('Tests function extractIdFromImageUrl', () => {
        it('If receive a valid URL, should return the ID it contains', () => {
            const validUrl =
                'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/M4TPZ7LJKNDAFAWYPLGYU5JZMA.jpg';
            const imageId = extractIdFromImageUrl(validUrl);
            expect(imageId).toStrictEqual('M4TPZ7LJKNDAFAWYPLGYU5JZMA');
        });
        it('If receive an invalid URL, should return null', () => {
            const invalidUrl =
                'https://cloudfront-us-east-1.images.arcpublishing.com/M4TPZ7LJKNDAFAWYPLGYU5JZMA.jpg';
            const imageId = extractIdFromImageUrl(invalidUrl);
            expect(imageId).toBeNull();
        });

        it('If receive an empty URL, should return null', () => {
            const invalidUrl = '';
            const imageId = extractIdFromImageUrl(invalidUrl);
            expect(imageId).toBeNull();
        });
    });
});
