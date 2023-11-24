import Consumer from 'fusion:consumer';

//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../components/private/OTT/programa/lastVideosByProgram',
    () => 'mock-component'
);
import React from 'react';
import { mount } from 'enzyme';
import UltimosVideosDeProgramasFeature from '../../../../components/features/OTT/ultimosVideosDeProgramas';
import testHelper from '../../../utils/testHelper';

describe('features - OTT - ultimosVideosDeProgramas - Error', () => {
    it('Testeo que de error si no recibe el globalContent', () => {
        expect(() =>
            mount(
                <UltimosVideosDeProgramasFeature
                    globalContentConfig={{ source: 'sectionSource' }}
                />
            )
        ).toThrowError();
    });
});

describe('features - OTT - ultimosVideosDeProgramas', () => {
    const sectionId = '/terapia-de-noticias';

    const component = mount(
        <UltimosVideosDeProgramasFeature
            globalContent={{
                taxonomy: {
                    sections: [{ name: sectionId }]
                }
            }}
            globalContentConfig={{ source: 'videoSource' }}
        />
    );

    const mock = component.find('mock-component');

    //TESTEAR QUE PASA EL ID
    it('Testeo que pase al componente el section id obtenido del name', () => {
        expect(mock.prop('sectionId')).toEqual(sectionId);
    });
});
