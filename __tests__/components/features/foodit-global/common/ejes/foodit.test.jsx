import React from 'react';
import { render, screen } from '@testing-library/react';
import { EjesHome } from '../../../../../../components/features/foodit-global/common/ejesHome/foodit';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({
        deployment: path => `https://example.com${path}`,
        contextPath: '/pf'
    })
}));

describe('EjesHome integrated', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders links with correct URLs', () => {
        render(<EjesHome />);

        const links = screen.getAllByRole('link');
        const hrefs = links.map(link => link.getAttribute('href'));

        expect(hrefs).toEqual([
            '/aprende-en-la-cocina/',
            '/cocina-facil-y-rapido/',
            '/cocina-a-tu-medida/',
            '/subcategoria-receta/'
        ]);
    });

    it('snapshot with real links', () => {
        const { asFragment } = render(<EjesHome />);
        expect(asFragment()).toMatchSnapshot();
    });

    describe('Data Layer Tracking Attributes', () => {
        const cardTestCases = [
            {
                cardTitle: 'Aprendé en la cocina',
                expectedLabel: 'aprende_a_cocinar',
                expectedHref: '/aprende-en-la-cocina/'
            },
            {
                cardTitle: 'Cociná fácil y rápido',
                expectedLabel: 'cocina_facil',
                expectedHref: '/cocina-facil-y-rapido/'
            },
            {
                cardTitle: 'Cociná a tu medida',
                expectedLabel: 'cocina_a_tu_manera',
                expectedHref: '/cocina-a-tu-medida/'
            },
            {
                cardTitle: 'Todas las recetas',
                expectedLabel: 'recetas',
                expectedHref: '/subcategoria-receta/'
            }
        ];

        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('renders all links with correct data layer attributes', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');
            const expectedTrackingLabels = [
                'aprende_a_cocinar',
                'cocina_facil',
                'cocina_a_tu_manera',
                'recetas'
            ];

            links.forEach((link, index) => {
                expect(link).toHaveAttribute(
                    'data-interaction',
                    'dataLayerInteraction'
                );
                expect(link).toHaveAttribute('data-event', 'e_linkclick');
                expect(link).toHaveAttribute('data-category', 'cards_home');
                expect(link).toHaveAttribute(
                    'data-label',
                    expectedTrackingLabels[index]
                );
                expect(link).toHaveAttribute('data-action', 'N/A');
            });
        });

        it('renders correct data-label for each card', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');
            const expectedTrackingLabels = [
                'aprende_a_cocinar',
                'cocina_facil',
                'cocina_a_tu_manera',
                'recetas'
            ];

            expectedTrackingLabels.forEach((expectedLabel, index) => {
                expect(links[index]).toHaveAttribute(
                    'data-label',
                    expectedLabel
                );
            });
        });

        it('has consistent data layer structure across all cards', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');

            links.forEach(link => {
                expect(link).toHaveAttribute(
                    'data-interaction',
                    'dataLayerInteraction'
                );
                expect(link).toHaveAttribute('data-event', 'e_linkclick');
                expect(link).toHaveAttribute('data-category', 'cards_home');
                expect(link).toHaveAttribute('data-action', 'N/A');

                expect(link).toHaveAttribute('data-label');
                expect(link.getAttribute('data-label')).toBeTruthy();
            });
        });

        cardTestCases.forEach(({ cardTitle, expectedLabel, expectedHref }) => {
            it(`renders correct tracking data for "${cardTitle}" card`, () => {
                render(<EjesHome />);

                const link = screen.getByRole('link', {
                    name: new RegExp(cardTitle, 'i')
                });
                expect(link).toHaveAttribute('href', expectedHref);

                expect(link).toHaveAttribute(
                    'data-interaction',
                    'dataLayerInteraction'
                );
                expect(link).toHaveAttribute('data-event', 'e_linkclick');
                expect(link).toHaveAttribute('data-category', 'cards_home');
                expect(link).toHaveAttribute('data-label', expectedLabel);
                expect(link).toHaveAttribute('data-action', 'N/A');
            });
        });
    });

    describe('Component Structure', () => {
        it('renders the correct number of category cards', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');
            expect(links).toHaveLength(4);
        });
    });
});
