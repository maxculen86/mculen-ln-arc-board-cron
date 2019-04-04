import React from 'react';
import { mount } from 'enzyme';
import LastVideosByProgramContainer from '../../../../../../../components/private/OTT/features/LastVideosByProgram/containers/LastVideosByProgram';

describe('private - common - containers - button', () => {
    const sectionId= 'terapia-noticias';

    const component = mount(
    <LastVideosByProgramContainer sectionId={sectionId} 
    />
    );

    it('Testeo que pase al componente los items recibidos por el container', () => {
        expect(component.prop('customFields')).toEqual(cf);
    });
});
