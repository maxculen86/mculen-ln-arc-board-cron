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
                    previewVideoUrl: 'preview.mp4',
                    poster: 'poster.jpg?width=320',
                    duration: 4003,
                    posterVideo: 'video-320.mp4'
                }
            };

            const result = carouselItem.render();

            expect(result).toEqual({
                _id: '_ID',
                title: 'Título',
                posterUrl: 'poster.jpg?width=320',
                previewVideoUrl: 'preview.mp4',
                fullVideoUrl: 'video-320.mp4',
                fullVideoDuration: 4003,
                badge: 'Chapita',
                badgeStyle: 'default'
            });
        });
    });
});
