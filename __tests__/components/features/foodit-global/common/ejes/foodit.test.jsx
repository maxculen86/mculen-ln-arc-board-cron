import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EjesHome } from '../../../../../../components/features/foodit-global/common/ejesHome/foodit';
import { trackHomeCard } from '../../../../../../components/layouts/Foodit-subcategorias/_helpers';

jest.mock(
    '../../../../../../components/layouts/Foodit-subcategorias/_helpers',
    () => ({
        trackHomeCard: jest.fn()
    })
);

jest.mock(
    '../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

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

    describe('Tracking Events', () => {
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

        it('calls trackHomeCard with correct trackingLabel when clicking each card', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');

            const expectedTrackingLabels = [
                'aprende_a_cocinar',
                'cocina_facil',
                'cocina_a_tu_manera',
                'recetas'
            ];

            for (let i = 0; i < links.length; i++) {
                fireEvent.click(links[i]);

                expect(trackHomeCard).toHaveBeenCalledWith({
                    trackingLabel: expectedTrackingLabels[i]
                });
            }

            expect(trackHomeCard).toHaveBeenCalledTimes(4);
        });

        it('calls trackHomeCard exactly once per card click', () => {
            render(<EjesHome />);

            const firstLink = screen.getAllByRole('link')[0];

            fireEvent.click(firstLink);
            fireEvent.click(firstLink);

            expect(trackHomeCard).toHaveBeenCalledTimes(2);
            expect(trackHomeCard).toHaveBeenCalledWith({
                trackingLabel: 'aprende_a_cocinar'
            });
        });

        it('sends correct tracking data to datalayer when clicking cards', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');

            fireEvent.click(links[0]);

            expect(trackHomeCard).toHaveBeenCalledWith({
                trackingLabel: 'aprende_a_cocinar'
            });

            fireEvent.click(links[1]);

            expect(trackHomeCard).toHaveBeenCalledWith({
                trackingLabel: 'cocina_facil'
            });
        });

        it('tracks all cards with correct structure', () => {
            render(<EjesHome />);

            const links = screen.getAllByRole('link');
            const expectedTrackingLabels = [
                'aprende_a_cocinar',
                'cocina_facil',
                'cocina_a_tu_manera',
                'recetas'
            ];

            for (let i = 0; i < links.length; i++) {
                fireEvent.click(links[i]);
                expect(trackHomeCard).toHaveBeenCalledWith({
                    trackingLabel: expectedTrackingLabels[i]
                });
            }

            expect(trackHomeCard).toHaveBeenCalledTimes(4);
        });

        it('does not call tracking on component mount', () => {
            render(<EjesHome />);

            expect(trackHomeCard).not.toHaveBeenCalled();
        });

        cardTestCases.forEach(({ cardTitle, expectedLabel, expectedHref }) => {
            it(`tracks correctly when clicking "${cardTitle}" card`, () => {
                render(<EjesHome />);

                const link = screen.getByRole('link', {
                    name: new RegExp(cardTitle, 'i')
                });

                fireEvent.click(link);

                expect(trackHomeCard).toHaveBeenCalledWith({
                    trackingLabel: expectedLabel
                });

                expect(link).toHaveAttribute('href', expectedHref);
            });
        });
    });
});
