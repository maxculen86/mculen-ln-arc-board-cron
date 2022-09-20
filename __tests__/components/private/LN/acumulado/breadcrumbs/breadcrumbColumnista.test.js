import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbColumnista from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbColumista';

describe('components - private - LN - acumulado - breadcrumbs - BreadcrumbColumnista', () => {
    test('Should render columnista breadcrumb correctly', () => {
        const { container } = render(
            <BreadcrumbColumnista host="https://www.lanacion.com.ar" />
        );
        const columnista = container.getElementsByClassName('com-text');

        expect(container.getElementsByClassName('--bullet')).toHaveLength(2);
        expect(screen.queryAllByRole('link')).toHaveLength(1);
        expect(columnista).toHaveLength(1);
        expect(columnista[0].innerHTML).toMatch(/Columnistas/gi);
        expect(container).toMatchSnapshot();
    });
});
