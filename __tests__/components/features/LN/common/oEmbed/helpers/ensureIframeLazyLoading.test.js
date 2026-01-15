import ensureIframeLazyLoading from '../../../../../../../components/features/LN/common/oEmbed/helpers/ensureIframeLazyLoading';

describe('ensureIframeLazyLoading', () => {
    const baseIframeHtml = '<iframe src="video.html"></iframe>';

    it('adds loading="lazy" when subtype is supported and iframe has no loading', () => {
        const result = ensureIframeLazyLoading({
            subtype: 'youtube',
            tagHtml: baseIframeHtml
        });

        expect(result).toEqual({
            __html: '<iframe loading="lazy" src="video.html"></iframe>'
        });
    });

    it('does not modify html when subtype is not supported', () => {
        const result = ensureIframeLazyLoading({
            subtype: 'facebook',
            tagHtml: baseIframeHtml
        });

        expect(result).toEqual({
            __html: baseIframeHtml
        });
    });

    it('does not modify html when there is no iframe', () => {
        const htmlWithoutIframe = '<div>Some content</div>';

        const result = ensureIframeLazyLoading({
            subtype: 'youtube',
            tagHtml: htmlWithoutIframe
        });

        expect(result).toEqual({
            __html: htmlWithoutIframe
        });
    });

    it('overwrites loading attribute with lazy when iframe already has loading', () => {
        const iframeWithLoading =
            '<iframe loading="eager" src="video.html"></iframe>';

        const result = ensureIframeLazyLoading({
            subtype: 'youtube',
            tagHtml: iframeWithLoading
        });

        expect(result).toEqual({
            __html: '<iframe loading="lazy" src="video.html"></iframe>'
        });
    });

    it('preserves whitespace and formatting when adding loading attribute', () => {
        const formattedIframe = `<iframe
        src="video.html"
    ></iframe>`;

        const result = ensureIframeLazyLoading({
            subtype: 'vimeo',
            tagHtml: formattedIframe
        });

        expect(result.__html).toContain('loading="lazy"');
        expect(result.__html).toContain('<iframe loading="lazy"\n');
    });

    it('returns empty html when tagHtml is undefined', () => {
        const result = ensureIframeLazyLoading({
            subtype: 'youtube'
        });

        expect(result).toEqual({
            __html: ''
        });
    });
});
