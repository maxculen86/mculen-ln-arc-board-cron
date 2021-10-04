import React from 'react';
import { shallow, mount } from 'enzyme';
import Comscore from '../../../../../components/private/common/scriptManager/comscore';

describe('Comscore', () => {
    const config = { c1: '2', c2: '12312312' };

    it('Should return script and noscript tags', () => {
        const wrapper = shallow(<Comscore config={config} location="head" />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Should return empty string when props is empty', () => {
        const wrapper = mount(<Comscore />);
        expect(wrapper.html()).toEqual('');
    });
});
