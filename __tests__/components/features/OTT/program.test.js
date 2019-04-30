jest.mock(
    '../../../../components/private/OTT/common/program/container',
    () => 'mock-component'
);
import React from 'react';
import { mount } from 'enzyme';
import Program from '../../../../components/features/OTT/program';
import testHelper from '../../../utils/testHelper';

describe('features - OTT - program', () => {
    const cf = {
        description: 'description text 1',
        href: 'href1',
        imgSrc: 'imgSrc1'
    };
    const component = mount(<Program customFields={cf} />);
    const programContainer = component.find('mock-component');
    it('Testeo que dibuje el program container', () => {
        testHelper.expectSameValue(programContainer != null, true);
        testHelper.expectSameValue(programContainer.length, 1);
    });
    it('Testeo que pase los custom fields al program container', () => {
        testHelper.expectProp(programContainer, 'description', cf.description);
        testHelper.expectProp(programContainer, 'href', cf.href);
        testHelper.expectProp(programContainer, 'imgSrc', cf.imgSrc);
    });
});
