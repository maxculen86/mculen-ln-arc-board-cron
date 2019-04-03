//retorno un elemento que luego busco en el container
jest.mock('../../../../components/private/OTT/features/LastVideosByProgram/containers/LastVideosByProgram',
    () => 'mock-component');

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../../utils/testHelper'
import UltimosVideosDeProgramasFeature from '../../../../components/features/OTT/UltimosVideosDeProgramas';

describe('OTT - layout - currentPrograms - containers', () => {

    const customFields = {
        sectionId: 'terapia-noticias'
    }

    const container = mount(
        <UltimosVideosDeProgramasFeature
            customFields={customFields}
        />
    )

})
