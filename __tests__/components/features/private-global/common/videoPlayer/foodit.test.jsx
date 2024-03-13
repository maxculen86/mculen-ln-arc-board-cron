import React from 'react';
import Context from 'fusion:context';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import VideoPlayer from '../../../../../../components/features/private-global/common/videoPlayer/foodit';

jest.mock('fusion:context', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

describe('Features - private-global/common - VideoPlayer Component, outputType Foodit', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'foodit',
        deployment: jest.fn(),
        contextPath: '/pf'
    }));

    it('renders without crashing when no props are provided', () => {
        const { container } = render(<VideoPlayer />);
        expect(container).toBeTruthy();
    });

    const videoJW = {
        embed: {
            config: {
                idPlayer: 'ih0086X3',
                idVideo: 'wzNCu0kE',
                videoJw: {
                    description: ' ',
                    kind: 'Single Item',
                    playlist: [
                        {
                            description: ' ',
                            duration: '433634',
                            image:
                                'https://cdn.jwplayer.com/v2/media/wzNCu0kE/poster.jpg?width=720',
                            images: [
                                {
                                    src:
                                        'https://cdn.jwplayer.com/v2/media/wzNCu0kE/poster.jpg?width=320',
                                    type: 'image/jpeg',
                                    width: 320
                                },
                                {
                                    src:
                                        'https://cdn.jwplayer.com/v2/media/wzNCu0kE/poster.jpg?width=480',
                                    type: 'image/jpeg',
                                    width: 480
                                }
                            ],
                            link: 'https://cdn.jwplayer.com/previews/wzNCu0kE',
                            mediaid: 'wzNCu0kE',
                            pubdate: 1657907249,
                            sources: [
                                {
                                    file:
                                        'https://cdn.jwplayer.com/manifests/wzNCu0kE.m3u8',
                                    type: 'application/vnd.apple.mpegurl'
                                },
                                {
                                    bitrate: 413100,
                                    file:
                                        'https://cdn.jwplayer.com/videos/wzNCu0kE-kTExGaWf.mp4',
                                    filesize: 22359059,
                                    framerate: 30,
                                    height: 180,
                                    label: '180p',
                                    type: 'video/mp4',
                                    width: 320
                                },
                                {
                                    bitrate: 647029,
                                    file:
                                        'https://cdn.jwplayer.com/videos/wzNCu0kE-K8B0kybS.mp4',
                                    filesize: 35020492,
                                    framerate: 30,
                                    height: 270,
                                    label: '270p',
                                    type: 'video/mp4',
                                    width: 480
                                }
                            ],
                            title:
                                'Ariel en su salsa: Waffles de chocolate con bananas foster',
                            tracks: [
                                {
                                    file:
                                        'https://cdn.jwplayer.com/strips/wzNCu0kE-120.vtt',
                                    kind: 'thumbnails'
                                }
                            ],
                            variations: {}
                        }
                    ],
                    title:
                        'Ariel en su salsa: Waffles de chocolate con bananas foster'
                }
            }
        },
        subtype: 'video_jw'
    };

    it('renders VideoPlayer', () => {
        const { container } = render(
            <VideoPlayer
                data={videoJW}
                tituloNota="title"
                className="w-100 ratio-16-9"
            />
        );
        expect(container).toBeTruthy();

        expect(screen.getByTestId('facade-wzNCu0kE')).toBeInTheDocument();
    });
});
