import Consumer from 'fusion:consumer';

//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../components/private/OTT/lastVideosByProgram/containers/lastVideosByProgram',
    () => 'mock-component'
);
import React from 'react';
import { mount } from 'enzyme';
import UltimosVideosDeProgramasFeature from '../../../../components/features/OTT/ultimosVideosDeProgramas';

describe('features - OTT - ultimosVideosDeProgramas', () => {
    const cf = { sectionId: 'terapia-noticias' };

    const component = mount(
        <UltimosVideosDeProgramasFeature customFields={cf} />
    );
    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('customFields')).toEqual(cf);
    });
});
