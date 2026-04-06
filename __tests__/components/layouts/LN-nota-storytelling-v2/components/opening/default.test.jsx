import React from 'react';
import { render, screen } from '@testing-library/react';
import Opening from '../../../../../../components/layouts/LN-nota-storytelling-v2/components/opening/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        deployment: jest.fn(path => path),
        contextPath: '/pf',
        arcSite: 'la-nacion-ar'
    }))
}));

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
jest.mock(
    '../../../../../../components/features/LN-nota/signature/default',
    () => ({
        __esModule: true,
        default: () => <div data-testid="signature-feature">Signature</div>
    })
);

jest.mock(
    '../../../../../../components/features/LN/common/dateAndReadingTime/default',
    () => ({
        __esModule: true,
        default: () => (
            <div data-testid="date-reading-time">Date and Reading Time</div>
        )
    })
);

jest.mock(
    '../../../../../../components/features/LN/DS-Toolbar/default',
    () => ({
        __esModule: true,
        default: () => <div data-testid="toolbar">Toolbar</div>
    })
);

jest.mock(
    '../../../../../../components/private/common/utils/firmaHelper',
    () => ({
        place: {
            Top: 'top'
        }
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
            pictureSources: [],
            imgDefaultUrl: 'image.jpg',
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
        expect(screen.getByTestId('signature-feature')).toBeInTheDocument();
        expect(screen.getByTestId('date-reading-time')).toBeInTheDocument();
        expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    });

    it('passes shared props to getOpeningComponent', () => {
        render(<Opening globalContent={{ headlines: {} }} layout="article" />);

        expect(getOpeningComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                diagram: 'title-100',
                pictureSources: [],
                imgDefaultUrl: 'image.jpg',
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
        expect(screen.getByTestId('signature-feature')).toBeInTheDocument();
    });

    it('passes globalContent to signature feature via context', () => {
        const globalContent = {
            authors: [{ name: 'John Doe' }],
            headlines: {}
        };

        render(<Opening globalContent={globalContent} layout="article" />);

        expect(screen.getByTestId('signature-feature')).toBeInTheDocument();
    });

    it('passes globalContent to date reading time component', () => {
        const globalContent = {
            publish_date: '2024-01-15',
            headlines: {}
        };

        render(<Opening globalContent={globalContent} layout="article" />);

        expect(screen.getByTestId('date-reading-time')).toBeInTheDocument();
    });

    it('handles different diagram types', () => {
        getOpeningMediaData.mockReturnValue({
            pictureSources: [],
            imgDefaultUrl: 'image.jpg',
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

    it('renders toolbar after date and time', () => {
        render(<Opening globalContent={{}} layout="article" />);

        const toolbarElement = screen.getByTestId('toolbar');
        expect(toolbarElement).toBeInTheDocument();
    });
});
