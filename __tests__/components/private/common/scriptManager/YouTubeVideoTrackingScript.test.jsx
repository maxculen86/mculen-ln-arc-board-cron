import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import YouTubeVideoTrackingScript from '../../../../../components/private/common/scriptManager/YouTubeVideoTrackingScript';

jest.mock(
    'fusion:context',
    () => ({
        useAppContext: jest.fn()
    }),
    { virtual: true }
);

describe('components - private - common - scriptManager - YouTubeVideoTrackingScript', () => {
    beforeEach(() => {
        useAppContext.mockReturnValue({
            contextPath: '/path',
            deployment: jest.fn(path => `https://lanacion.com.ar${path}`)
        });
    });

    it('renders the YouTube tracking script tag with the correct src', () => {
        const { container } = render(<YouTubeVideoTrackingScript />);

        const scriptTag = container.querySelector(
            '#youtube-video-tracking-script'
        );

        expect(scriptTag).toBeInTheDocument();
        expect(scriptTag).toHaveAttribute(
            'src',
            'https://lanacion.com.ar/path/resources/js/LN/scriptYoutubeVideoTracking.min.js'
        );
        expect(scriptTag).toHaveAttribute('defer');
    });
});
