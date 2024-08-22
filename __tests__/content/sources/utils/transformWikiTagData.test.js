import transformWikiTagData from '../../../../content/sources/utils/transformWikiTagData';
import mockWikiTagPersonaRawData from '../../../../__mocks__/data/wikiTag/wikiTagPersonRawData.json';
import mockWikiTagPerson from '../../../../__mocks__/data/wikiTag/wikiTagPersona.json';
import { resizeUrlCollection } from '../../../../components/private/common/utils/image/resizer/v2/resizerHelper';

jest.mock('fusion:properties', () => () => ({
    getProperties: () => {
        return {
            imageConfig: {
                resize: {
                    default: [
                        {
                            width: 1033,
                            height: 768,
                            media: '(min-width: 768px)',
                            class: 'img-desktop',
                            media_preload: '(min-width: 768px)'
                        }
                    ],
                    wikiTag: {
                        promo_items: {
                            sizes: [
                                {
                                    width: 320,
                                    height: 480,
                                    proportion: '2:3'
                                },
                                {
                                    width: 420,
                                    height: 630,
                                    proportion: '2:3'
                                },
                                {
                                    width: 640,
                                    height: 960,
                                    proportion: '2:3'
                                },
                                {
                                    width: 840,
                                    height: 1260,
                                    proportion: '2:3'
                                }
                            ]
                        }
                    }
                }
            }
        };
    }
}));
jest.mock(
    '../../../../components/private/common/utils/image/resizer/v2/resizerHelper'
);

const getImageProps = (height, width) => {
    const resizedUrl = `https://sandbox-resizer.glanacion.com/resizer/v2/22QAQYYOGFEJ3FPKC4OSVPPIN4.png?auth=3505a155364d7e1d80cbc4539ec469adfb3bfb8a479aecbad5e662d1a87f99ab&width=${width}&quality=70&smart=false`;

    return {
        option: {
            height,
            proportion: '2:3',
            width
        },
        resizedUrl
    };
};

describe('Content Sources: Tag Source - WikiTagData Transform', () => {
    resizeUrlCollection.mockReturnValueOnce([
        getImageProps(480, 320),
        getImageProps(630, 420),
        getImageProps(960, 640),
        getImageProps(1260, 840)
    ]);
    it('Should return the correct format of data', () => {
        const siteProps = {
            imageConfig: 'wikiTag',
            arcSite: 'la-nacion-ar'
        };
        expect(
            transformWikiTagData(mockWikiTagPersonaRawData, siteProps)
        ).toStrictEqual(mockWikiTagPerson);
    });
});
