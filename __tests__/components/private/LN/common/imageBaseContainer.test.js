import Consumer from 'fusion:consumer';

import React from 'react';
import { mount } from 'enzyme';
jest.mock(
    '../../../../../components/private/LN/common/media/imageBase/index',
    () => 'mock-image'
);

import ImageArticle from '../../../../../components/private/LN/common/media/imageBase/index';

describe('features - La Nacion - components - nota - imageArticle', () => {
    const image = {
        type: 'image',
        alt_text: 'Bolitas de pescado para compartir',
        url:
            'https://arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/VASAYYYBLVFIJCFDSH22JS5X2Q.jpg',
        resized_urls: [
            {
                resizedUrl:
                    'http://demo-prod.origin.arcpublishing.com/resizer/xPyzEJoZeQro3Akbei6CGtlgqrg=/1033x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
                option: {
                    class: 'img-desktop',
                    media: '(min-width: 768px)',
                    type: 'promo_items'
                }
            },
            {
                resizedUrl:
                    'http://demo-prod.origin.arcpublishing.com/resizer/H1cGkarOmTz5pD9XbXCvTkTVurQ=/768x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
                option: {
                    class: 'img-desktop-sm',
                    media: '(min-width: 740px)',
                    type: 'promo_items'
                }
            },
            {
                resizedUrl:
                    'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
                option: {
                    class: 'img-mobile',
                    media: '(min-width: 320px)',
                    type: 'promo_items'
                }
            }
        ]
    };

    it('Test de armado de props', () => {
        const comp = mount(
            <ImageArticle image={image} altText={image.alt_text} zoom />
        );
        const compBaseImage = comp.find('mock-image');
        expect(comp.length).toBe(1);
        expect(comp.prop('zoom')).toBe(true);
        expect(comp.prop('altText')).toBe('Bolitas de pescado para compartir');
        // expect(comp.prop('sources')).toStrictEqual([
        //     {
        //         resizedUrl:
        //             'http://demo-prod.origin.arcpublishing.com/resizer/xPyzEJoZeQro3Akbei6CGtlgqrg=/1033x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
        //         option: {
        //             media: '(min-width: 768px)',
        //             class: 'img-desktop',
        //             type: 'promo_items'
        //         }
        //     },
        //     {
        //         resizedUrl:
        //             'http://demo-prod.origin.arcpublishing.com/resizer/H1cGkarOmTz5pD9XbXCvTkTVurQ=/768x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
        //         option: {
        //             media: '(min-width: 740px)',
        //             class: 'img-desktop-sm',
        //             type: 'promo_items'
        //         }
        //     },
        //     {
        //         resizedUrl:
        //             'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
        //         option: {
        //             media: '(min-width: 320px)',
        //             class: 'img-mobile',
        //             type: 'promo_items'
        //         }
        //     }
        // ]);
    });
});
