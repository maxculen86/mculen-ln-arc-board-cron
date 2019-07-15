import Context from 'fusion:context';

jest.mock(
    '../../../../../../components/private/OTT/common/program',
    () => 'mock-program'
);

jest.mock(
    '../../../../../../components/private/common/carousell',
    () => 'mock-carousell'
);
jest.mock(
    '../../../../../../components/private/common/title',
    () => 'mock-title'
);

//Otros imports
import React from 'react';
import { mount } from 'enzyme';
import testHelper from '../../../../../utils/testHelper';
import ActiveProgramsComponent from '../../../../../../components/private/OTT/common/activePrograms/component';

describe('OTT - layout - activePrograms - components', () => {
    let items = [
        {
            description: 'description 1',
            imgId: 'ABCDEF1',
            href: 'href 1'
        },
        {
            description: 'description 2',
            imgId: 'GHIJKL2',
            href: 'href 2'
        }
    ];
    const container = mount(<ActiveProgramsComponent items={items} />);
    const container1 = container.find('mock-program').at(0);
    const container2 = container.find('mock-program').at(1);
    const mockedContainers = container.find('mock-program');

    it('Test 2 items - Testeo que el item 1 reciba las props del item 1', () => {
        testHelper.expectProp(container1, 'description', items[0].description);
        testHelper.expectProp(container1, 'imageId', items[0].imgId);
        testHelper.expectProp(container1, 'href', items[0].href);
    });
    it('Test 2 items - Testeo que el item 2 reciba las props del item 2', () => {
        testHelper.expectProp(container2, 'description', items[1].description);
        testHelper.expectProp(container2, 'imageId', items[1].imgId);
        testHelper.expectProp(container2, 'href', items[1].href);
    });
    it('Test 2 items - Testeo que no exista un item 3', () => {
        testHelper.expectSameValue(mockedContainers.length, 2);
    });

    it('Snapshot Test', () => {
        expect(container).toMatchSnapshot();
    });
});
