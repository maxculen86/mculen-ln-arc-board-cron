import React from 'react';
import { render } from '@testing-library/react';
import ShareVideo from '../../../../../components/features/LN-common/shareVideo/default';

jest.mock('fusion:environment', () => ({
    SITE_LANACION: 'https://www.lanacion.com.ar'
}));

jest.mock(
    '../../../../../components/features/LN-common/shareVideo/hooks/useJWPlayer',
    () => ({
        useJWPlayer: () => ({
            playerRef: { current: null },
            loadPlayer: jest.fn(),
            setupPlayer: jest.fn(),
            isScriptLoaded: true
        })
    })
);

jest.mock(
    '../../../../../components/chains/LN10_Caja_Carrusel/components/hooks',
    () => ({
        useVideoJwCustomSettings: jest.fn()
    })
);

jest.mock(
    '../../../../../components/features/LN-common/shareVideo/components/VideoShare',
    () => {
        const ActualVideoShare = jest.requireActual(
            '../../../../../components/features/LN-common/shareVideo/components/VideoShare'
        );
        return {
            __esModule: true,
            default: ({ children }) => (
                <div data-testid="video-share">{children}</div>
            )
        };
    }
);

jest.mock(
    '../../../../../components/features/LN-common/shareVideo/components/VideoShareButton',
    () =>
        ({ children, href }) => (
            <a data-testid="video-share-button" href={href}>
                {children}
            </a>
        )
);

jest.mock(
    '../../../../../components/features/LN-common/shareVideo/components/VideoShareMedia',
    () =>
        ({ id }) => <div data-testid="video-share-media">Video ID: {id}</div>
);

describe('Components - features - LN-common - ShareVideo -default', () => {
    it('should match snapshot', () => {
        const { container } = render(<ShareVideo videoId="TdCdBgL" />);
        expect(container).toMatchSnapshot();
    });

    it('should render the "Volver" button with correct link', () => {
        const { getByText, getByTestId } = render(
            <ShareVideo videoId="TdCdBgL" />
        );
        const volverButton = getByText('Volver');
        expect(volverButton).toBeInTheDocument();
        expect(getByTestId('video-share-button')).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar'
        );
    });
});
