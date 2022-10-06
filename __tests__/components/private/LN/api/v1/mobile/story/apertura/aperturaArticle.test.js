import aperturaArticle from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/aperturaArticle';
import article from '../../../../../../../../../__mocks__/data/articles/SGLHVRAV2VGFHB5OZZ57PKYAVQ.json';
import Image from '../../../../../../../../../components/private/LN/api/v1/mobile/story/cuerpo/elements/image';
import imageDefault from '../../../../../../../../../components/private/LN/api/v1/mobile/story/apertura/prodImageDefault.json';

describe('Test aperura article imagen/video validacion defensiva', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.spyOn(console, 'error');
        // @ts-ignore jest.spyOn adds this functionallity
        console.error.mockImplementation(() => null);
    });

    afterEach(() => {
        // @ts-ignore jest.spyOn adds this functionallity
        console.error.mockRestore();
    });
    test('Medio destacado Básico "Origen del vídeo" con una imagen', () => {
        const x = {
            titulo: 'Test nota apertura video validacion defensiva',
            tituloMobile: '',
            bajada: 'subtitulo',
            video: {
                _t: 'video',
                duration: 74441,
                showAd: '1',
                title: 'Cementerio de la Recoleta',
                multimediaFile: {
                    _t: 'mmf',
                    width: 1280,
                    height: 720,
                    url:
                        'https://d20x44kddxtp6m.cloudfront.net/wp-lanacionar/Cristina_Escobedo_Andrea_Marotta/20221003/633b520c562898170264b12f/t_b735440f53f3435c9b1fda9e10d139ec_name_Recoleta/file_1280x720-2000-v3_1.mp4'
                },
                thumbnailImage: {
                    _t: 'mmi',
                    order: 0,
                    src:
                        'https://d3us6z9haan6vf.cloudfront.net/10-03-2022/t_dac1edc00ce444eea90ed80f0276d68d_name_file_1280x720_2000_v3_1_.jpg'
                }
            },
            imagenes: [
                {
                    _t: 'image',
                    url:
                        'https://resizer.glanacion.com/resizer/{{param}}/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/2D6RL7VJS5DQHBSCJZ3LTOEGMU.png',
                    parameters: [
                        {
                            media: 309,
                            width: 309,
                            signature:
                                'n4SG0ut-TNt39E-NefRqRDZzmoo=/309x206/smart/filters:format(webp):quality(80)'
                        },
                        {
                            media: 351,
                            width: 351,
                            signature:
                                '5d5rFuWv5BF5X3iBCWj3GMT3szY=/351x234/smart/filters:format(webp):quality(80)'
                        },
                        {
                            media: 768,
                            width: 768,
                            signature:
                                '0q_664IeizO4-5QUPNOLDFSIrog=/768x512/smart/filters:format(webp):quality(80)'
                        },
                        {
                            media: 1280,
                            width: 879,
                            signature:
                                'lIKyUHy4R5Xl_nmmpv0KVXvC6Tk=/879x586/smart/filters:format(webp):quality(80)'
                        },
                        {
                            media: 1200,
                            width: 1200,
                            signature:
                                '6THsUh8sQN9JKk8-po1TsdGywoM=/1200x800/smart/filters:format(webp):quality(80)'
                        }
                    ],
                    epigraph: 'Placeholder16-9@3x'
                }
            ]
        };
        const image = Image(imageDefault);
        const resp = aperturaArticle(article);
        expect(resp.imagenes).not.toBeUndefined();
        expect(resp.imagenes.length).toBe(1);
        expect(resp.imagenes[0]._t).toBe(image._t);
        expect(resp.imagenes[0].url).toBe(image.url);
        expect(resp.imagenes[0].parameters.length).toBe(
            image.parameters.length
        );
        expect(resp.video).not.toBeUndefined();
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.mock.calls[0][0]).toBe(
            'La nota id: SGLHVRAV2VGFHB5OZZ57PKYAVQ , tiene seteado en Medio destacado Básico "Origen del vídeo" una imagen. Se esta enviando una imagen por defecto hasta su correción'
        );
    });
});
