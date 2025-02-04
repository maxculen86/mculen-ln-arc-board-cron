import carouselBox from '../../../../../../../../../../components/private/LN/api/common/home/boxTypes/LN10v2/boxes/carouselBox';

describe('Carousel Box test', () => {
    const carouselSection = {
        type: 10,
        sectionAliasMobile: 'ln10_caja_carrusel',
        information: {
            title: 'Título',
            link: 'https://www.lanacion.com.ar/lifestyle/',
            nameChain: 'LN10_Caja_Carrusel',
            idRender: 'c0ft4SpFfd1g5VC'
        },
        videos: [
            {
                _id: '4c2089568f39a4311692c2231c39ab5d537a341aa2e2e83f3771db93855b3a82',
                title: 'ITEM 1 CARRUSEL',
                posterUrl: 'https://cdn.jwplayer.com/v2/media/kkWdaX2X/poster.jpg?width=320',
                previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/96e67bif-320.mp4',
                fullVideoUrl: 'https://cdn.jwplayer.com/manifests/kkWdaX2X.m3u8',
                fullVideoDuration: 9056,
                badge: 'CHAPITA 1',
                badgeStyle: 'default'
            },
            {
                _id: '77c706ae79a5c674ed24ec2a08d85a2c9429156b318c0131f5f04d81ed0de819',
                title: 'ITEM 2 CARRUSEL',
                posterUrl: 'https://cdn.jwplayer.com/v2/media/sfEt1cNK/poster.jpg?width=320',
                previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/s8qk6z3z-320.mp4',
                fullVideoUrl: 'https://cdn.jwplayer.com/manifests/sfEt1cNK.m3u8',
                fullVideoDuration: 110,
                badge: 'Chapita 2',
                badgeStyle: 'default'
            },
            {
                _id: 'd962a4ea0f1954896b5532358ccee3e07d494d2a5c50deebbd61b84e04c1f91a',
                title: 'ITEM 3 CARRUSEL',
                posterUrl: 'https://cdn.jwplayer.com/v2/media/Eko4xJhx/poster.jpg?width=320',
                previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/l8usae6g-320.mp4',
                fullVideoUrl: 'https://cdn.jwplayer.com/manifests/Eko4xJhx.m3u8',
                fullVideoDuration: 1986,
                badge: 'chapita 3',
                badgeStyle: 'default'
            },
            {
                _id: 'd3774baa846aba86d61b7cd5a4878cca26e6566032c8a6261452385dfc7d73e0',
                title: 'ITEM 4 CARRUSEL',
                posterUrl: 'https://cdn.jwplayer.com/v2/media/sjGVMUbX/poster.jpg?width=320',
                previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/kb94q928-320.mp4',
                fullVideoUrl: 'https://cdn.jwplayer.com/manifests/sjGVMUbX.m3u8',
                fullVideoDuration: 65,
                badge: 'Chapita Cuatro',
                badgeStyle: 'default'
            },
            {
                _id: 'b1e73fda733b7b7bcd0155626433394dd1cecc0741f4f36a0caedcf4876467fd',
                title: 'ITEM 5 CARRUSEL',
                posterUrl: 'https://cdn.jwplayer.com/v2/media/tr2twovL/poster.jpg?width=320',
                previewVideoUrl: 'https://assets-jpcust.jwpsrv.com/thumbnails/t88hfw4l-320.mp4',
                fullVideoUrl: 'https://cdn.jwplayer.com/manifests/tr2twovL.m3u8',
                fullVideoDuration: 38,
                badge: 'CHAPITA 5',
                badgeStyle: 'default'
            }
        ]
    };
    const carouselInfo = {
        tipoSeccion: 'carrousel',
        idSeccion: 800,
        parameters: {
            title: carouselSection.information.title,
            url: carouselSection.information.link
        }
    };

    it('validates against schema', () => {
        const result = carouselBox(carouselSection, carouselInfo);

        expect(result).toEqual({
            tipoSeccion: 'carrousel',
            idSeccion: 800,
            parameters: {
                title: 'Título',
                url: 'https://www.lanacion.com.ar/lifestyle/',
            },
            videos: Array(5).fill({
                id: expect.any(String),
                title: expect.any(String),
                posterUrl: expect.any(String),
                previewVideoUrl: expect.any(String),
                fullVideoUrl: expect.any(String),
                fullVideoDuration: expect.any(Number),
                badge: expect.stringMatching(/[^a-záéíóúñ]/),
                badgeStyle: 'default',
            })
        });
    });

    it('hides badge style', () => {
        const carouselSectionNoBadge = {
            ...carouselSection,
            videos: carouselSection.videos.map(
                ({ badge, ...rest }) => ({ badge: undefined, ...rest })
            ),
        };
        const result = carouselBox(carouselSectionNoBadge, carouselInfo);

        expect(result.videos).toEqual(
            Array(5).fill(
                expect.not.objectContaining({ badge: expect.anything() })
            )
        );
    });
});
