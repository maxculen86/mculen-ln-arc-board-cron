import { replaceAllUrlResizedToWWW } from '../../../../../components/private/LN/common/utils/mediaHelper.js';
import wikiSourceData from '../../../../../__mocks__/data/wikiTag/wikiSourceData.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('mediaHelper util replaceAllUrlResizedToWWW', () => {
    it('should replace RESIZER_URL_PUBLIC by host', () => {
        const jsonWithResizerReplaced = {
            _id:
                '8cf9008209322af28a1b8cf0a7eb444e1f4b4fbc2ede11a468c1f96fb1c1285e',
            creation_date: '2022-06-03 08:36:48',
            description:
                '<p><strong>Lionel Andrés Messi Cuccittini</strong> es un laureado futbolista argentino que juega en <strong>Paris Saint-Germain (PSG)</strong>. En la selección albiceleste es el capitán del equipo y el máximo goleador histórico.</p>\n<p>Ganador <a href="https://www.lanacion.com.ar/deportes/futbol/balon-de-oro-en-vivo-nid29112021/">siete veces del Balón de Oro</a>, <strong>"Leo" es considerado uno de los mejores jugadores de todos los tiempos</strong>, en un virtual podio junto a Diego Armando Maradona y el brasileño Pelé;. Inició su carrera juvenil en Newell\'s, de su Rosario natal, y estuvo a prueba en River. A los 12 años se sumó a Barcelona, donde fue señalado como la gran promesa de La Masía. Figura del primer equipo entre 2004 y 2021, conquistó 35 títulos oficiales con los blaugrana, siendo protagonista de uno los mejores equipos de la historia. Además, rompió infinidad de récords personales y de club. En total, <strong>acumula 39 títulos</strong>: tres con la Argentina (Copa América 2021, Juegos Olímpicos 2008, Mundial sub 20 2005), 35 con Barcelona y uno con PSG.</p>',
            image: {
                alt: 'Lionel Andrés Messi Cuccittini 1',
                height: '440',
                resizedUrls: [
                    {
                        option: {
                            height: 480,
                            proportion: '2:3',
                            width: 320
                        },
                        resizedUrl:
                            'https://www.lanacion.com.ar/resizer/gCybFe_noQ_U5fN_EZ_G5qYkj7Q=/320x480/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                    },
                    {
                        option: {
                            height: 630,
                            proportion: '2:3',
                            width: 420
                        },
                        resizedUrl:
                            'https://www.lanacion.com.ar/resizer/AgZWlsRI2ABRxZ4bxpUbM7PLYrE=/420x630/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                    },
                    {
                        option: {
                            height: 960,
                            proportion: '2:3',
                            width: 640
                        },
                        resizedUrl:
                            'https://www.lanacion.com.ar/resizer/hL0FJguUDWOHcqU8kM2ZUXrI9eo=/640x960/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                    },
                    {
                        option: {
                            height: 1260,
                            proportion: '2:3',
                            width: 840
                        },
                        resizedUrl:
                            'https://www.lanacion.com.ar/resizer/Xy2RqNNoAVp8cjAoKJ9VfNT9OrA=/840x1260/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
                    }
                ],
                url:
                    'https://cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
            },
            related_tags: [
                {
                    slug:
                        'https://www.lanacion.com.ar/tema/seleccion-argentina-tid46732',
                    text: 'Selección Argentina'
                },
                {
                    slug: 'https://www.lanacion.com.ar/tema/psg-tid50410',
                    text: 'PSG'
                }
            ],
            schemas_info: {
                additional_name: 'Andrés',
                birth_date: '1987-06-24',
                birth_place: 'Rosario, Santa Fe, Argentina',
                family_name: 'Messi Cuccittini',
                given_name: 'Lionel',
                job_title: 'Futbolista'
            },
            social_networks: [
                {
                    name: 'leomessi',
                    type: 'Facebook',
                    url: 'https://www.facebook.com/leomessi'
                },
                {
                    name: 'leomessi',
                    type: 'Instagram',
                    url: 'https://www.instagram.com/leomessi'
                }
            ],
            type: 1
        };

        expect(replaceAllUrlResizedToWWW(wikiSourceData)).toEqual(
            jsonWithResizerReplaced
        );
    });
    it('should return same object', () => {
        const jsonWithResizerReplaced = {
            option: {
                height: 480,
                proportion: '2:3',
                width: 320
            },
            resizedUrl:
                'https://www.lanacion.com.ar/resizer/gCybFe_noQ_U5fN_EZ_G5qYkj7Q=/320x480/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/3XELTA5ECJBZPI6TWPE64BOFJI.png'
        };
        expect(replaceAllUrlResizedToWWW(jsonWithResizerReplaced)).toEqual(
            jsonWithResizerReplaced
        );
    });

    it('should return same object with data', () => {
        const jsonExample = {
            option: null
        };
        expect(replaceAllUrlResizedToWWW(jsonExample)).toEqual(jsonExample);
    });
    it('should return empty object', () => {
        const jsonExample = {};
        expect(replaceAllUrlResizedToWWW(jsonExample)).toEqual(jsonExample);
    });
    it('should return null (send null)', () => {
        const jsonExample = null;
        expect(replaceAllUrlResizedToWWW(jsonExample)).toEqual(jsonExample);
    });
    it('should return empty object (send undefined)', () => {
        const jsonExample = undefined;
        expect(replaceAllUrlResizedToWWW(jsonExample)).toEqual({});
    });
});
