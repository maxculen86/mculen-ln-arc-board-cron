import removeHtmlTags from '../../../../../components/private/common/utils/removeHtmlTags';

describe('removeHtmlTags', () => {
    it('should remove a single simple HTML tag', () => {
        const input = '<p>Simple text</p>';
        const result = removeHtmlTags(input);
        expect(result).toBe('Simple text');
    });

    it('should remove multiple nested HTML tags', () => {
        const input = '<div><p>Text with <strong>tags</strong></p></div>';
        const result = removeHtmlTags(input);
        expect(result).toBe('Text with tags');
    });

    it('should remove empty HTML tags', () => {
        const input = '<div>Text with <span></span> empty tags</div>';
        const result = removeHtmlTags(input);
        expect(result).toBe('Text with  empty tags');
    });

    it('should return the original string if there are no HTML tags', () => {
        const input = 'Text without HTML tags';
        const result = removeHtmlTags(input);
        expect(result).toBe(input);
    });

    it('should handle an empty string without errors', () => {
        const input = '';
        const result = removeHtmlTags(input);
        expect(result).toBe('');
    });

    it('should remove multiple types of HTML tags', () => {
        const input =
            "<h1>Title</h1><p>This is a <em>paragraph</em> with <a href='#'>link</a>.</p>";
        const result = removeHtmlTags(input);
        expect(result).toBe('TitleThis is a paragraph with link.');
    });
});
