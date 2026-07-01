import React from 'react';
import { render, screen } from '@testing-library/react';
import Opening from '../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/default';

jest.mock(
    'fusion:context',
    () => ({
        useAppContext: jest.fn(() => ({
            deployment: jest.fn(path => path),
            contextPath: '/pf',
            arcSite: 'la-nacion-ar'
        }))
    }),
    { virtual: true }
);

jest.mock('../../../../../../components/private/common/utils/get', () =>
    jest.fn()
);
jest.mock(
    '../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningMediaData',
    () => jest.fn()
);
jest.mock(
    '../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getTitleData',
    () => ({
        getTitleData: jest.fn()
    })
);
jest.mock(
    '../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/openingComponent',
    () => ({
        getOpeningComponent: jest.fn(),
        DEFAULT_DIAGRAM: 'title-100'
    })
);

const get = require('../../../../../../components/private/common/utils/get');
const getOpeningMediaData = require('../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getOpeningMediaData');
const {
    getTitleData
} = require('../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/getTitleData');
const {
    getOpeningComponent
} = require('../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/helpers/openingComponent');

describe('Opening', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        get.mockImplementation((obj, path, defaultVal) => defaultVal);
        getTitleData.mockReturnValue({
            title1: 'Article Title',
            title2: 'Article Subtitle'
        });
        getOpeningMediaData.mockReturnValue({
            src: 'image.jpg',
            srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
            sizes: '100vw',
            width: 1024,
            height: 576,
            altText: 'article image',
            diagram: 'title-100'
        });
        getOpeningComponent.mockReturnValue(
            <div data-testid="opening-component">Opening Component</div>
        );
    });

    it('renders all main sections', () => {
        render(<Opening globalContent={{}} layout="article" />);

        expect(screen.getByTestId('opening-component')).toBeInTheDocument();
    });

    it('passes shared props to getOpeningComponent', () => {
        render(<Opening globalContent={{ headlines: {} }} layout="article" />);

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                diagram: 'title-100',
                src: 'image.jpg',
                srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
                sizes: '100vw',
                width: 1024,
                height: 576,
                altText: 'article image',
                globalContent: expect.any(Object),
                layout: 'article',
                title1: 'Article Title',
                title2: 'Article Subtitle',
                subheadline: ''
            })
        );
    });

    it('uses empty string as default subheadline', () => {
        const globalContent = {
            headlines: {}
        };

        render(<Opening globalContent={globalContent} layout="article" />);

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                subheadline: ''
            })
        );
    });

    it('renders with empty globalContent', () => {
        render(<Opening globalContent={{}} layout="" />);

        expect(screen.getByTestId('opening-component')).toBeInTheDocument();
    });

    it('handles different diagram types', () => {
        getOpeningMediaData.mockReturnValue({
            src: 'image.jpg',
            srcset: 'image-small.jpg 500w, image-large.jpg 1024w',
            sizes: '100vw',
            width: 1024,
            height: 576,
            altText: 'article image',
            diagram: 'image-panoramic'
        });

        render(<Opening globalContent={{}} layout="article" />);

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                diagram: 'image-panoramic'
            })
        );
    });

    it('passes layout to getOpeningComponent', () => {
        render(<Opening globalContent={{}} layout="special-layout" />);

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                layout: 'special-layout'
            })
        );
    });

    it('handles missing promo_items', () => {
        render(<Opening globalContent={{ headlines: {} }} layout="article" />);

        expect(getOpeningMediaData).toHaveBeenCalledWith({}, 'Article Title');
    });

    it('handles missing headlines', () => {
        render(<Opening globalContent={{}} layout="article" />);

        expect(getTitleData).toHaveBeenCalledWith({});
    });

    it('passes hasStorytellingMobile=true to getOpeningComponent when storytelling_mobile exists', () => {
        get.mockImplementation((obj, path, defaultVal) => {
            if (path === 'storytelling_mobile') return { url: 'mobile.jpg' };
            return defaultVal;
        });

        render(
            <Opening globalContent={{}} layout="article">
                <span data-testid="video-player">Video</span>
            </Opening>
        );

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                hasStorytellingMobile: true
            })
        );
    });

    it('passes hasStorytellingMobile=false to getOpeningComponent when storytelling_mobile is absent', () => {
        get.mockImplementation((obj, path, defaultVal) => {
            if (path === 'storytelling_mobile') return null;
            return defaultVal;
        });

        render(
            <Opening globalContent={{}} layout="article">
                <span data-testid="video-player">Video</span>
            </Opening>
        );

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                hasStorytellingMobile: false
            })
        );
    });

    it('renders children directly without wrapper regardless of storytelling_mobile', () => {
        get.mockImplementation((obj, path, defaultVal) => {
            if (path === 'storytelling_mobile') return { url: 'mobile.jpg' };
            return defaultVal;
        });

        render(
            <Opening globalContent={{}} layout="article">
                <span data-testid="video-player">Video</span>
            </Opening>
        );

        const videoPlayer = screen.getByTestId('video-player');
        expect(videoPlayer.parentElement.className).not.toContain('hidden');
    });
});
