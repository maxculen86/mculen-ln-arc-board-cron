import React from 'react';
import { mount } from 'enzyme';

jest.mock(
    '../../../../../components/private/LN/common/baseImage',
    () => 'mock-image'
);

import ArticleImage from '../../../../../components/private/LN/nota/articleImage';

describe('features - La Nacion - components - nota - articleImage', () => {
    const image = {
        type: 'image',
        resized_urls: {
            apertura_big:
                'http://demo-prod.origin.arcpublishing.com/resizer/xPyzEJoZeQro3Akbei6CGtlgqrg=/1033x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
            apertura_medium:
                'http://demo-prod.origin.arcpublishing.com/resizer/H1cGkarOmTz5pD9XbXCvTkTVurQ=/768x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg',
            apertura_small:
                'http://demo-prod.origin.arcpublishing.com/resizer/9KaOBmsd7Cru2i7Avp4tdpbwczo=/340x0/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/4LNFPBJE4FEF5MBDLBHG2GNCBE.jpg'
        }
    };

    const imageResizePresets = {
        apertura_big: {
            class: 'img-desktop',
            media: '(min-width: 768px)'
        },
        apertura_medium: {
            class: 'img-desktop-sm',
            media: '(min-width: 740px)'
        },
        apertura_small: {
            class: 'img-mobile',
            media: '(min-width: 320px)'
        }
    };

    it('Test de armado de props', () => {
        const comp = mount(
            <ArticleImage
                imageResizePresets={imageResizePresets}
                image={image}
                altText="texto alt"
                zoom
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
