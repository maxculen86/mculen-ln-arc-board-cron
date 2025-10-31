import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('fusion:consumer', () => {
    return jest.fn(Component => Component);
});

jest.mock('private/common/hooks/useViewportSize', () => {
    return jest.fn(() => 'desktop');
});

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        outputType: 'default',
        globalContent: {
            _id: 'test-id',
            content_elements: [
                {
                    _id: 'card1',
                    type: 'custom_embed',
                    subtype: 'custom-card'
                }
            ]
        }
    }))
}));

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/components/BodyTop',
    () => {
        return function MockBodyTop({ children }) {
            return <div data-testid="body-top">Mocked BodyTop</div>;
        };
    }
);

jest.mock(
    '../../../../../../components/features/LN-common/hooks/useLazyEmbeds',
    () => {
        return jest.fn();
    }
);

jest.mock(
    '../../../../../../components/features/LN-common/hooks/useScrollDispatcher',
    () => {
        const mockUseScrollDispatcher = jest.fn();
        mockUseScrollDispatcher.registerScrollTrigger = jest.fn();
        return mockUseScrollDispatcher;
    }
);

jest.mock('../../../../../../components/layouts/helpers/groupingUtils', () => ({
    groupByMarkers: jest.fn(() => [
        {
            id: 'card_card1',
            items: [
                {
                    _id: 'card1',
                    type: 'custom_embed',
                    subtype: 'custom-card'
                }
            ]
        }
    ]),
    getContentBeforeMarkers: jest.fn(() => [])
}));

jest.mock(
    '../../../../../../components/features/LN-nota/body/_children/_buildBody',
    () => {
        return function MockBuildBody({ globalContent }) {
            return <div data-testid="build-body">Mocked BuildBody</div>;
        };
    }
);

import LinkedSummaryCards from '../../../../../../components/features/LN-nota/bodyCards/default';

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/_utils/linkedSummaryCardsHelper',
    () => ({
        getGridColumns: jest.fn(() => 3),
        createCardWithId: jest.fn(cardGroup => ({
            _id: cardGroup.items[0]._id,
            cardId: cardGroup.id,
            embed: {
                config: {
                    title: 'Título de prueba'
                }
            }
        }))
    })
);

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_buildBodyCustomFields',
    () => jest.fn(() => ({}))
);

jest.mock(
    '../../../../../../components/features/LN-nota/body/_utils/_groupBannerConfig',
    () => jest.fn(() => ({}))
);

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/_utils/cardRenderer',
    () => ({
        renderExpandedCard: jest.fn(() => (
            <div data-testid="expanded-card">Expanded Card</div>
        )),
        scrollCallback: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/features/LN-nota/bodyCards/components/LinkedSummaryCardsGrid',
    () => {
        return function MockLinkedSummaryCardsGrid({ cards, gridColumns }) {
            return (
                <div data-testid="cards-grid" data-grid-columns={gridColumns}>
                    {cards.map(card => (
                        <div key={card.cardId} data-testid="card-small">
                            {card.embed.config.title}
                        </div>
                    ))}
                </div>
            );
        };
    }
);

describe('BodyCards', () => {
    it('renders cards correctly', () => {
        render(<LinkedSummaryCards />);

        expect(screen.getByTestId('cards-grid')).toBeInTheDocument();

        expect(screen.getByTestId('card-small')).toBeInTheDocument();
        expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    });

    it('renders null when there are no cardGroups', () => {
        const mockGroupByMarkers =
            require('../../../../../../components/layouts/helpers/groupingUtils').groupByMarkers;
        mockGroupByMarkers.mockReturnValueOnce([]);

        const { container } = render(<LinkedSummaryCards />);
        expect(container.firstChild).toBeNull();
    });
});
