import { updateResizedUrl } from '../../../../../../components/private/LN/common/utils/updateResizedUrl';

describe('Components - Private - LN - Common - utils - updateResizedUrl', () => {
    it('should update the width and height if they exist in the URL', () => {
        const url = 'https://example.com/image.jpg?width=100&height=200';
        const newWidth = '300';
        const newHeight = '400';
        const updatedUrl = updateResizedUrl(url, newWidth, newHeight);
        expect(updatedUrl).toBe(
            'https://example.com/image.jpg?width=300&height=400'
        );
    });

    it('should not change the URL if width and height do not exist', () => {
        const url = 'https://example.com/image.jpg';
        const newWidth = '300';
        const newHeight = '400';
        const updatedUrl = updateResizedUrl(url, newWidth, newHeight);
        expect(updatedUrl).toBe(url);
    });

    it('should update only the width if height does not exist', () => {
        const url = 'https://example.com/image.jpg?width=100';
        const newWidth = '300';
        const newHeight = '400';
        const updatedUrl = updateResizedUrl(url, newWidth, newHeight);
        expect(updatedUrl).toBe('https://example.com/image.jpg?width=300');
    });

    it('should update only the height if width does not exist', () => {
        const url = 'https://example.com/image.jpg?height=200';
        const newWidth = '300';
        const newHeight = '400';
        const updatedUrl = updateResizedUrl(url, newWidth, newHeight);
        expect(updatedUrl).toBe('https://example.com/image.jpg?height=400');
    });

    it('should return the original URL if an invalid URL is provided', () => {
        const url = 'invalid-url';
        const newWidth = '300';
        const newHeight = '400';
        const updatedUrl = updateResizedUrl(url, newWidth, newHeight);
        expect(updatedUrl).toBe(url);
    });
});
