import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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
            subtype: 'facebook'
        },
        {
            url: 'https://twitter.com/tinch/status/1481053797397024768?s=24',
            subtype: 'twitter'
        },
        {
            url: 'https://www.youtube.com/embed/ZJD2y7u1mQA?feature=oembed',
            subtype: 'youtube'
        },
        {
            url:
                'https://www.instagram.com/tv/CYhjcY3BDQS/?utm_medium=copy_link',
            subtype: 'instagram'
        },
        {
            url:
                'https://player.vimeo.com/video/747666103?h=2c819739d8&amp;app_id=122963',
            subtype: 'vimeo'
        },
        {
            url: 'https://vine.co/v/5j0jHBdqerF/embed/simple',
            subtype: 'vine'
        },
        {
            url:
                'https://www.dailymotion.com/embed/video/x589c8d?pubtool=oembed',
            subtype: 'dailymotion'
        }
    ];

    const mediaError = media.map(({ subtype }) => ({
        url: 'https://www.mock-wrong-urls.com/embebidos/prueba',
        subtype
    }));

    test.each(media)('Cheks oembed props for each social media type', media => {
        const { container } = render(
            <OembedAMP data={data(media.url, media.subtype)} />
        );
        expect(
            container.getElementsByClassName(`com-embed --${media.subtype}`)
        ).toBeTruthy();
        expect(
            container.getElementsByTagName(`amp-${media.subtype}`)
        ).toBeTruthy();
    });

    test.each(mediaError)('Should not break or throw error', mediaError => {
        const component = render(
            <OembedAMP data={data(mediaError.url, mediaError.subtype)} />
        );
        const { container } = component;
        expect(() => component).not.toThrow();
        expect(
            screen.queryByRole(`amp-${mediaError.subtype}`)
        ).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
    });

    it('Matches snapshot', () => {
        const { container } = render(
            <OembedAMP
                data={data(
                    'https://www.facebook.com/zuck/posts/10102593740125791',
                    'facebook-post'
                )}
            />
        );
        expect(container).toMatchSnapshot();
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
