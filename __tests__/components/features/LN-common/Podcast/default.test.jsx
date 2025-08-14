import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Podcast from '../../../../../components/features/LN-common/Podcast/default';
import useGetImage from '../../../../../components/features/LN-common/Podcast/hooks/useGetImage';
import { sources } from 'webpack';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock('@ln/contenidos-ui-cardgames', () => ({
    CardGame: props => (
        <div
            data-testid="card-podcast"
            data-title={props.title}
            data-img={props.imageProps?.src}
            data-label={props.buttonProps?.label}
            data-href={props.linkProps?.href}
            data-badge={props.badge || ''}
        >
            {props.ribbon}
        </div>
    )
}));

jest.mock('@ln/cva', () => ({
    cx: (...args) => args.join(' '),
    cva: jest.fn(
        () =>
            (...args) =>
                args.join(' ')
    )
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/checkSection',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/features/LN-common/Podcast/hooks/useGetImage',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/private/LN/common/utils/addInitialSlash',
    () => ({
        addInitialSlash: jest.fn(id => id)
    })
);
jest.mock(
    '../../../../../components/private/LN/common/utils/getGameProperties',
    () => jest.fn()
);
jest.mock(
    '../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () => props => <div data-testid="ribbon-icon">{props.name}</div>
);
jest.mock(
    '../../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage',
    () => props => <div data-testid="admin-warning">{props.message}</div>
);
jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn()
);
jest.mock(
    '../../../../../components/features/LN-10/article/common/_helper-WebApi',
    () => ({
        getChainParentOfFeature: jest.fn(),
        checkForId: jest.fn()
    })
);
jest.mock('../../../../../components/features/LN-common/Juego/helper', () => ({
    getCardPosition: jest.fn(),
    getParentLayout: jest.fn(),
    getFirstCard: jest.fn(),
    getHrefLink: jest.fn(),
    getDescriptionData: jest.fn(),
    getClassName: jest.fn()
}));

describe('Podcast component', () => {
    const mockUseAppContext = require('fusion:context').useAppContext;
    const mockUseContent = require('fusion:content').useContent;
    const mockGetGameProperties = require('../../../../../components/private/LN/common/utils/getGameProperties');
    const mockGet = require('../../../../../components/private/common/utils/get');
    const mockCheckSection = require('../../../../../components/private/LN/common/utils/checkSection');
    const mockHelper = require('../../../../../components/features/LN-common/Juego/helper');
    const mockChainHelper = require('../../../../../components/features/LN-10/article/common/_helper-WebApi');

    const defaultProps = {
        id: 'test-podcast',
        isAdmin: false,
        customFields: {
            sectionId: '/test-section',
            podcastType: 'Interno',
            subscriber: 'SI',
            isNewPodcast: 'NUEVO PODCAST',
            description: 'Podcast description',
            buttonText: 'Reproducir'
        }
    };

    beforeEach(() => {
        mockUseAppContext.mockReturnValue({
            contextPath: '/context',
            deployment: '/resources',
            arcSite: 'site',
            renderables: [],
            globalContent: {}
        });

        useGetImage.mockReturnValue({
            resizedUrl:
                'https://sandbox-resizer.glanacion.com/resizer/v2/argentina-suele-ser-terreno-fertil-para-los-4NM72DSHFZFWVE6YC2RDEDZP2A.jpeg?auth=78e2a60d58926af7272bb7bb74faa32041b03731c17e3a4b97025e185ed94e4f&width=144&quality=70&smart=false',
            sources: []
        });

        mockUseContent.mockImplementation(({ source }) => {
            if (source === 'sectionSource') {
                return { name: 'Test Section Title' };
            }
            if (source === 'lnAcuSource') {
                return {
                    content_elements: [{ website_url: '/test-url' }]
                };
            }
            return {};
        });

        mockGetGameProperties.mockReturnValue({
            title: 'Test Podcast Title',
            logo: { src: '/logo.png' }
        });

        mockGet.mockReturnValue('/test-url');
        mockCheckSection.mockReturnValue(false);

        mockChainHelper.getChainParentOfFeature.mockReturnValue([]);
        mockChainHelper.checkForId.mockReturnValue(true);
        mockHelper.getCardPosition.mockReturnValue(0);
        mockHelper.getParentLayout.mockReturnValue('layout-type');
        mockHelper.getFirstCard.mockReturnValue(true);
        mockHelper.getHrefLink.mockReturnValue('/podcast-link');
        mockHelper.getDescriptionData.mockReturnValue('Podcast description');
        mockHelper.getClassName.mockReturnValue('mocked-class');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders CardGame with correct props', () => {
        render(<Podcast {...defaultProps} />);
        const card = screen.getByTestId('card-podcast');
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute('data-title', 'Test Podcast Title');
        expect(card).toHaveAttribute(
            'data-img',
            'https://sandbox-resizer.glanacion.com/resizer/v2/argentina-suele-ser-terreno-fertil-para-los-4NM72DSHFZFWVE6YC2RDEDZP2A.jpeg?auth=78e2a60d58926af7272bb7bb74faa32041b03731c17e3a4b97025e185ed94e4f&width=144&quality=70&smart=false'
        );
        expect(card).toHaveAttribute('data-label', 'Reproducir');
        expect(card).toHaveAttribute('data-href', '/podcast-link');
        expect(card).toHaveAttribute('data-badge', 'NUEVO PODCAST');
        expect(screen.getByTestId('ribbon-icon')).toBeInTheDocument();
    });

    it('does not render ribbon when subscriber is "NO"', () => {
        render(
            <Podcast
                {...defaultProps}
                customFields={{
                    ...defaultProps.customFields,
                    subscriber: 'NO'
                }}
            />
        );
        expect(screen.queryByTestId('ribbon-icon')).not.toBeInTheDocument();
    });

    it('uses default button label when buttonText is empty', () => {
        render(
            <Podcast
                {...defaultProps}
                customFields={{ ...defaultProps.customFields, buttonText: '' }}
            />
        );
        const card = screen.getByTestId('card-podcast');
        expect(card).toHaveAttribute('data-label', 'Reproducir');
    });

    it('renders warning message if sectionId is missing and isAdmin is true', () => {
        render(
            <Podcast
                {...defaultProps}
                isAdmin={true}
                customFields={{ ...defaultProps.customFields, sectionId: '' }}
            />
        );
        expect(screen.getByTestId('admin-warning')).toHaveTextContent(
            'El sectionId es un campo obligatorio'
        );
    });
});
