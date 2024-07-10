import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ImageArticle from '../../../../../components/private/LN/common/media/imageBase/index';

jest.mock(
    '../../../../../components/private/LN/common/media/imageBase/index',
    () => props => <img alt={props.altText} {...props} />
);

describe('Components - private - LN - common - imageBaseContainere', () => {
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

    it('should render the image correctly', () => {
        const { getByRole, container } = render(
            <ImageArticle image={image} altText={image.alt_text} zoom />
        );

        const imgElement = getByRole('img', {
            name: 'Bolitas de pescado para compartir'
        });
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute(
            'alt',
            'Bolitas de pescado para compartir'
        );
        expect(container.querySelector('img')).toBeInTheDocument();
    });
});
