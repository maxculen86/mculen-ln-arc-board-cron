import { getMediaJwData } from '../../../content/sources/utils/videoFichaJwSource/_helper';

describe('content - sources - videoFichaJwSource - helper', () => {
    const jsonData = {
        title: '+ Entrevistas - 3 de Octubre 2023',
        description: 'Video sobre entrevistas LN+',
        kind: 'Single Item',
        playlist: [
            {
                title: '+ Entrevistas - 3 de Octubre 2023',
                mediaid: '3EZXXBG4',
                pubdate: 1696422141,
                duration: 123,
                image: 'poster.jpg',
                sources: [
                    {
                        file: 'https://cdn.jwplayer.com/manifests/3EZXXBG4.m3u8',
                        type: 'application/vnd.apple.mpegurl'
                    },
                    {
                        file: 'https://cdn.jwplayer.com/videos/3EZXXBG4-kTExGaWf.mp4',
                        type: 'video/mp4',
                        height: 180,
                        width: 320,
                        label: '180p'
                    }
                ]
            }
        ]
    };

    describe('test getMediaJwData func', () => {
        it('should return the expected data', () => {
            const expectedData = {
                _id: '3EZXXBG4',
                canonical_url: '/video/mas-entrevistas-3-de-octubre-2023/',
                created_date: new Date(1696422141 * 1000),
                duration: 123,
                min_stream: {
                    url: 'https://cdn.jwplayer.com/videos/3EZXXBG4-kTExGaWf.mp4'
                },
                first_publish_date: new Date(1696422141 * 1000),
                headlines: {
                    basic: '+ Entrevistas - 3 de Octubre 2023',
                    meta_title: '+ Entrevistas - 3 de Octubre 2023'
                },
                description: {
                    basic: 'Video sobre entrevistas LN+'
                },
                publish_date: new Date(1696422141 * 1000),
                streams: jsonData.playlist[0].sources,
                promo_items: {
                    basic: {
                        embed: { config: { videoJw: { ...jsonData } } },
                        url: 'poster.jpg',
                        type: 'image'
                    }
                },
                type: 'video',
                variant: 'vertical'
            };
            expect(
                getMediaJwData(
                    JSON.stringify(jsonData),
                    '/video/mas-entrevistas-3-de-octubre-2023/'
                )
            ).toEqual(expectedData);
        });
    });
});
