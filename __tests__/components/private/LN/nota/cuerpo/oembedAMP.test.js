import React from 'react';
import { render, mount } from 'enzyme';
import OembedAMP from '../../../../../../components/private/LN/nota/cuerpo/oembedAMP';
import { checkIsFalsy } from '../../../../../../components/private/LN/nota/cuerpo/helpers/oembedAMPHelper';

describe('OembedAMP', () => {
    const data = (url, subtype) => {
        return {
            _id: 'ENSIEQ77X5DZXN63BY2PGEKDAQ',
            raw_oembed: {
                height: null,
                html: url,
                type: subtype,
                url: url,
                width: 552
            },
            subtype: subtype,
            type: 'oembed_response'
        };
    };

    const media = [
        {
            url: 'https://www.facebook.com/zuck/posts/10102593740125791',
            subtype: 'facebook-post'
        },
        {
            url: 'https://twitter.com/tinch/status/1481053797397024768?s=24',
            subtype: 'twitter'
        },
        {
            url: 'https://www.youtube.com/watch?v=5q7u6OtCA_I',
            subtype: 'youtube'
        },
        {
            url:
                'https://www.instagram.com/tv/CYhjcY3BDQS/?utm_medium=copy_link',
            subtype: 'instagram'
        },
        {
            url: 'https://www.facebook.com/zuck/posts/10102593740125791',
            subtype: 'vimeo'
        },
        {
            url: 'https://www.facebook.com/zuck/posts/10102593740125791',
            subtype: 'vine'
        },
        {
            url: 'https://www.facebook.com/zuck/posts/10102593740125791',
            subtype: 'dailymotion'
        },
        { url: '', subtype: '' }
    ];

    let component;

    afterEach(() => {
        component = null;
    });

    test.each(media)('Cheks oembed props for each social media type', media => {
        component = mount(<OembedAMP data={data(media.url, media.subtype)} />);
        expect(component.props().data).toStrictEqual(
            data(media.url, media.subtype)
        );
    });

    it('Matches snapshot', () => {
        const oembedAMP = render(
            <OembedAMP
                data={data(
                    'https://www.facebook.com/zuck/posts/10102593740125791',
                    'facebook-post'
                )}
            />
        );
        expect(oembedAMP).toMatchSnapshot();
    });

    describe('In checkIsFalsy', () => {
        const cases = [
            [
                'Should return null if the parameter is an empty string',
                '',
                null
            ],
            [
                'Should return null if the parameter is undefined',
                undefined,
                null
            ],
            [
                'Should return true if the parameter is an empty object',
                {},
                true
            ],
            ['Should return true if the parameter is an empty array', [], true],
            [
                'Should return true if the parameter is a string with content',
                'facebook-post',
                true
            ]
        ];

        test.each(cases)('%s', (message, props, data) => {
            const result = checkIsFalsy(props);
            expect(result).toEqual(data);
        });
    });
});
