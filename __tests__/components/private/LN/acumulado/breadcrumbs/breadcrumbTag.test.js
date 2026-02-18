import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbTag from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbTag';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbTag', () => {
    const tag = {
        slug: 'soy-un-tag',
        name: 'Soy un tag'
    };

    const { container } = render(
        <BreadcrumbTag tag={tag} host="https://www.lanacion.com.ar" />
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
        expect(links[1]).toHaveAttribute('href', '/tema/soy-un-tag/');
        expect(container).toMatchSnapshot();
    });
});
