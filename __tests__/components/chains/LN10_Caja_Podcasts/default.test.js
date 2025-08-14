import React from 'react';
import { render, screen } from '@testing-library/react';
import CajaPodcasts from '../../../../components/chains/LN10_Caja_Podcasts/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:static', () => props => (
    <div data-testid="static">{props.children}</div>
));

jest.mock(
    '../../../../components/chains/utils/_BuildRoof/default',
    () => props => <div data-testid="build-roof">{JSON.stringify(props)}</div>
);

jest.mock('../../../../components/chains/utils/_helpers', () => ({
    useRoofData: jest.fn()
}));

jest.mock(
    '../../../../components/private/common/warningMessage/warningMessage',
    () => props => <div data-testid="warning-message">{props.message}</div>
);

jest.mock(
    '../../../../components/chains/LN10_Caja_Juegos_v2/common/_helper',
    () => ({
        getGameDiagramationItems: jest.fn(),
        validateGamesChain: jest.fn()
    })
);

jest.mock(
    '../../../../components/features/LN-common/Juego/diagramationCard',
    () => props => <div data-testid="diagramation-card">{props.children}</div>
);

describe('CajaPodcasts', () => {
    const mockUseAppContext = require('fusion:context').useAppContext;
    const mockUseRoofData =
        require('../../../../components/chains/utils/_helpers').useRoofData;
    const mockValidateGamesChain =
        require('../../../../components/chains/LN10_Caja_Juegos_v2/common/_helper').validateGamesChain;
    const mockGetGameDiagramationItems =
        require('../../../../components/chains/LN10_Caja_Juegos_v2/common/_helper').getGameDiagramationItems;

    const defaultProps = {
        id: 'test-feature',
        customFields: {
            layout: 'twoHorizontal',
            logoId: 'logo123',
            link: 'https://example.com',
            hideTitle: false,
            hideCaja: false,
            title: 'Podcasts',
            navigator: '',
            buttonLogo: '',
            buttonText: '',
            linkButton: '',
            buttonStyle: 'generic'
        },
        children: <div data-testid="child">Child</div>
    };

    beforeEach(() => {
        mockUseAppContext.mockReturnValue({
            isAdmin: false,
            layout: 'default-layout',
            deployment: jest.fn(path => `/mocked${path}`),
            contextPath: '/resources'
        });
        mockUseRoofData.mockReturnValue({ mock: 'roofData' });
        mockValidateGamesChain.mockReturnValue(null);
        mockGetGameDiagramationItems.mockReturnValue(
            <div data-testid="game-items">Games</div>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders Static and DiagramationCard when hideCaja is false', () => {
        render(<CajaPodcasts {...defaultProps} />);

        expect(screen.getByTestId('static')).toBeInTheDocument();
        expect(screen.getByTestId('build-roof')).toBeInTheDocument();
        expect(screen.getByTestId('diagramation-card')).toBeInTheDocument();
        expect(screen.getByTestId('game-items')).toBeInTheDocument();
    });

    it('renders null when hideCaja is true', () => {
        render(
            <CajaPodcasts
                {...defaultProps}
                customFields={{ ...defaultProps.customFields, hideCaja: true }}
            />
        );
        expect(screen.queryByTestId('static')).not.toBeInTheDocument();
    });

    it('shows a WarningMessage when isAdmin and there is an error', () => {
        mockUseAppContext.mockReturnValue({
            isAdmin: true,
            layout: 'default-layout'
        });
        mockValidateGamesChain.mockReturnValue({
            type: 'error',
            message: 'Invalid chain'
        });

        render(<CajaPodcasts {...defaultProps} />);

        expect(screen.getByTestId('warning-message')).toHaveTextContent(
            'Invalid chain'
        );
    });

    it('calls useRoofData with correct parameters', () => {
        render(<CajaPodcasts {...defaultProps} />);
        expect(mockUseRoofData).toHaveBeenCalledWith(
            expect.objectContaining({
                logoId: 'logo123',
                link: 'https://example.com',
                title: 'Podcasts',
                isStatic: true
            })
        );
    });

    it('passes diagramation to DiagramationCard', () => {
        render(
            <CajaPodcasts
                {...defaultProps}
                customFields={{
                    ...defaultProps.customFields,
                    layout: 'fourVertical'
                }}
            />
        );
        expect(mockGetGameDiagramationItems).toHaveBeenCalledWith(
            expect.anything(),
            'fourVertical'
        );
    });
});
