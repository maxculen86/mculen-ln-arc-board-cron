import React from 'react';
import { render } from 'enzyme';
import BreadcrumbAutor from '../../../../../../components/private/LN/acumulado/breadcrumbs/breadcrumbAutor';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbAutor', () => {
    const author = {
        byline: 'Emilse Pizarro',
        _id: 'emilse-pizarro'
    };
    const component = render(
        <BreadcrumbAutor author={author} host="https://www.lanacion.com.ar" />
    );
    it('Test de snapshot breadcrumbAutor', () => {
        expect(component).toMatchSnapshot();
    });
});
