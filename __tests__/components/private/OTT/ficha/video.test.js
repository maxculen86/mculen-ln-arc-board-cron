import React from 'react';
import Context from 'fusion:context';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Video from '../../../../../components/private/OTT/ficha/video';
import videoPlayer from '../../../../../components/private/common/videoPlayer';

jest.mock(
    '../../../../../components/private/common/videoPlayer',
    () => 'mocked-component'
);

describe('components - private - OTT - ficha - video', () => {
    it('should render video component correctly', () => {
        const videoId = '38d2a024-28bb-47e1-9b4f-706ac2896532';
        const { container } = render(<Video videoId={videoId} />);
        const videoPlayer = container.getElementsByTagName(
            'mocked-component'
        )[0];

        expect(
            container.getElementsByClassName('apertura --video')
        ).toBeTruthy();
        expect(videoPlayer).toBeInTheDocument();
        expect(videoPlayer).toHaveAttribute('videoid', videoId);
    });
});
