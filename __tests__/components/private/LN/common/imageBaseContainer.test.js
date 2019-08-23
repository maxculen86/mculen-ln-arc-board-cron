import React from 'react';
import { mount } from 'enzyme';

jest.mock(
    '../../../../../components/private/LN/common/media/imageBase/component',
    () => 'mock-image'
);

import ImageArticle from '../../../../../components/private/LN/common/media/imageBase/container';

describe('features - La Nacion - components - nota - imageArticle', () => {
    const image = {
        type: 'image',
        resized_urls: {
            apertura_big:
                'http://demo-prod.origin.arcpublishing.com/resizer/xPyzEJoZeQro3Akbei6CGtlgqrg=/1033x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
            apertura_medium:
                'http://demo-prod.origin.arcpublishing.com/resizer/H1cGkarOmTz5pD9XbXCvTkTVurQ=/768x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
            apertura_small:
                'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
            cuerpo_small:
                'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg'
        }
    };

    const imageResizePresets = {
        apertura_big: {
            class: 'img-desktop',
            media: '(min-width: 768px)',
            type: 'apertura'
        },
        apertura_medium: {
            class: 'img-desktop-sm',
            media: '(min-width: 740px)',
            type: 'apertura'
        },
        apertura_small: {
            class: 'img-mobile',
            media: '(min-width: 320px)',
            type: 'apertura'
        },
        cuerpo_small: {
            class: 'img-mobile',
            media: '(min-width: 320px)',
            type: 'cuerpo'
        }
    };

    it('Test de armado de props', () => {
        const comp = mount(
            <ImageArticle
                imageResizePresets={imageResizePresets}
                image={image}
                altText="texto alt"
                zoom
                configType="apertura"
            />
        );
        const compBaseImage = comp.find('mock-image');
        expect(compBaseImage.length).toBe(1);
        expect(compBaseImage.prop('zoom')).toBe(true);
        expect(compBaseImage.prop('altText')).toBe('texto alt');
        expect(compBaseImage.prop('sources')).toStrictEqual([
            {
                media: '(min-width: 768px)',
                class: 'img-desktop',
                url:
                    'http://demo-prod.origin.arcpublishing.com/resizer/xPyzEJoZeQro3Akbei6CGtlgqrg=/1033x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg'
            },
            {
                media: '(min-width: 740px)',
                class: 'img-desktop-sm',
                url:
                    'http://demo-prod.origin.arcpublishing.com/resizer/H1cGkarOmTz5pD9XbXCvTkTVurQ=/768x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg'
            },
            {
                media: '(min-width: 320px)',
                class: 'img-mobile',
                url:
                    'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg'
            }
        ]);
    });
});
