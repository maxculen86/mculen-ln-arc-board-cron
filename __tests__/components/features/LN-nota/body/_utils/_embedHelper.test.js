import { transformEmbedScript } from '../../../../../../components/features/LN-nota/body/_utils/_embedHelper';

describe('Components - Features - LN-nota - _utils - _embedHelper', () => {
    it('should test replaceOembedScript func', () => {
        const elementWithScript = {
            _id: '6WBYOLW3UNABJA6Q3RVIT5TVJQ',
            raw_oembed: {
                height: null,
                html:
                    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">So chonky! 😍 <a href="https://t.co/NT8Md14dDS">pic.twitter.com/NT8Md14dDS</a></p>&mdash; chonky animals 🐾 (@chonkyanimalx) <a href="https://twitter.com/chonkyanimalx/status/1583162541764923392?ref_src=twsrc%5Etfw">October 20, 2022</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
                type: 'twitter',
                url:
                    'https://twitter.com/chonkyanimalx/status/1583162541764923392',
                width: 550
            },
            subtype: 'twitter',
            type: 'oembed_response'
        };
        expect(transformEmbedScript(elementWithScript)).toStrictEqual({
            _id: '6WBYOLW3UNABJA6Q3RVIT5TVJQ',
            raw_oembed: {
                height: null,
                html:
                    '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">So chonky! 😍 <a href="https://t.co/NT8Md14dDS">pic.twitter.com/NT8Md14dDS</a></p>&mdash; chonky animals 🐾 (@chonkyanimalx) <a href="https://twitter.com/chonkyanimalx/status/1583162541764923392?ref_src=twsrc%5Etfw">October 20, 2022</a></blockquote>\n\n',
                type: 'twitter',
                url:
                    'https://twitter.com/chonkyanimalx/status/1583162541764923392',
                width: 550
            },
            subtype: 'twitter',
            type: 'oembed_response'
        });
    });
});
