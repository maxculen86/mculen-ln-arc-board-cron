import Consumer from 'fusion:consumer';
import Context from 'fusion:context';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Media from '../../../../components/private/LN/common/media';
import VideoPlayerJW from '../../../../components/private/common/videoPlayerJw';
import image from '../../../../__mocks__/data/images/OTTprogramImage.json';
import { getEpigrafe } from '../../../../components/private/LN/common/utils/mediaHelper';
import EpigrafeAndCreditsData from '../../../../components/private/common/utils/epigrafeAndCreditsData';

jest.mock('../../../../components/private/common/videoPlayerJw', () => {
    const React = require('react');

    return jest.fn(() =>
        React.createElement('div', { 'data-testid': 'video-player-jw' })
    );
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        globalContent: { subtype: '1' }
    }))
}));

describe('Private - LN - Common - Media', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Dibuja el tag loading lazy', () => {
        const { container } = render(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('No dibuja el tag loading lazy por ser Galeria', () => {
        const { container } = render(
            <Media
                mediaData={image}
                withZoom={false}
                itsGallery={true}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        // In React 19, images with empty alt have role="presentation"
        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('loading', undefined);
    });

    it('No dibuja el tag loading lazy por tener zoom', () => {
        const { container } = render(
            <Media
                mediaData={image}
                withZoom={true}
                itsGallery={false}
                handleClick
                colNumber
                active
                outputType="default"
            />
        );
        // In React 19, images with empty alt have role="presentation"
        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('loading', undefined);
    });

    const basicImage = {
        _id: 'X2MJ25TCRRD63NGNBDAZGLYRZY',
        caption: 'prueba de epigrafe de messi',
        credits: {
            by: [
                {
                    name: 'Mariano Grondona',
                    type: 'author'
                }
            ]
        },
        subtitle: 'prueba title de messi',
        type: 'image',
        url: '/resizer/jyurG2Ow8jHanY1TE_d9M0NQkSU=/768x513/smart/arc-anglerfish-arc2-sandbox-sandbox-lanacionar.s3.amazonaws.com/public/X2MJ25TCRRD63NGNBDAZGLYRZY.jpg'
    };

    const basivVideo = {
        type: 'video',
        _id: 'aaaf0286-a327-4c58-b5dd-a86ee20664b9',
        display_date: '2019-07-03T18:41:08Z',
        headlines: {
            basic: 'Video test Fundacion'
        },
        promo_items: {
            basic: {
                credits: {
                    by: [
                        {
                            name: 'Shutterstock',
                            type: 'author'
                        }
                    ]
                }
            }
        }
    };

    it('Deberia traer los datos del epigrafe de promoItems', () => {
        expect(getEpigrafe(undefined)).toBeTruthy();
        expect(getEpigrafe({})).toBeTruthy();

        const data1 = getEpigrafe(basicImage);
        expect(data1.caption).toEqual(
            <span className="com-text --caption --twoxs">
                prueba de epigrafe de messi
            </span>
        );
        expect(data1.credit).toEqual(
            <span className="com-text --credit --twoxs">Mariano Grondona</span>
        );

        const data2 = getEpigrafe(basivVideo);
        expect(data2.caption).toEqual(
            <span className="com-text --caption --twoxs">
                Video test Fundacion
            </span>
        );
        expect(data2.credit).toEqual(
            <span className="com-text --credit --twoxs">Shutterstock</span>
        );
    });

    it('Deberia traer el epigrafe y credito', () => {
        expect(EpigrafeAndCreditsData(undefined)).toEqual('');
        expect(EpigrafeAndCreditsData({})).toEqual('');
        expect(EpigrafeAndCreditsData(basicImage)).toEqual('Mariano Grondona');
        expect(EpigrafeAndCreditsData(basivVideo.promo_items.basic)).toEqual(
            'Shutterstock'
        );
    });

    it('should not force autoplay for video_jw by default', () => {
        render(
            <Media
                mediaData={{ type: 'video_jw', _id: 'aomrvRI3' }}
                outputType="default"
            />
        );

        expect(screen.getByTestId('video-player-jw')).toBeInTheDocument();
        expect(VideoPlayerJW.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                hasAutoplay: false
            })
        );
    });
});
