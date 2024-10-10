import { useContent } from 'fusion:content';
import filter from '../../../../../../content/filters/LN/nota/audio';
import { getSectionOfRequestUri } from '../../../../../../components/private/common/utils/outputTypeHelper';
import { isCustomVoice } from '../../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../../../components/private/common/utils/get';
import getAudioEvents from '../../../../../../components/features/LN-10-global/common/utils/getAudioEvents';

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

describe('Components - Private - LN - Common - utils - getAudioEvents', () => {
    describe('getAudioEvents', () => {
        it('should return audio events correctly', () => {
            const globalContent = {
                _id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
                credits: {
                    by: [
                        {
                            _id: 'jose-del-rio',
                            name: 'José Del Rio',
                            type: 'author'
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
                }
            };
            const globalContentConfig = {
                query: {
                    uri: '/seguridad/misterio-en-tucuman-una-nina-de-11-anos-desaparecio-el-domingo-al-mediodia-cuando-fue-a-compras-a-un-nid09092024/'
                }
            };
            const mode = 'article';
            const mockAudioData = {
                audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13'
            };

            useContent.mockReturnValue(mockAudioData);
            get.mockImplementation((obj, path, defaultValue) => {
                if (path === '_id') return obj._id;
                if (path === 'audio_id') return mockAudioData.audio_id;
                if (path === 'credits.by') return obj.credits.by;
                return defaultValue;
            });

            getSectionOfRequestUri.mockReturnValue('seguridad');
            isCustomVoice.mockReturnValue(false);

            const result = getAudioEvents(
                globalContent,
                globalContentConfig,
                mode
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

            expect(useContent).toHaveBeenCalledWith({
                source: 'audionewsSource',
                query: { id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ' },
                filter,
                staticMode: false
            });
            expect(getSectionOfRequestUri).toHaveBeenCalledWith(
                globalContentConfig.query.uri
            );
            expect(isCustomVoice).toHaveBeenCalledWith(mockAudioData);
        });
        it('should return "N/A" for autor_nombre when there are no authors', () => {
            const globalContent = {
                _id: 'TG4KFKTNOFH53CM6B6OFKOGSGQ',
                credits: { by: [] }
            };

            const globalContentConfig = {
                query: {
                    uri: '/test-uri/'
                }
            };

            const mockAudioData = {
                audio_id: 'e76f4051-10f2-4835-9145-f4f3cf826d13'
            };

            useContent.mockReturnValue(mockAudioData);
            get.mockImplementation((obj, path) => {
                if (path === '_id') return obj._id;
                if (path === 'audio_id') return mockAudioData.audio_id;
                if (path === 'credits.by') return obj.credits.by;
            });

            getSectionOfRequestUri.mockReturnValue('seguridad');
            isCustomVoice.mockReturnValue(false);

            const result = getAudioEvents(
                globalContent,
                globalContentConfig,
                'article'
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
    });
});
