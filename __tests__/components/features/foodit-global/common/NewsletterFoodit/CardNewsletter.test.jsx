import React from 'react';
import { render } from '@testing-library/react';
import { CardNewsletter } from '../../../../../../components/features/foodit-global/common/Newsletter/CardNewsletter';

jest.mock(
    '../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({
        __esModule: true,
        default: () => ({
            isSubscribed: false
        })
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterSelectionButton',
    () => ({
        NewsletterSelectionButton: () => (
            <button data-testid="selection-button">Seleccionar</button>
        )
    })
);

jest.mock(
    '../../../../../../components/features/foodit-global/common/Newsletter/components/NewsletterSubscriptionButton',
    () => ({
        NewsletterSubscriptionButton: () => (
            <button data-testid="subscription-button">Suscrito</button>
        )
    })
);

describe('CardNewsletter', () => {
    it('renders correctly (snapshot)', () => {
        const { container } = render(
            <CardNewsletter
                title="Newsletter Foodit veggie"
                description="Con plantas, legumbres y semillas, una selección de deliciosas recetas vegetarianas y veganas."
                badge="NUEVO"
                image="https://especialess3.lanacion.com.ar/LN/newsletter/landing/veggie.jpg"
                id="veggie"
                suscribed={false}
            />
        );

        expect(container).toMatchSnapshot();
    });
});
