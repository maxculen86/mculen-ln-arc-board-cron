import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbAutor from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbAutor';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbAutor', () => {
    const author = {
        byline: 'Emilse Pizarro',
        _id: 'emilse-pizarro'
    };

    const { container } = render(
        <BreadcrumbAutor author={author} host="https://www.lanacion.com.ar" />
    );

    const links = container.getElementsByClassName('com-link');

    it('Should render tag breadcrumb correctly with two bullets', () => {
        expect(links[0]).toBeDefined();
        expect(links[0].innerHTML).toMatch(/LA NACION/gi);
        expect(links[0]).toHaveAttribute(
            'href',
            'https://www.lanacion.com.ar/'
        );
        expect(links[1]).toBeDefined();
        expect(container.getElementsByClassName('--bullet')).toHaveLength(2);
        expect(links[1]).toHaveAttribute('href', '/autor/emilse-pizarro/');
        expect(container).toMatchSnapshot();
    });
});
