//retorno un elemento que luego busco en el container
jest.mock(
    '../../../../../../components/private/OTT/currentPrograms/containers/currentProgramItem',
    () => 'mock-component'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../utils/testHelper';
import CurrentProgramItemContainer from '../../../../../../components/private/OTT/currentPrograms/components/currentPrograms';

describe('OTT - layout - currentProgramItem - component1', () => {
    const child = <hijos>soy un child de frame default</hijos>;

    const items = [
        {
            description: 'description 1',
            href: 'href 1',
            imgSrc:
                'https://openningia.gallerycdn.vsassets.io/extensions/openningia/vscode-google-test-adapter/0.3.1/1546439950205/Microsoft.VisualStudio.Services.Icons.Default'
        },
        {
            description: 'description 2',
            href: 'href 2',
            imgSrc:
                'https://openningia.gallerycdn.vsassets.io/extensions/openningia/vscode-google-test-adapter/0.3.1/1546439950205/Microsoft.VisualStudio.Services.Icons.Default'
        }
    ];

    const container = mount(
        <CurrentProgramItemContainer items={items} children={child} />
    );

    const container1 = container.find('mock-component').at(0);
    const container2 = container.find('mock-component').at(1);
    const mockedContainers = container.find('mock-component');

    testHelper.testDoNotRenderChildren(container, 'hijos');

    it('Test 2 items - Testeo que el item 1 reciba las props del item 1', () => {
        testHelper.expectProp(container1, 'description', items[0].description);
        testHelper.expectProp(container1, 'href', items[0].href);
    });
    it('Test 2 items - Testeo que el item 2 reciba las props del item 2', () => {
        testHelper.expectProp(container2, 'description', items[1].description);
        testHelper.expectProp(container2, 'href', items[1].href);
    });
    it('Test 2 items - Testeo que no exista un item 3', () => {
        testHelper.expectSameValue(mockedContainers.length, 2);
    });
});
