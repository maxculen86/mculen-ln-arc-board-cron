//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../components/private/OTT/features/LastVideosByProgram/containers/LastVideosByProgram',
    () => 'mock-component'
);

import React from 'react';
import { mount } from 'enzyme';
import UltimosVideosDeProgramasFeature from '../../../../components/features/OTT/UltimosVideosDeProgramas';

describe('features - OTT - ultimosVideosDeProgramas', () => {
    const cf = { sectionId: 'terapia-noticias' };

    const component = mount(
        <UltimosVideosDeProgramasFeature customFields={cf} />
    );
    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('customFields')).toEqual(cf);
    });
});
