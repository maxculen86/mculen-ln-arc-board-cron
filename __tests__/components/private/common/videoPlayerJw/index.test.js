import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayerJW from '../../../../../components/private/common/videoPlayerJw';
import Context from 'fusion:context';

jest.mock(
    '../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn
);

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('componentes - private - common - videoPlayerJw', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'default',
        arcSite: 'la-nacion-ar',
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    const mockData = {
        embed: {
            config: {
                idPlayer: 'mockPlayer',
                videoJw: {
                    title: 'MockTitle',
                    playlist: [
                        {
                            images: [
                                { src: 'image1.jpg', width: 320 },
                                { src: 'image2.jpg', width: 480 },
                                { src: 'image3.jpg', width: 720 },
                                { src: 'image4.jpg', width: 1280 }
                            ],
                            image: 'main-image.jpg',
                            pubdate: 16809218408,
                            mediaid: 'yPJ53Pzg',
                            sources: [
                                {
                                    file: 'https://cdn.jwplayer.com/videos/abc123.mp4',
                                    type: 'video/mp4'
                                }
                            ]
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
        const facadeDiv = document.querySelector(`#facade-yPJ53Pzg`);

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
        const videoPlayerDiv = document.querySelector(`#yPJ53Pzg`);

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

    it('matches snapshot', () => {
        const { asFragment } = render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
