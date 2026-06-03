import { useContent } from 'fusion:content';
import { getSectionOfRequestUri } from '../../../../../../components/private/common/utils/outputTypeHelper';
import { isCustomVoice } from '../../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../../../components/private/common/utils/get';
import getAudioEvents from '../../../../../../components/features/LN/common/audioPlayer/getAudioEvents';
import { extractDataFromCredits } from '../../../../../../components/private/LN/nota/snippet/extractData/extractDataReceta';

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('../../../../../../content/sources/utils/audioNews/helper', () => ({
    isCustomVoice: jest.fn()
}));

jest.mock('../../../../../../components/private/common/utils/get', () =>
    jest.fn()
);

jest.mock(
    '../../../../../../components/private/common/utils/outputTypeHelper',
    () => ({
        getSectionOfRequestUri: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/nota/snippet/extractData/extractDataReceta',
    () => ({
        extractDataFromCredits: jest.fn()
    })
);

describe('getAudioEvents', () => {
    it('should return audio events correctly', () => {
        const globalContent = {
            _id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            credits: {
                by: [
                    {
                        _id: 'jose-del-rio',
                        name: 'José Del Rio',
                        type: 'author',
                        additional_properties: {
                            original: {}
                        }
                    },
                    {
                        _id: 'carlos-pagni-81',
                        name: 'Carlos Pagni',
                        type: 'author'
                    },
                    {
                        _id: 'maria-emilia-subiza-180',
                        name: 'Maria Emilia Subiza',
                        type: 'author'
                    }
                ]
            },
            promo_items: {
                audio_nota: {
                    embed: {
                        config: {
                            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13'
                        }
                    }
                }
            }
        };
        const globalContentConfig = {
            query: {
                uri: '/seguridad/misterio-en-tucuman-una-nina-de-11-anos-desaparecio-el-domingo-al-mediodia-cuando-fue-a-compras-a-un-nid09092024/'
            }
        };

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === '_id') return obj._id;
            if (path === 'promo_items.audio_nota.embed.config.audio_id')
                return obj.promo_items.audio_nota.embed.config.audio_id;
            if (path === 'credits.by') return obj.credits.by;
            return defaultValue;
        });

        getSectionOfRequestUri.mockReturnValue('seguridad');
        isCustomVoice.mockReturnValue(false);
        extractDataFromCredits.mockReturnValue({
            autores: 'José Del Rio, Carlos Pagni, Maria Emilia Subiza'
        });

        const result = getAudioEvents(
            globalContent,
            globalContentConfig,
            false
        );

        expect(result).toEqual({
            autor_nombre: 'José Del Rio, Carlos Pagni, Maria Emilia Subiza',
            method: 'MP3',
            origin: 'nota',
            mode: 'full',
            seccion: 'seguridad',
            nota_id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13',
            custom_voice: false
        });

        expect(getSectionOfRequestUri).toHaveBeenCalledWith(
            globalContentConfig.query.uri
        );
        expect(isCustomVoice).toHaveBeenCalledWith(
            globalContent.credits.by[0].additional_properties.original
        );
        expect(extractDataFromCredits).toHaveBeenCalledWith(
            globalContent.credits.by
        );
    });

    it('should return "N/A" for autor_nombre when there are no authors', () => {
        const globalContent = {
            _id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            credits: { by: [] },
            promo_items: {
                audio_nota: {
                    embed: {
                        config: {
                            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13'
                        }
                    }
                }
            }
        };

        const globalContentConfig = {
            query: {
                uri: '/seguridad/misterio-en-tucuman-una-nina-de-11-anos-desaparecio-el-domingo-al-mediodia-cuando-fue-a-compras-a-un-nid09092024/'
            }
        };

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === '_id') return obj._id;
            if (path === 'promo_items.audio_nota.embed.config.audio_id')
                return obj.promo_items.audio_nota.embed.config.audio_id;
            if (path === 'credits.by') return obj.credits.by;
            return defaultValue;
        });

        getSectionOfRequestUri.mockReturnValue('seguridad');
        isCustomVoice.mockReturnValue(false);
        extractDataFromCredits.mockReturnValue({ autores: 'N/A' });

        const result = getAudioEvents(
            globalContent,
            globalContentConfig,
            false
        );

        expect(result).toEqual({
            autor_nombre: 'N/A',
            method: 'MP3',
            origin: 'nota',
            mode: 'full',
            seccion: 'seguridad',
            nota_id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13',
            custom_voice: false
        });
    });

    it('should return custom_voice true', () => {
        const globalContent = {
            _id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            credits: {
                by: [
                    {
                        _id: 'jose-maria-costa-1943',
                        additional_properties: {
                            original: {
                                author_type: 'Estándar',
                                bio_page: '/autor/jose-maria-costa-1943/',
                                byline: 'José María Costa',
                                image: 'https://sandbox.lanacion.com.ar/resizer/v2/https%3A%2F%2Fauthor-service-images-sandbox-us-east-1.publishing.aws.arc.pub%2Flanacionar%2F631f8c24-32c7-49a8-b48c-64da1d4c37d6.png?auth=91e9077ed1fc555e3288b5162e796e347e53371593541129af21ad63ca98be43&width=80&quality=70&smart=false',
                                role: 'LA NACION',
                                voice: '3843'
                            }
                        },
                        name: 'José María Costa',
                        type: 'author'
                    }
                ]
            },
            promo_items: {
                audio_nota: {
                    embed: {
                        config: {
                            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13'
                        }
                    }
                }
            }
        };

        const globalContentConfig = {
            query: {
                uri: '/seguridad/misterio-en-tucuman-una-nina-de-11-anos-desaparecio-el-domingo-al-mediodia-cuando-fue-a-compras-a-un-nid09092024/'
            }
        };

        get.mockImplementation((obj, path, defaultValue) => {
            if (path === '_id') return obj._id;
            if (path === 'promo_items.audio_nota.embed.config.audio_id')
                return obj.promo_items.audio_nota.embed.config.audio_id;
            if (path === 'credits.by') return obj.credits.by;
            if (path === 'credits.by[0].additional_properties.original')
                return obj.credits.by[0].additional_properties.original;
            return defaultValue;
        });

        getSectionOfRequestUri.mockReturnValue('seguridad');
        isCustomVoice.mockReturnValue(true);
        extractDataFromCredits.mockReturnValue({ autores: 'José María Costa' });

        const result = getAudioEvents(globalContent, globalContentConfig, true);

        expect(result).toEqual({
            autor_nombre: 'José María Costa',
            method: 'MP3',
            origin: 'nota',
            mode: 'summary',
            seccion: 'seguridad',
            nota_id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
            audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13',
            custom_voice: true
        });
        expect(extractDataFromCredits).toHaveBeenCalledWith(
            globalContent.credits.by
        );
    });
});
