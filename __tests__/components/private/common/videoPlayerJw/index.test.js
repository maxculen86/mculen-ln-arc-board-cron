import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VideoPlayerJW from '../../../../../components/private/common/videoPlayerJw';

jest.mock(
    '../../../../../components/private/LN/common/utils/urlForPrerollAds',
    () => jest.fn
);

describe('componentes - private - common - videoPlayerJw', () => {
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
                            pubdate: 16809218408
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
});
