import LN10HomeLayout from '../../../../components/layouts/LN10-Home_Main/json';
import LN10HomeSections from '../../../../components/layouts/config/LN10-PageBuilder.config.json';

jest.mock('fusion:consumer', () => {
    return Component => Component;
});

describe('LN10Home layout test', () => {
    const arcSite = 'la-nacion-ar';
    describe('Carousel test', () => {
        it('Renders mobile section ln10_caja_carrusel', () => {
            const children = LN10HomeSections.map(() => []);
            const sectionIdx = LN10HomeSections.indexOf('Breaking_1');
            const carouselFeatureRenderable = {
                collection: 'features',
                type: 'LN-10/itemCarrusel',
                props: {
                    collection: 'features',
                    type: 'LN-10/itemCarrusel',
                    id: 'f0fVUeqDERPH5Wj'
                }
            };
            const carouselChainRenderable = {
                collection: 'chains',
                type: 'LN10_Caja_Carrusel',
                props: {
                    collection: 'chains',
                    type: 'LN10_Caja_Carrusel',
                    id: 'c0ft4SpFfd1g5VC'
                },
                children: [carouselFeatureRenderable]
            };
            const sectionRenderable = {
                collection: 'sections',
                props: { collection: 'sections', id: sectionIdx },
                children: [carouselChainRenderable]
            };
            const layoutRenderable = {
                collection: 'layouts',
                type: 'LN10-Home_Main',
                props: {
                    collection: 'layouts',
                    type: 'LN10-Home_Main',
                    id: 'LN10-Home_Main'
                },
                children: [sectionRenderable]
            };
            const renderables = [
                layoutRenderable,
                sectionRenderable,
                carouselChainRenderable,
                carouselFeatureRenderable
            ];
            const title = 'Carrusel';
            const link = 'https://www.lanacion.com.ar/lifestyle/';
            const videos = [
                {
                    _id: '_ID',
                    title: 'Título',
                    posterUrl: 'poster.jpg?width=320',
                    previewVideoUrl: 'poster-video-320.mp4',
                    fullVideoUrl: 'playlist.m3u8',
                    fullVideoDuration: 4003,
                    badge: 'Chapita',
                    badgeStyle: 'default'
                }
            ];
            children[sectionIdx] = [
                {
                    information: { title, link },
                    videos
                }
            ];

            const result = LN10HomeLayout({
                arcSite,
                children,
                renderables
            });
            const [section] = result.content_elements;

            expect(section).toEqual(
                expect.objectContaining({
                    videos,
                    configurations: expect.objectContaining({ arcSite }),
                    sectionAliasMobile: 'ln10_caja_carrusel',
                    information: expect.objectContaining({ title, link }),
                    type: expect.any(Number),
                    sectionWeb: 'Breaking_1'
                })
            );
        });
    });
});
