import {
    jwURLFormatter,
    transform
} from '../../../../../content/sources/utils/ottJwVideoTransform/jwVideoTransform';

describe('jwVideoTransform', () => {
    describe('transform', () => {
        describe('when it receives the correct data', () => {
            test('should return array with schema at Ans Arc', () => {
                const data = {
                    media: [
                        {
                            id: 'wil1234',
                            metadata: {
                                title: 'Noticiero AM',
                                publish_start_date: '2023-04-29T22:46:10+00:00'
                            }
                        }
                    ]
                };

                const expectDataFormatterd = {
                    jwVideosformatted: [
                        {
                            _id: 'wil1234',
                            canonical_url: '/video/noticiero-am-jwidwil1234',
                            first_publish_date: '2023-04-29T22:46:10+00:00',
                            headlines: { basic: 'Noticiero AM' },
                            promo_items: {
                                basic: {
                                    url:
                                        'https://cdn.jwplayer.com/v2/media/wil1234/poster.jpg?width=720'
                                }
                            },
                            resized_url:
                                'https://cdn.jwplayer.com/v2/media/wil1234/poster.jpg?width=720',
                            website_url: '/video/noticiero-am-jwidwil1234'
                        }
                    ],
                    page: '',
                    pageLength: '',
                    total: ''
                };

                expect(transform({ data })).toEqual(expectDataFormatterd);
            });
        });

        describe('when it receives the incorrect data', () => {
            test('should return empty array ', () => {
                const data = { hola: 'soy Batman' };
                expect(transform({ data })).toEqual({
                    jwVideosformatted: [],
                    page: '',
                    pageLength: '',
                    total: ''
                });
            });
        });
    });

    describe('jwURLFormatter', () => {
        test('Should return a formatted URL with name and JWID at the end', () => {
            const jwVideoId = 'abc123';
            const videoTitle = 'Noticiero AM';
            const result = jwURLFormatter({ videoTitle, videoId: jwVideoId });

            expect(result).toBe('/video/noticiero-am-jwidabc123');
        });

        test('Should return a formatted URL without name and JWID at the end', () => {
            const result = jwURLFormatter({});
            expect(result).toBe('/video/-jwid');
        });
    });
});
