import ensureResponsiveIframe from '../../../../../../../components/features/LN/common/oEmbed/helpers/ensureResponsiveIframe';

describe('ensureResponsiveIframe', () => {
    describe('when the embed is a supported video iframe', () => {
        it('should make a horizontal youtube iframe fill the width when it has dimensions', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).toContain('width:100%');
        });

        it('should keep the native aspect ratio of a horizontal video', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:480 / 270');
        });

        it('should remove the native width attribute', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).not.toContain('width="480"');
        });

        it('should remove the native height attribute', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).not.toContain('height="270"');
        });

        it('should let the height be automatic', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).toContain('height:auto');
        });

        it('should keep the native aspect ratio of a vertical video', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="200" height="356" src="short.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:200 / 356');
        });

        it('should preserve the src attribute', () => {
            const result = ensureResponsiveIframe({
                subtype: 'vimeo',
                tagHtml:
                    '<iframe width="640" height="360" src="https://player.vimeo.com/video/123"></iframe>'
            });

            expect(result).toContain(
                'src="https://player.vimeo.com/video/123"'
            );
        });

        it('should handle single-quoted dimension attributes', () => {
            const result = ensureResponsiveIframe({
                subtype: 'dailymotion',
                tagHtml:
                    "<iframe width='480' height='270' src='video.html'></iframe>"
            });

            expect(result).toContain('aspect-ratio:480 / 270');
        });

        it('should be case insensitive for the iframe tag', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<IFRAME WIDTH="480" HEIGHT="270" SRC="video.html"></IFRAME>'
            });

            expect(result).toContain('width:100%');
        });

        it('should only replace the iframe and preserve surrounding markup', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<div class="wrap"><iframe width="480" height="270" src="video.html"></iframe></div>'
            });

            expect(result).toContain('<div class="wrap">');
        });
    });

    describe('when dimensions are missing or invalid', () => {
        it('should fall back to a 16 / 9 ratio when both dimensions are missing', () => {
            const result = ensureResponsiveIframe({
                subtype: 'vimeo',
                tagHtml: '<iframe src="video.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:16 / 9');
        });

        it('should still make the iframe fill the width when dimensions are missing', () => {
            const result = ensureResponsiveIframe({
                subtype: 'vimeo',
                tagHtml: '<iframe src="video.html"></iframe>'
            });

            expect(result).toContain('width:100%');
        });

        it('should fall back to a 16 / 9 ratio when height is zero', () => {
            const result = ensureResponsiveIframe({
                subtype: 'dailymotion',
                tagHtml:
                    '<iframe width="640" height="0" src="video.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:16 / 9');
        });

        it('should fall back to a 16 / 9 ratio when width is zero', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="0" height="356" src="video.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:16 / 9');
        });
    });

    describe('when the iframe already has a style attribute', () => {
        it('should merge the responsive style after the existing one', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" style="border:0" src="video.html"></iframe>'
            });

            expect(result).toContain('border:0;width:100%');
        });

        it('should not duplicate the semicolon when the existing style already ends with one', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" style="border:0;" src="video.html"></iframe>'
            });

            expect(result).toContain('border:0;width:100%');
        });

        it('should keep the native aspect ratio when merging into an existing style', () => {
            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml:
                    '<iframe width="480" height="270" style="border:0" src="video.html"></iframe>'
            });

            expect(result).toContain('aspect-ratio:480 / 270');
        });
    });

    describe('when the embed should not be transformed', () => {
        it('should not modify the html when the subtype is not a video embed', () => {
            const tagHtml =
                '<iframe width="480" height="270" src="post.html"></iframe>';

            const result = ensureResponsiveIframe({
                subtype: 'instagram',
                tagHtml
            });

            expect(result).toBe(tagHtml);
        });

        it('should not modify the html when there is no iframe', () => {
            const tagHtml = '<blockquote>Some content</blockquote>';

            const result = ensureResponsiveIframe({
                subtype: 'youtube',
                tagHtml
            });

            expect(result).toBe(tagHtml);
        });

        it('should return an empty string when tagHtml is undefined', () => {
            const result = ensureResponsiveIframe({ subtype: 'youtube' });

            expect(result).toBe('');
        });

        it('should not modify the html when subtype is undefined', () => {
            const result = ensureResponsiveIframe({
                tagHtml:
                    '<iframe width="480" height="270" src="video.html"></iframe>'
            });

            expect(result).toContain('<iframe width="480"');
        });
    });
});
