import React from 'react';
import { render, screen } from '@testing-library/react';
import { getMediaItem } from '../../../../../../components/layouts/helpers/mediaHelper';
import Media from '../../../../../../components/layouts/LN-Nota-Opinion/components/apertura/Media';

jest.mock('../../../../../../components/layouts/helpers/mediaHelper', () => ({
    getMediaItem: jest.fn()
}));

describe('Media', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders image media with caption and attribution', () => {
        getMediaItem.mockReturnValue(
            <img alt="Lionel Messi." src="image.jpg" />
        );

        render(
            <Media
                data={{
                    mediaData: { type: 'image' },
                    caption: 'Lionel Messi.',
                    attribution: 'AFP'
                }}
            />
        );

        expect(screen.getByAltText('Lionel Messi.')).toBeInTheDocument();
        expect(screen.getByText('Lionel Messi.')).toBeInTheDocument();
        expect(screen.getByText('AFP')).toBeInTheDocument();
    });

    it('renders iframe media without caption or attribution', () => {
        getMediaItem.mockReturnValue(<iframe title="youtube-video" />);

        render(
            <Media
                data={{
                    mediaData: { type: 'raw_html' },
                    caption: '',
                    attribution: ''
                }}
            />
        );

        expect(screen.getByTitle('youtube-video')).toBeInTheDocument();
    });

    it('renders video media with caption', () => {
        getMediaItem.mockReturnValue(<div data-testid="jw-video" />);

        render(
            <Media
                data={{
                    mediaData: { subtype: 'video_jw' },
                    caption:
                        'Mansion de Pilar vinculada a Toviggino; la causa queda a cargo del juez Adrian Gonzalez Charvay',
                    attribution: ''
                }}
            />
        );

        expect(screen.getByTestId('jw-video')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Mansion de Pilar vinculada a Toviggino; la causa queda a cargo del juez Adrian Gonzalez Charvay'
            )
        ).toBeInTheDocument();
    });

    it('returns null when no mediaData is provided', () => {
        getMediaItem.mockReturnValue(null);

        const { container } = render(
            <Media
                data={{
                    mediaData: null,
                    caption: '',
                    attribution: ''
                }}
            />
        );

        expect(container.firstChild).toBeNull();
    });
});
