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
    return function(Component) {
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
                            images: ['image1.jpg', 'image2.jpg'],
                            image: 'main-image.jpg',
                            pubdate: 16809218408,
                            mediaid: 'yPJ53Pzg'
                        }
                    ]
                }
            }
        },
        _id: '1234'
    };

    it('renders the video player facade', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
                featureId="5678"
            />
        );
        const facadeDiv = document.querySelector(`#facade-yPJ53Pzg-1234-5678`);

        expect(facadeDiv).toBeInTheDocument();
    });

    it('should render videoPlayer div', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
                featureId="5678"
            />
        );
        const videoPlayerDiv = document.querySelector(`#yPJ53Pzg-1234-5678`);

        expect(videoPlayerDiv).toBeInTheDocument();
    });

    it('renders play button', () => {
        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
                featureId="5678"
            />
        );
        const buttonPlay = document.querySelector(`#button-play`);

        expect(buttonPlay).toBeInTheDocument();
    });

    it('should test component for ott', () => {
        Context.useAppContext = jest.fn(() => ({
            outputType: 'default',
            arcSite: 'ott',
            deployment: jest.fn(),
            contextPath: '/pf'
        }));

        render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
                featureId="5678"
            />
        );
    });

    it('matches snapshot', () => {
        const { asFragment } = render(
            <VideoPlayerJW
                data={mockData}
                parrafo="MockParrafo"
                tituloNota="MockTituloNota"
                hasAutoplay={true}
                featureId="5678"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
