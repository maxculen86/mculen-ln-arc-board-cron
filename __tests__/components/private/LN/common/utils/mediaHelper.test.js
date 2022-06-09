import {
    buildScriptResizeSSRInfography,
    wikiImagesWithWWW
} from '../../../../../../components/private/LN/common/utils/mediaHelper';
import getProperties from 'fusion:properties';
import articlePictureOpening from '../../../../../../__mocks__/data/articles/4HFO7YPZBFEYVB6K5XY6IFV3XY';
import articleVideoOpening from '../../../../../../__mocks__/data/articles/KMD6TFFRHRC7XBPE2DDNKOTALE';
import wikiSourceData from '../../../../../../__mocks__/data/wikiTag/wikiSourceData.json';

jest.mock('fusion:environment', () => {
    return {
        RESIZER_URL_PUBLIC: 'https://resizer.glanacion.com',
        SITE_LANACION: 'https://www.lanacion.com.ar'
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('Private - LN - Common - Utils -> mediaHelper', () => {
    const url =
        'https://especialess3.lanacion.com.ar/18/mundial/mundial2018-historicos/';
    const promoItems = {
        basic: {
            _id: '6POSMWEMKZCZBHINVUG3F4O3BY',
            content: `<iframe class="pym" id="LNcreativa" frameborder="0" width="100%" height="800" scrolling="no" src="${url}"></iframe>`,
            type: 'raw_html'
        }
    };
    const outputType = 'default';

    it('Deberia retornar script al ser llamado con los parametros correctos, con promo_items.basic', () => {
        const component = buildScriptResizeSSRInfography(promoItems);
        expect(component).toBeTruthy();
        expect(component.type).toStrictEqual('script');
        expect(component.props.type).toStrictEqual('text/javascript');
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(url);
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(
            promoItems.basic._id
        );
        expect(component).toMatchSnapshot();
    });

    const promoItemsMultimedia = {
        apertura_multimedia: {
            ...promoItems.basic
        }
    };
    it('Deberia retornar script al ser llamado con promo_items.apertura_multimedia', () => {
        const component = buildScriptResizeSSRInfography(promoItemsMultimedia);
        expect(component).toBeTruthy();
        expect(component.type).toStrictEqual('script');
        expect(component.props.type).toStrictEqual('text/javascript');
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(url);
        expect(component.props.dangerouslySetInnerHTML.__html).toContain(
            promoItemsMultimedia.apertura_multimedia._id
        );
    });
    it('Deberia retornar nulo al ser llamado con los parametros incorrectos', () => {
        promoItems.basic.content = '<opta-widget></opta-widget>';
        expect(buildScriptResizeSSRInfography()).toBeNull();
        expect(buildScriptResizeSSRInfography({})).toBeNull();
        expect(buildScriptResizeSSRInfography(undefined)).toBeNull();
        expect(buildScriptResizeSSRInfography(promoItems)).toBeNull();
    });
    it('Deberia retornar nulo al ser llamado apertura imagen o video', () => {
        expect(
            buildScriptResizeSSRInfography(articlePictureOpening.promo_items)
        ).toBeNull();
        expect(
            buildScriptResizeSSRInfography(articleVideoOpening.promo_items)
        ).toBeNull();
    });
    describe('wikiImageWithWWW util', () => {
        it('Should return the resized urls with WWW', () => {
            const imagesWithWWW = wikiImagesWithWWW(wikiSourceData);
            expect(imagesWithWWW).toStrictEqual([
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
            ]);
        });
    });
});
