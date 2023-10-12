import React from 'react';
import CajaManual from '../../../../components/chains/foodit_Caja_Manual/foodit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardFoodit from '../../../../components/features/foodit/Card/foodit.jsx';
import mockChildProps from '../../../../__mocks__/data/foodit_Caja_Manual/childProps';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock(
    '../../../../components/features/foodit/Card/foodit.jsx',
    () => 'mocked-CardFoodit'
);

describe('Tests Chain - Foodit CajaManual', () => {
    const cardCustomFields = { noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU' };
    const mockedCardFoodit = (
        <CardFoodit id="f0fBMRRrir7F4UW" customFields={cardCustomFields} />
    );

    const customFields = {
        layout: '',
        hideCaja: false,
        website: 'foodit',
        title: 'TITLE',
        link: '',
        hideTitle: false
    };

    const getProps = ({
        customFields,
        childProps = mockChildProps,
        children = [mockedCardFoodit]
    }) => ({
        id: 'c0faDu3rJPJ41dG',
        isAdmin: true,
        customFields,
        childProps,
        children
    });

    describe('Tests for the case warnning', () => {
        test('should return a warning when there is no layout defined', () => {
            render(<CajaManual {...getProps({ customFields })} />);

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere que seleccione una diagramación')
            ).toBeVisible();
        });

        test('Should return a warning specifying a minimum item load', () => {
            const fields = {
                ...customFields,
                layout: 'bn_2_grid'
            };

            render(
                <CajaManual
                    {...getProps({ customFields: fields, childProps: [] })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText('Se requiere la carga de 2 artículos')
            ).toBeVisible();
        });

        test('should return a warning when adding a feature other than Card Foodit', () => {
            const fields = {
                ...customFields,
                layout: 'bn_2_grid'
            };
            render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        childProps: [
                            ...mockChildProps,
                            { type: 'foodit/Banner' }
                        ]
                    })}
                />
            );

            expect(
                screen.getByRole('heading', { name: 'Advertencia' })
            ).toBeDefined();

            expect(
                screen.getByText(
                    'La Chain Foodit Caja Manual sólo admite features del tipo Foodit Card'
                )
            ).toBeVisible();
        });
    });

    describe('Tests bn_2_grid', () => {
        test('should return a grid of 2 items', () => {
            const fields = {
                ...customFields,
                layout: 'bn_2_grid'
            };
            const children = [
                mockedCardFoodit,
                mockedCardFoodit,
                mockedCardFoodit
            ];

            const { container } = render(
                <CajaManual
                    {...getProps({
                        customFields: fields,
                        children
                    })}
                />
            );

            expect(
                container.getElementsByTagName('mocked-CardFoodit')
            ).toHaveLength(2);
        });
    });
});
