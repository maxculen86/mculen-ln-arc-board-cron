jest.mock(
    '../../../../components/private/common/mod-headerSection',
    () => 'mock-header-section'
);

jest.mock(
    '../../../../components/private/common/com-shield',
    () => 'mock-com-shield'
);

import React from 'react';
import ModShield from '../../../../components/private/common/mod-shield';
import SHIELD_DATA from '../../../../__mocks__/data/shields/shields';
import { shallow } from 'enzyme';

describe('Private - Common - ModShield =>', () => {
    describe('with empty data list or title', () => {
        const wrapper1 = shallow(<ModShield />);
        const wrapper2 = shallow(<ModShield data={[]} />);
        const wrapper3 = shallow(<ModShield data={''} />);
        const wrapper4 = shallow(<ModShield title={''} />);
        const wrapper5 = shallow(
            <ModShield title={''} data={SHIELD_DATA.data} />
        );
        const wrapper6 = shallow(
            <ModShield title={SHIELD_DATA.title} data={[]} />
        );

        it('should returns null', () => {
            expect(
                wrapper1.html() &&
                    wrapper2.html() &&
                    wrapper3.html() &&
                    wrapper4.html() &&
                    wrapper5.html() &&
                    wrapper6.html()
            ).toBeNull();
        });
    });

    describe('with data list', () => {
        const wrapper = shallow(<ModShield {...SHIELD_DATA} />);
        const result = wrapper.first();
        const shieldComponent = result.find('mock-com-shield');

        it('should render 3 ComShield components', () => {
            expect(shieldComponent.length).toBe(27);
        });

        it('snapshot', () => {
            expect(result.render()).toMatchSnapshot();
        });
    });
});
