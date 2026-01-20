import CarouselHorizontalChain from '../../../../components/chains/LN10_Caja_Carrusel_Horizontal/json';
import isTodayEnabled from '../../../../components/chains/utils/isTodayEnabled';

jest.mock('fusion:consumer', () => {
    return Component =>
        class extends Component {
            fetchContent() {
                void 0;
            }
        };
});

jest.mock('../../../../components/chains/utils/isTodayEnabled', () =>
    jest.fn()
);

describe('Carousel horizontal Chain test', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
        isTodayEnabled.mockReturnValue(true);
    });

    afterEach(() => {
        console.warn.mockRestore();
    });

    describe('Given a hidden carousel', () => {
        it('Renders null', () => {
            const carousel = new CarouselHorizontalChain({
                customFields: {
                    hideCarousel: true
                }
            });

            const result = carousel.render();

            expect(result).toBeNull();
        });
    });

    describe('Given a visible carousel', () => {
        const carouselItemRenderable = {
            collection: 'features',
            props: {
                type: 'LN-10/itemCarruselHorizontal'
            }
        };
        const id = 'carouselID';
        it('Renders null when carousel items are less than 5', () => {
            const carousel = new CarouselHorizontalChain({
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [],
                customFields: {}
            });

            const result = carousel.render();

            expect(result).toBeNull();
        });

        it('Renders null when some carousel items are not of itemCarrusel type', () => {
            const articleRenderable = {
                collection: 'features',
                props: {
                    type: 'LN-10/article'
                }
            };
            const carousel = new CarouselHorizontalChain({
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            articleRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                layout: 'LN10-Home_Main',
                children: [],
                customFields: {
                    enabledDays: ['lunes', 'martes']
                }
            });

            const result = carousel.render();

            expect(result).toBeNull();
        });

        it('Renders the correct object when items are between 5 and 10', () => {
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    { _id: 'Video2' },
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    enabledDays: ['lunes', 'martes']
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);

            const result = carousel.render();

            expect(result).toEqual({
                information: {
                    title: carouselProps.customFields.title,
                    link: carouselProps.customFields.link,
                    logoId: carouselProps.customFields.logoId,
                    buttonLogo: carouselProps.customFields.buttonLogo,
                    isHorizontal: true
                },
                videos: carouselProps.children
            });
        });

        it('Renders up to 10 videos when carousel items are more than 10', () => {
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    { _id: 'Video2' },
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' },
                    { _id: 'Video6' },
                    { _id: 'Video7' },
                    { _id: 'Video8' },
                    { _id: 'Video9' },
                    { _id: 'Video10' },
                    { _id: 'Video11' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    enabledDays: ['lunes', 'martes']
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const expectedChildren = [...carouselProps.children];
            expectedChildren.pop();

            const result = carousel.render();

            expect(result).toEqual({
                information: {
                    title: carouselProps.customFields.title,
                    link: carouselProps.customFields.link,
                    isHorizontal: true
                },
                videos: expectedChildren
            });
        });

        it('Does not render null children', () => {
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    null,
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' },
                    { _id: 'Video6' },
                    { _id: 'Video7' },
                    { _id: 'Video8' },
                    { _id: 'Video9' },
                    { _id: 'Video10' },
                    { _id: 'Video11' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    enabledDays: ['lunes', 'martes'],
                    isHorizontal: true
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const expectedChildren = [
                carouselProps.children[0],
                carouselProps.children[2],
                carouselProps.children[3],
                carouselProps.children[4],
                carouselProps.children[5],
                carouselProps.children[6],
                carouselProps.children[7],
                carouselProps.children[8],
                carouselProps.children[9],
                carouselProps.children[10],
                carouselProps.children[11]
            ];

            const result = carousel.render();

            expect(result).toEqual({
                information: {
                    isHorizontal: true,
                    title: carouselProps.customFields.title,
                    link: carouselProps.customFields.link,
                    logoId: carouselProps.customFields.logoId,
                    buttonLogo: carouselProps.customFields.buttonLogo

                },
                videos: expectedChildren
            });
        });

        it('Should render logoId and buttonLogo Custom Fields', () => {
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    null,
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' },
                    { _id: 'Video6' },
                    { _id: 'Video7' },
                    { _id: 'Video8' },
                    { _id: 'Video9' },
                    { _id: 'Video10' },
                    { _id: 'Video11' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    logoId: 'logoId',
                    buttonLogo: 'buttonLogo',
                    enabledDays: ['lunes', 'martes']
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const result = carousel.render();

            expect(result.information).toEqual({
                title: carouselProps.customFields.title,
                link: carouselProps.customFields.link,
                logoId: carouselProps.customFields.logoId,
                buttonLogo: carouselProps.customFields.buttonLogo,
                isHorizontal: true
            });
        });

        it('Should render isTodayEnabled is false and layout not is home', () => {
            isTodayEnabled.mockReturnValue(false);
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    null,
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' },
                    { _id: 'Video6' },
                    { _id: 'Video7' },
                    { _id: 'Video8' },
                    { _id: 'Video9' },
                    { _id: 'Video10' },
                    { _id: 'Video11' }
                ],
                layout: 'LN10-Deportes',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/'
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const result = carousel.render();

            expect(result.information).toEqual({
                title: carouselProps.customFields.title,
                link: carouselProps.customFields.link,
                logoId: carouselProps.customFields.logoId,
                buttonLogo: carouselProps.customFields.buttonLogo,
                isHorizontal: true
            });
        });

        it('Should render null when isTodayEnabled is false and layout is home', () => {
            isTodayEnabled.mockReturnValue(false);
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    { _id: 'Video2' },
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    enabledDays: ['lunes', 'martes'],
                    shouldSchedule: true
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const result = carousel.render();

            expect(result).toBeNull();
        });

        it('Should render null when enableDays lenght is 0', () => {
            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    {
                        _id: 'Video1',
                        previewVideoUrl: 'preview.mp4',
                        poster: 'poster.jpg?width=320',
                        duration: 4003,
                        posterVideo: 'video-320.mp4',
                        badgeStyle: 'default'
                    },
                    { _id: 'Video2' },
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    shouldSchedule: true,
                    enabledDays: []
                }
            };
            const carousel = new CarouselHorizontalChain(carouselProps);
            const result = carousel.render();

            expect(result).toBeNull();
        });
        it('Should ignore enabledDays when shouldSchedule is false', () => {
            isTodayEnabled.mockReturnValue(false);

            const carouselProps = {
                id,
                renderables: [
                    {
                        collection: 'sections',
                        props: { id: 'sectionID' }
                    },
                    {
                        collection: 'chains',
                        type: 'LN10_Caja_Carrusel_Horizontal',
                        props: { id },
                        children: [
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable,
                            carouselItemRenderable
                        ]
                    }
                ],
                children: [
                    { _id: 'Video1' },
                    { _id: 'Video2' },
                    { _id: 'Video3' },
                    { _id: 'Video4' },
                    { _id: 'Video5' }
                ],
                layout: 'LN10-Home_Main',
                customFields: {
                    title: 'Carrusel',
                    link: 'https://www.lanacion.com.ar/lifestyle/',
                    enabledDays: [],
                    shouldSchedule: false
                }
            };

            const carousel = new CarouselHorizontalChain(carouselProps);
            const result = carousel.render();

            expect(result).not.toBeNull();
        });
    });


});
