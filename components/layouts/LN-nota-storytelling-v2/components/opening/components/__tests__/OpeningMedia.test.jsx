import React from 'react';
import { render } from '@testing-library/react';
import OpeningMedia from '../OpeningMedia';
import ImageUI from '../../../../../../features/ui/ln/image/default';

jest.mock('../../../../../../features/ui/ln/image/default', () =>
    jest.fn(() => <div data-testid="image-ui" />)
);

describe('OpeningMedia', () => {
    beforeEach(() => {
        ImageUI.mockClear();
    });

    it('passes separated picture sources using the mobile sizes breakpoint', () => {
        render(
            <OpeningMedia
                src="desktop-1200.jpg"
                srcset="desktop-1200.jpg 1200w, desktop-1920.jpg 1920w"
                sizes="(min-width: 1440px) 1920px, (min-width: 1024px) and (max-width: 1439px) 1200px, 1200px"
                width={1200}
                height={800}
                altText="Opening"
                mobileImage={{
                    src: 'mobile-420.jpg',
                    srcset: 'mobile-420.jpg 420w, mobile-770.jpg 770w',
                    sizes: '(min-width: 768px) and (max-width: 1023px) 770px, (max-width: 767px) 420px, 420px',
                    width: 420,
                    height: 630,
                    altText: 'Mobile opening'
                }}
                classname="absolute inset-0"
            />
        );

        expect(ImageUI).toHaveBeenCalledTimes(1);
        expect(ImageUI.mock.calls[0][0].sources).toEqual([
            {
                minWidth: 1024,
                srcSet: 'desktop-1200.jpg 1200w, desktop-1920.jpg 1920w',
                sizes: '(min-width: 1440px) 1920px, (min-width: 1024px) and (max-width: 1439px) 1200px, 1200px'
            },
            {
                maxWidth: 1023,
                srcSet: 'mobile-420.jpg 420w, mobile-770.jpg 770w',
                sizes: '(min-width: 768px) and (max-width: 1023px) 770px, (max-width: 767px) 420px, 420px'
            }
        ]);
    });

    it('applies the opacity layer by default', () => {
        render(
            <OpeningMedia
                src="desktop.jpg"
                srcset="desktop.jpg 1200w"
                sizes="1200px"
                width={1200}
                height={800}
                altText="Opening"
            />
        );

        expect(ImageUI.mock.calls[0][0].classnames.image).toContain(
            'opacity-60'
        );
    });

    it('omits the opacity layer when withOpacity is false', () => {
        render(
            <OpeningMedia
                src="desktop.jpg"
                srcset="desktop.jpg 1200w"
                sizes="1200px"
                width={1200}
                height={800}
                altText="Opening"
                withOpacity={false}
            />
        );

        expect(ImageUI.mock.calls[0][0].classnames.image).not.toContain(
            'opacity-60'
        );
    });

    it('defaults the picture breakpoint to 767 when mobile sizes do not include max-width', () => {
        render(
            <OpeningMedia
                src="desktop.jpg"
                srcset="desktop.jpg 1200w"
                sizes="1200px"
                width={1200}
                height={800}
                altText="Opening"
                mobileImage={{
                    src: 'mobile.jpg',
                    srcset: 'mobile.jpg 420w',
                    sizes: '420px',
                    width: 420,
                    height: 630,
                    altText: 'Mobile opening'
                }}
            />
        );

        expect(ImageUI.mock.calls[0][0].sources).toEqual([
            {
                minWidth: 768,
                srcSet: 'desktop.jpg 1200w',
                sizes: '1200px'
            },
            {
                maxWidth: 767,
                srcSet: 'mobile.jpg 420w',
                sizes: '420px'
            }
        ]);
    });
});
