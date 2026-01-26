import React from 'react';
import { render, screen } from '@testing-library/react';
import { getMediaItem } from '../../../../components/layouts/helpers/mediaHelper';

jest.mock('../../../../components/features/LN/common/image/default', () => ({
    __esModule: true,
    default: ({ data }) => (
        <div data-testid="image-component">{data?.type}</div>
    )
}));

jest.mock('../../../../components/features/LN/common/video/default', () => ({
    __esModule: true,
    default: ({ data }) => (
        <div data-testid="video-component">{data?.subtype}</div>
    )
}));

jest.mock('../../../../components/features/LN/common/iframe/default', () => ({
    __esModule: true,
    default: ({ html }) => (
        <div data-testid="iframe-component">{html}</div>
    )
}));


describe('getMediaItem', () => {
    it('should return null when mediaData is not provided', () => {
        const result = getMediaItem({ mediaData: null });
        expect(result).toBeNull();
    });

    it('should render Image component when type is image', () => {
        const mediaData = {
            type: 'image'
        };

        render(getMediaItem({ mediaData }));

        expect(
            screen.getByTestId('image-component')
        ).toBeInTheDocument();
    });

    it('should render VideoPlayer when custom_embed with video_jw subtype', () => {
        const mediaData = {
            type: 'custom_embed',
            subtype: 'video_jw'
        };

        render(getMediaItem({ mediaData }));

        expect(
            screen.getByTestId('video-component')
        ).toBeInTheDocument();
    });

    it('should render MediaIframe when type is raw_html', () => {
        const mediaData = {
            type: 'raw_html',
            content: '<iframe />'
        };

        render(getMediaItem({ mediaData }));

        expect(
            screen.getByTestId('iframe-component')
        ).toBeInTheDocument();
    });

    it('should return null for unsupported media type', () => {
        const mediaData = {
            type: 'unknown_type'
        };

        const result = getMediaItem({ mediaData });

        expect(result).toBeNull();
    });
});
