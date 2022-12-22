import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../../../../../components/private/OTT/ficha/video';
import videoPlayer from '../../../../../components/private/common/videoPlayer';
import { prettyDOM } from '@testing-library/dom';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:properties', () => () => ({
    getProperties: () => ({ host: 'https://www.lanacion.com.ar' })
}));

describe('components - private - OTT - ficha - video', () => {
    global.window.dataLayer = [];

    const videoId = '38d2a024-28bb-47e1-9b4f-706ac2896532';

    const videoData = {
        type: 'image',
        version: '0.5.8',
        credits: {},
        caption: 'El chinito',
        url:
            'https://www.lanacion.com.ar/resizer/Z0DhTSmlGFdmwNX7GqdSlNMf6rc=/820x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/05-27-2019/t_b9a5dcbacf6e44c9b4d4e1da525eb759_name_file_1280x720_2000_v3_1_.jpg',
        width: 1280,
        height: 720,
        resized_urls: [
            {
                resizedUrl:
                    'https://www.lanacion.com.ar/resizer/Z0DhTSmlGFdmwNX7GqdSlNMf6rc=/820x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/05-27-2019/t_b9a5dcbacf6e44c9b4d4e1da525eb759_name_file_1280x720_2000_v3_1_.jpg',
                option: {}
            },
            {
                resizedUrl:
                    'https://www.lanacion.com.ar/resizer/lOu3iX1mA8hKUd0fyVxtqbuCf50=/768x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/05-27-2019/t_b9a5dcbacf6e44c9b4d4e1da525eb759_name_file_1280x720_2000_v3_1_.jpg',
                option: {}
            },
            {
                resizedUrl:
                    'https://www.lanacion.com.ar/resizer/xRxalKuoS3QhJweAQYgfscJT1GY=/360x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/05-27-2019/t_b9a5dcbacf6e44c9b4d4e1da525eb759_name_file_1280x720_2000_v3_1_.jpg',
                option: {}
            },
            {
                resizedUrl:
                    'https://www.lanacion.com.ar/resizer/B6prdSGHVq45mciCnzpgkfWryUQ=/351x0/filters:format(webp):quality(80)/d3us6z9haan6vf.cloudfront.net/05-27-2019/t_b9a5dcbacf6e44c9b4d4e1da525eb759_name_file_1280x720_2000_v3_1_.jpg',
                option: {}
            }
        ]
    };

    let component;

    beforeEach(() => {
        component = render(
            <Video videoId={videoId} videoData={videoData} arcSite="ott" />
        );
    });

    it('should render video component correctly', () => {
        const { container } = component;

        expect(
            container.getElementsByClassName('apertura --video')
        ).toBeTruthy();
        expect(container.getElementsByClassName('content-facade')).toBeTruthy();
    });

    it('It should have the src of the image in www.lanacion.com.ar ', () => {
        const { container } = component;
        const img = container.querySelector('img');

        expect(
            img.getAttribute('src').includes('https://www.lanacion.com.ar')
        ).toBeTruthy();
    });

    it('It should have the loading of the image in eager ', () => {
        const { container } = component;

        expect(
            container.querySelector('img').getAttribute('loading')
        ).toStrictEqual('eager');
    });
});
