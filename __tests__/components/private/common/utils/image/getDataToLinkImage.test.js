import GetDataToLinkImage from '../../../../../../components/private/common/utils/image/getDataToLinkImage';

describe('Common - GetDataToLinkImage', () => {
    const globalContent = {
        promo_items: {
            basic: {
                resized_urls: [
                    {
                        option: {
                            height: 586,
                            media: '(min-width: 1280px)',
                            width: 879,
                            media_preload: '(min-width: 1280.1px)'
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                    },
                    {
                        option: {
                            height: 746,
                            media: '(min-width: 1024px)',
                            width: 1119,
                            media_preload:
                                '(min-width: 1024.1px and max-width: 1280px)'
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                    },
                    {
                        option: {
                            height: 512,
                            media: '(min-width: 768px)',
                            width: 768,
                            media_preload: '(max-width: 1024px)'
                        },
                        resizedUrl:
                            'https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
                    }
                ]
            }
        }
    };

    const expected = [
        {
            media: '(min-width: 1280.1px)',
            resizedUrl:
                'https://resizer.glanacion.com/resizer/TH-VryessnZukr7fPtHGAp_SeKc=/879x586/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
        },
        {
            media: '(min-width: 1024.1px and max-width: 1280px)',

            resizedUrl:
                'https://resizer.glanacion.com/resizer/Gx0v-uWdmqOZawzhVCa09zILHio=/1119x746/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
        },
        {
            media: '(max-width: 1024px)',

            resizedUrl:
                'https://resizer.glanacion.com/resizer/AtNn5RZblCnaBE4JRqbP8O5lCyw=/768x512/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.lanacionar/UE652CZMVBB3ROMJOPCJABEESU.jpg'
        }
    ];

    describe('When section is note,', () => {
        it('with resized Media, return array media data', () => {
            expect(GetDataToLinkImage(globalContent, 'nota')).toEqual(expected);
        });

        it('without resized Media, return empty Array', () => {
            expect(GetDataToLinkImage({}, 'nota')).toEqual([]);
        });
    });

    describe('When section is home, return empty Array', () => {
        it('GetDataToLinkImage - home', () => {
            expect(GetDataToLinkImage(globalContent, 'home')).toEqual([]);
        });
    });

    describe('When section is acumulado, return empty Array', () => {
        it('GetDataToLinkImage - acumulados', () => {
            expect(GetDataToLinkImage(globalContent, 'acumulado')).toEqual([]);
        });
    });

    describe('When section is undefined return empty array', () => {
        it('GetDataToLinkImage - nuevaSeccion', () => {
            expect(GetDataToLinkImage(globalContent, 'nuevaSeccion')).toEqual(
                []
            );
        });
    });
});
