import { useContent } from 'fusion:content';
import filter from '../../../../../../content/filters/LN/nota/audio';
import getAudioEvents from '../../../../../../components/private/LN/common/utils/getAudioEvents';
import { getSectionOfRequestUri } from '../../../../../../components/private/common/utils/outputTypeHelper';
import { isCustomVoice } from '../../../../../../content/sources/utils/audioNews/helper';
import get from '../../../../../../components/private/common/utils/get';

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
                credits: { by: [{ name: 'José María Costa' }] }
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
            get.mockImplementation((obj, path, defaultValue) =>
                path === '_id'
                    ? obj._id
                    : path === 'audio_id'
                      ? mockAudioData.audio_id
                      : path === 'credits.by[0].name'
                        ? obj.credits.by[0].name
                        : defaultValue
            );
            getSectionOfRequestUri.mockReturnValue('seguridad');
            isCustomVoice.mockReturnValue(false);

            const result = getAudioEvents(
                globalContent,
                globalContentConfig,
                mode
            );

            expect(result).toEqual({
                autor_nombre: 'José María Costa',
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
    });
});
