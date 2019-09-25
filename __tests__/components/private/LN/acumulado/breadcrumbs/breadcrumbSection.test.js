import Consumer from 'fusion:consumer';
import React from 'react';

jest.mock(
    '../../../../../../components/private/LN/common/breadcrumbBase',
    () => 'breadcrumb-base-mock'
);

jest.mock(
    '../../../../../../components/private/LN/common/breadcrumbSchema',
    () => 'breadcrumb-schema-mock'
);

import { mount } from 'enzyme';
import BreadcrumbSection from '../../../../../../components/private/LN/acumulado/breadcrumbs/breadcrumbSection';

describe('components - private - LN - acumulado - breadcrumbs - breadcrumbSection', () => {
    const globalContent = {
        _website: 'la-nacion-ar'
    };
    const component = mount(
        <BreadcrumbSection
            globalContent={globalContent}
            sectionId="/recetas"
            host="https://www.lanacion.com.ar"
        />
    );
    it('Testeo que contenga base y schema', () => {
        const schema = component.find('breadcrumb-schema-mock');
        const base = component.find('breadcrumb-base-mock');
        expect(schema.is('breadcrumb-schema-mock')).toBe(true);
        expect(base.is('breadcrumb-base-mock')).toBe(true);
    });
});
