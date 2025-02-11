import LNAcumuladoLayout from '../../../../components/layouts/LN-acumulado/json';
import LNAcumuladoSections from '../../../../components/layouts/config/LN-Acumulado-PageBuilder.config.json';

jest.mock('fusion:consumer', () => {
    return Component => Component;
});

describe('LNAcumulado layout test', () => {
    const arcSite = 'la-nacion-ar';
    describe('Carousel test', () => {
        it('Renders mobile section ln10_caja_carrusel', () => {
            const children = LNAcumuladoSections.map(() => []);
            const sectionIdx = LNAcumuladoSections.indexOf('Notas');
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
                type: 'LN-Acumulado',
                props: {
                    collection: 'layouts',
                    type: 'LN-Acumulado',
                    id: 'LN-Acumulado'
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
                    previewVideoUrl: 'preview.mp4',
                    fullVideoUrl: 'video-320.mp4',
                    fullVideoDuration: 4003,
                    badge: 'Chapita',
                    badgeStyle: 'default',
                    jwVideoId: '000000',
                }
            ];
            children[sectionIdx] = [
                {
                    information: { title, link },
                    videos
                }
            ];

            const result = LNAcumuladoLayout({
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
                    sectionWeb: 'Notas'
                })
            );
        });
    });
});
