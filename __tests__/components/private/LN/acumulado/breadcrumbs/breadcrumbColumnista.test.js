import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbColumnista from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbColumista';

describe('components - private - LN - acumulado - breadcrumbs - BreadcrumbColumnista', () => {
    const { container } = render(
        <BreadcrumbColumnista host="https://www.lanacion.com.ar" />
    );
    const link = screen.queryByRole('link');
    const columnista = container.getElementsByClassName('com-text');

    test('Should render columnista breadcrumb correctly with two bullets and "Columnistas"', () => {
        expect(container.getElementsByClassName('--bullet')).toHaveLength(2);
        expect(columnista).toHaveLength(1);
        expect(columnista[0].innerHTML).toMatch(/Columnistas/gi);
        expect(container).toMatchSnapshot();
    });
    test('Should have LA NACION link on breadcrumb', () => {
        expect(link).toBeDefined();
        expect(link.innerHTML).toMatch(/LA NACION/gi);
        expect(link).toHaveAttribute('href', 'https://www.lanacion.com.ar/');
    });
});
