import { bodyElementRules } from '../../../../../../components/features/LN-nota/body/_utils/_bodyElementRules';
import Consumer from 'fusion:consumer';
import contentElements from '../../../../../../__mocks__/data/nota/body/contentElements.json';
import globalContent from '../../../../../../__mocks__/data/nota/body/globalContent.json';
import { selectRule } from '../../../../../../components/features/LN-nota/body/_utils/_bodyRules';
import Parrafo from '../../../../../../components/private/LN/nota/cuerpo/parrafo';
import blockQuote from '../../../../../../components/private/LN/nota/cuerpo/blockQuote';
import index from '../../../../../../components/private/LN/common/carrousell/index';
import image from '../../../../../../components/private/LN/nota/cuerpo/image';
import pullQuote from '../../../../../../components/private/LN/nota/cuerpo/pullQuote';
import video from '../../../../../../components/private/LN/nota/cuerpo/video';
import Divider from '../../../../../../components/private/LN/nota/cuerpo/divider';
import ListOrderedOrUnordered from '../../../../../../components/private/LN/nota/cuerpo/listOrderedOrUnordered';
import Subtitle from '../../../../../../components/private/LN/nota/cuerpo/subtitle';
import RawHTML from '../../../../../../components/private/LN/common/rawHTML';
import OembedAMP from '../../../../../../components/private/LN/nota/cuerpo/oembedAMP';
import Html from '../../../../../../components/private/LN/nota/cuerpo/html';
import HtmlAMP from '../../../../../../components/private/LN/nota/cuerpo/htmlAMP';
import BotonLink from '../../../../../../components/private/LN/nota/cuerpo/botonLink';
import optaAMP from '../../../../../../components/private/LN/nota/cuerpo/optaAMP';
import powerUpsReceta from '../../../../../../components/private/LN/nota/cuerpo/powerUpsReceta';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('_bodyElementRules', () => {
    describe('rules', () => {
        test('Cuando el type es "quote" al igual arcType return true', () => {
            const baseComponent = {
                arcType: 'quote'
            };
            // expect(selectRule.quote({ baseComponent, _type: 'quote' })).toBeTruthy();
            //const algo = selectRule({ subtype: 1, type: 'quote', outputType: 'default'});
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'pullquote' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('pullquote');
            expect(comp).toEqual(pullQuote);
            //expect(selectRule({ subtype: 1, type: 'quote', outputType: 'default'})).toBeTruthy();
        });

        test('Cuando el type es "image" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'image' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('image');
            expect(comp).toEqual(image);
        });

        test('Cuando el type es "video" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: '1',
                element: { type: 'video' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('video');
            expect(comp).toEqual(video);
        });

        test('Cuando el subtype de nota es FOTO AL 100, no debe retornar ciertos elementos', () => {
            const comp0 = bodyElementRules({
                subtype: '8',
                element: { type: 'video' },
                outputType: 'default'
            });
            expect(comp0).toBeFalsy();
            expect(comp0).toEqual(undefined);

            const comp1 = bodyElementRules({
                subtype: '8',
                element: { type: 'raw_html' },
                outputType: 'default'
            });
            expect(comp1).toBeFalsy();
            expect(comp1).toEqual(undefined);

            const comp2 = bodyElementRules({
                subtype: '8',
                element: { type: 'oembed_response' },
                outputType: 'default'
            });
            expect(comp2).toBeFalsy();
            expect(comp2).toEqual(undefined);

            const comp3 = bodyElementRules({
                subtype: '8',
                element: { type: 'text' },
                outputType: 'default'
            });
            expect(comp3).toBeTruthy();
            expect(comp3.arcType).toEqual('text');
            expect(comp3).toEqual(Parrafo);
        });

        test('Cuando el type es "divider" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'divider' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('divider');
            expect(comp).toEqual(Divider);
        });

        test('Cuando el type es "list" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'list' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('list');
            expect(comp).toEqual(ListOrderedOrUnordered);
        });

        test('Cuando el type es "gallery" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'gallery' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('gallery');
            expect(comp).toEqual(index);
        });

        test('Cuando el type es "header" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'header' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('header');
            expect(comp).toEqual(Subtitle);
        });

        test('Cuando el type es "text" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'text' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('text');
            expect(comp).toEqual(Parrafo);
        });

        test('Cuando el type es "quote" y subtype "blockquote" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'quote', subtype: 'blockquote' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('blockquote');
            expect(comp).toEqual(blockQuote);
        });

        test('Cuando el type es "oembed_response" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'oembed_response' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('oembed_response');
            expect(comp.outputType).toEqual('default');
            expect(comp).toEqual(RawHTML);
        });

        test('Cuando el type es "oembed_response" en AMP al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'oembed_response' },
                outputType: 'amp'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('oembed_response');
            expect(comp.outputType).toEqual('amp');
            expect(comp).toEqual(OembedAMP);
        });

        test('Cuando el type es "raw_html" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'raw_html' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('raw_html');
            expect(comp.outputType).toEqual('default');
            expect(comp).toEqual(Html);
        });

        test('Cuando el type es "raw_html" en AMP al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'raw_html' },
                outputType: 'amp'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('raw_html');
            expect(comp.outputType).toEqual('amp');
            expect(comp).toEqual(HtmlAMP);
        });

        test('Cuando el type es "interstitial_link" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'interstitial_link' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('interstitial_link');
            expect(comp).toEqual(BotonLink);
        });

        test('Cuando el type es "opta_amp" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 1,
                element: { type: 'raw_html', content: '<opta-widget>' },
                outputType: 'amp'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('raw_html');
            expect(comp).toEqual(optaAMP);
        });

        test('Cuando el type es "opta_amp" al igual arcType return true', () => {
            const comp = bodyElementRules({
                subtype: 7,
                element: { type: 'custom_embed', subtype: 'power-up-receta' },
                outputType: 'default'
            });
            expect(comp).toBeTruthy();
            expect(comp.arcType).toEqual('power-up-receta');
            expect(comp).toEqual(powerUpsReceta);
        });
    });

    // describe('bodyElementFucntion', () => {
    //     test('retornar 95 elementos', () => {
    //         const payload = contentElements.map((element, currentIndex) => {
    //             // console.log(
    //             //     '🚀 ~ file: _bodyElementRules.test.js. ~ line 41 ~ payload ~ element',
    //             //     element
    //             // );
    //             return bodyElementRules({
    //                 element,
    //                 outputType: 'default',
    //                 subtype: '1'
    //             });
    //         });
    //         console.log(
    //             '🚀 ~ file: _bodyElementRules.test.js ~ line 4666 ~ payload ~ payload',
    //             payload
    //         );

    //         expect(payload).toEqual(2);
    //     });
    // });
});
