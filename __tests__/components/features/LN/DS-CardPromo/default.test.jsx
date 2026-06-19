import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import DSCardPromo from '../../../../../components/features/LN/DS-CardPromo/default';

jest.mock(
    '../../../../../components/features/LN-10/article/common/_helper-WebApi',
    () => ({ getChainParentOfFeature: jest.fn(() => null) })
);

jest.mock('../../../../../components/features/LN-common/Juego/helper', () => ({
    getCardPosition: jest.fn(() => 0),
    getParentLayout: jest.fn(() => 'fourVertical'),
    getFirstCard: jest.fn(() => false),
    getHrefLink: jest.fn(() => '/juegos/crucigrama')
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/addInitialSlash',
    () => ({ addInitialSlash: jest.fn(id => `/${id}`) })
);

jest.mock(
    '../../../../../components/private/LN/common/utils/addForwardSlash',
    () => ({ addForwardSlash: jest.fn(id => `${id}/`) })
);

jest.mock('../../../../../components/private/common/utils/get', () =>
    jest.fn(() => '')
);

jest.mock(
    '../../../../../components/private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage',
    () =>
        function MockPageBuilderMessage({ message }) {
            return <div data-testid="page-builder-message">{message}</div>;
        }
);

jest.mock(
    '../../../../../components/features/LN/DS-CardPromo/hooks/useGetImage',
    () => jest.fn(() => ({ resizedUrl: '', sources: [] }))
);

jest.mock(
    '../../../../../components/chains/LN_DS_CajaPromo/common/layoutRules',
    () => ({
        getRuleForIndex: jest.fn(() => ({ size: 18, orientation: 'vertical' }))
    })
);

jest.mock(
    '../../../../../components/chains/LN_DS_CajaPromo/common/promoContext',
    () => ({
        usePromoContext: jest.fn(() => ({ contentType: 'game' }))
    })
);

jest.mock(
    '../../../../../components/features/LN/common/cardPromo/default',
    () => ({
        CardPromo: Object.assign(
            ({ children, ...props }) => (
                <a data-testid="card-promo" {...props}>
                    {children}
                </a>
            ),
            {
                Overlay: () => null,
                Media: () => null,
                Content: ({ children }) => <div>{children}</div>,
                Title: ({ children }) => (
                    <span data-testid="card-title">{children || ''}</span>
                ),
                Description: ({ children }) =>
                    children ? (
                        <p data-testid="card-description">{children}</p>
                    ) : null,
                Action: ({ children }) => <button>{children}</button>
            }
        )
    })
);

import { usePromoContext } from '../../../../../components/chains/LN_DS_CajaPromo/common/promoContext';

const baseCustomFields = {
    sectionId: '/juegos/crucigrama',
    imageId: '',
    type: 'Interno',
    subscriber: 'NO',
    isNew: 'NO',
    badgeText: '',
    description: 'Descripción del juego',
    buttonText: ''
};

const baseProps = {
    id: 'feature-id-123',
    isAdmin: false,
    customFields: baseCustomFields
};

describe('DSCardPromo - description behavior', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppContext.mockReturnValue({
            arcSite: 'la-nacion-ar',
            renderables: []
        });
        useContent.mockReturnValue({});
        usePromoContext.mockReturnValue({ contentType: 'game' });
    });

    describe('when contentType is game (isTag is always false)', () => {
        it('should render description when description is provided', () => {
            render(<DSCardPromo {...baseProps} />);
            expect(screen.getByTestId('card-description')).toHaveTextContent(
                'Descripción del juego'
            );
        });

        it('should not render description element when description is empty', () => {
            render(
                <DSCardPromo
                    {...baseProps}
                    customFields={{ ...baseCustomFields, description: '' }}
                />
            );
            expect(
                screen.queryByTestId('card-description')
            ).not.toBeInTheDocument();
        });
    });

    describe('when contentType is podcast and sectionId is a tag (/tema/)', () => {
        beforeEach(() => {
            usePromoContext.mockReturnValue({ contentType: 'podcast' });
        });

        it('should not render description even when description is provided', () => {
            render(
                <DSCardPromo
                    {...baseProps}
                    customFields={{
                        ...baseCustomFields,
                        sectionId: '/tema/politica',
                        description: 'Esta descripción no debería verse'
                    }}
                />
            );
            expect(
                screen.queryByTestId('card-description')
            ).not.toBeInTheDocument();
        });

        it('should use description as title when isTag is true', () => {
            render(
                <DSCardPromo
                    {...baseProps}
                    customFields={{
                        ...baseCustomFields,
                        sectionId: '/tema/politica',
                        description: 'Política'
                    }}
                />
            );
            expect(screen.getByTestId('card-title')).toHaveTextContent(
                'Política'
            );
        });
    });

    describe('when contentType is podcast but sectionId is not a tag', () => {
        beforeEach(() => {
            usePromoContext.mockReturnValue({ contentType: 'podcast' });
            useContent.mockReturnValue({ name: 'Título de sección' });
        });

        it('should render description when sectionId is not a /tema/ path', () => {
            render(
                <DSCardPromo
                    {...baseProps}
                    customFields={{
                        ...baseCustomFields,
                        sectionId: '/podcasts/serie',
                        description: 'Descripción del podcast'
                    }}
                />
            );
            expect(screen.getByTestId('card-description')).toHaveTextContent(
                'Descripción del podcast'
            );
        });
    });
});
