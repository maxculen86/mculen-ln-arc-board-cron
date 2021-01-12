import React from 'react';
import { render } from 'enzyme';
import BreadcrumbDistributor from '../../../../../../components/private/LN/acumulado/breadcrumb/breadcrumbDistributor';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbDistributor', () => {
    const component = render(
        <BreadcrumbDistributor
            name="The New York Times"
            canonicalUrl="/distributor/the-new-york-times"
            host="https://www.lanacion.com.ar"
        />
    );
    it('Test de snapshot breadcrumbAutor', () => {
        expect(component).toMatchSnapshot();
    });
});
