import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../../../../../components/private/OTT/ficha/video';
import Context from 'fusion:context';

jest.mock('fusion:context', Component => {
    return function(Component) {
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
                            images: ['image1.jpg', 'image2.jpg'],
                            image: 'main-image.jpg',
                            mediaid: 'yPJ53Pzg'
                        }
                    ]
                }
            }
        },
        _id: '1234'
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

        const facade = container.querySelector('#facade-yPJ53Pzg-1234-');

        expect(facade).toBeInTheDocument();
    });
});
