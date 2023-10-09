import React from 'react';
import RoofFoodit from '../../../../../../components/features/foodit-global/common/RoofFoodit/foodit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('Tests RoofFoodit', () => {
    test('Render component', () => {
        const { container } = render(
            <RoofFoodit
                title={{ text: 'Título de prueba', as: 'h3' }}
                displayArrow={true}
                linkProps={{
                    text: 'Texto del enlace',
                    href: 'https://lanacion.com.ar',
                    bold: true,
                    uppercase: true
                }}
                icon={<svg>icono-de-prueba</svg>}
                hide={false}
            />
        );

        const titleElement = screen.getByText('Título de prueba');
        expect(titleElement).toBeInTheDocument();

        const iconElement = screen.getByText('icono-de-prueba');
        expect(iconElement).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
