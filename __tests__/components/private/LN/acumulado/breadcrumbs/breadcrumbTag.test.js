import React from 'react';
import { render } from 'enzyme';
import BreadcrumbTag from '../../../../../../components/private/LN/acumulado/breadcrumbs/breadcrumbTag';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbTag', () => {
    const tag = {
        slug: 'soy-un-tag',
        text: 'Soy un tag'
    };
    const component = render(
        <BreadcrumbTag tag={tag} host="https://www.lanacion.com.ar" />
    );
    it('Test de snapshot breadcrumbTag', () => {
        expect(component).toMatchSnapshot();
    });
});
