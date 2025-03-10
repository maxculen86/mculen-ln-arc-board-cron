import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../../../../../components/private/OTT/ficha/video';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

describe('components - private - ott - ficha', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'default',
        arcSite: 'ott',
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    const videoData = {
        embed: {
            config: {
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
                            mediaid: 'yPJ53Pzg'
                        }
                    ]
                }
            }
        }
    };

    it('renders Video component section', () => {
        const { container } = render(
            <Video videoData={videoData} isOtt={true} />
        );

        const section = container.querySelector(
            '.container-vw-100.bg-dark-100'
        );

        expect(section).toBeInTheDocument();
    });

    it('renders facade', () => {
        const { container } = render(
            <Video videoData={videoData} isOtt={true} />
        );

        const facade = container.querySelector('#facade-yPJ53Pzg');

        expect(facade).toBeInTheDocument();
    });
});
