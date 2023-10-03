import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayerJW from '../../../../../components/private/common/videoPlayerJw';
import Context from 'fusion:context';

jest.mock(
    '../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn
);

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('componentes - private - common - videoPlayerJw', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'default'
    }));

    const mockData = {
        embed: {
            config: {
                idPlayer: 'mockPlayer',
                videoJw: {
                    title: 'MockTitle',
                    playlist: [
                        {
                            images: ['image1.jpg', 'image2.jpg'],
                            image: 'main-image.jpg',
                            pubdate: 16809218408,
                            mediaid: 'abc123'
                        }
                    ]
                }
            }
        }
    };

    it('renders the video player facade', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
            />
        );
        const facadeDiv = document.querySelector(`#facade-MockTitle`);

        expect(facadeDiv).toBeInTheDocument();
    });

    it('should render videoPlayer div', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
            />
        );
        const videoPlayerDiv = document.querySelector(`#MockTitle`);

        expect(videoPlayerDiv).toBeInTheDocument();
    });

    it('renders play button', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
            />
        );
        const buttonPlay = document.querySelector(`#button-play`);

        expect(buttonPlay).toBeInTheDocument();
    });

    it('tests amp component', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'amp'
        }));

        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
            />
        );

        const ampJWPlayer = document.querySelector(
            'amp-jwplayer[data-media-id="abc123"][data-player-id="ih0086X3"][height="9"][layout="responsive"][width="16"]'
        );

        expect(ampJWPlayer).toBeInTheDocument();
    });
});
