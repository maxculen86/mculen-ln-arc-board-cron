import 'regenerator-runtime/runtime';
import React from 'react';
import { shallow } from 'enzyme';
import withNewsLetterData from '../../../../../../components/private/LN/common/hocs/withNewsLetterData';

jest.useFakeTimers();

describe('withNewsLetterData', () => {
    it('Passes along correct props', () => {
        const Newsletter = jest.fn();
        const Component = withNewsLetterData(Newsletter);

        const wrapper = shallow(shallow(<Component condition={true} />).get(0));

        expect(wrapper.props().loginData).toBeDefined();
        expect(wrapper.props().logueado).toBeDefined();
        expect(wrapper.props().logueado).toBe(false);
        expect(wrapper.props().goToLogout).toBeDefined();
        //expect(wrapper.props().service).toBeDefined();
        //expect(wrapper.props().subscriptionsCallBack).toBeDefined();
        expect(wrapper.props().condition).toBe(true);
    });

    // TODO: fix this test, whining cuz fetch is not defined in node env
    // possible fix is to install node-fetch as a dev dependency
    /* it('Subscriptions getter function is called', async () => {
        const Newsletter = jest.fn();
        const Component = withNewsLetterData(Newsletter);

        const wrapper = shallow(shallow(<Component />).get(0));

        const instance = wrapper.instance();
        await instance.componentDidMount();

        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.state().service).toBeDefined();
        expect(wrapper.state().service).toEqual([]);
    }); */
});
