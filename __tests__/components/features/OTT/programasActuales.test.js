jest.mock(
    '../../../../components/private/OTT/features/currentPrograms/containers/currentPrograms',
    () => 'mocked-component'
);
import React from 'react';
import { mount } from 'enzyme';
import ProgramasActuales from '../../../../components/features/OTT/ProgramasActuales';
import testHelper from '../../../../__tests__/utils/testHelper';

describe('features - OTT - ProgramasActuales', () => {
    const cf = {
        description1: 'description text 1',
        href1: 'href1',
        imgSrc1: 'imgSrc1',
        description2: 'description text 2',
        href2: 'href2',
        imgSrc2: 'imgSrc2',
        description3: 'description text 3',
        href3: 'href3',
        imgSrc3: 'imgSrc3',
        description6: 'description text 6',
        href6: 'href6',
        imgSrc6: 'imgSrc6'
    };

    const component = mount(<ProgramasActuales customFields={cf} />);
    const instance = component.instance();
    console.log(
        'instance.CurrentProgramsCustomFields',
        instance.CurrentProgramsCustomFields
    );
    const container = component.find('mocked-component');

    it('Testeo que pase al container los items recibidos por el container', () => {
        testHelper.expectProp(
            container,
            'items',
            instance.CurrentProgramsCustomFields
        );
    });
});
