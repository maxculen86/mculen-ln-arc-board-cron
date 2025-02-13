import CarouselFeature from '../../../../../components/features/LN-10/itemCarrusel/json';

jest.mock('fusion:consumer', () => {
    return Component =>
        class extends Component {
            fetchContent() {
                void 0;
            }
        };
});

describe('Carousel Feature test', () => {
    const arcSite = 'la-nacion-ar';
    describe('Given an invalid video ID', () => {
        it('Renders null', () => {
            const carouselItem = new CarouselFeature({
                arcSite,
                customFields: {
                    video: ' ',
                    title: 'Título',
                    chapita: 'Chapita'
                }
            });

            const result = carouselItem.render();

            expect(result).toBeNull();
        });
    });

    describe('Given an non-existent video ID', () => {
        it('Renders null', () => {
            const carouselItem = new CarouselFeature({
                arcSite,
                customFields: {
                    video: '000000',
                    title: 'Título',
                    chapita: 'Chapita'
                }
            });

            const result = carouselItem.render();

            expect(result).toBeNull();
        });
    });

    describe('Given an existent video ID', () => {
        it('Renders the correct object', () => {
            const carouselItem = new CarouselFeature({
                arcSite,
                customFields: {
                    video: '000000',
                    title: 'Título',
                    chapita: 'Chapita'
                }
            });
            carouselItem.state = {
                [carouselItem.contentKey]: {
                    _id: '_ID',
                    poster: 'poster.jpg?width=320',
                    duration: 4003,
                    posterVideo: 'poster-video-320.mp4',
                    sources: [
                        {
                            file: 'playlist.m3u8',
                            type: 'application/vnd.apple.mpegurl'
                        },
                        {
                            file: 'video-180.mp4',
                            type: 'video/mp4',
                            height: 180,
                            width: 320,
                            label: '180p',
                            bitrate: 245727,
                            filesize: 61001753,
                            framerate: 25
                        }
                    ],
                }
            };

            const result = carouselItem.render();

            expect(result).toEqual({
                _id: '_ID',
                title: 'Título',
                posterUrl: 'poster.jpg?width=320',
                previewVideoUrl: 'poster-video-320.mp4',
                fullVideoUrl: 'playlist.m3u8',
                fullVideoDuration: 4003,
                badge: 'Chapita',
                badgeStyle: 'default',
                jwVideoId: '000000',
            });
        });
    });
});
