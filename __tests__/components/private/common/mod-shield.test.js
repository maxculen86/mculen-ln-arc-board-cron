jest.mock(
    '../../../../components/private/common/com-title',
    () => 'mock-com-title'
);

jest.mock(
    '../../../../components/private/common/com-link',
    () => 'mock-com-link'
);

jest.mock(
    '../../../../components/private/common/com-image',
    () => 'mock-com-image'
);

import React from 'react';
import ModShield from '../../../../components/private/common/mod-shield';
import SHIELD_DATA from '../../../../__mocks__/data/shields/shields';

import { shallow, mount, render } from 'enzyme';

describe('Private - Common - ModDolar =>', () => {
    describe('with empty data list ', () => {
        const wrapper1 = shallow(<ModShield />);
        const wrapper2 = shallow(<ModShield data={[]} />);

        expect(wrapper1.html() && wrapper2.html()).toBeNull();
    });
});
