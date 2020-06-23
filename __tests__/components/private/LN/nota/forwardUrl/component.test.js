import React from 'react';
import { mount } from 'enzyme';
import ForwardUrl from '../../../../../../components/private/LN/nota/forwardURL/component';

describe('ForwardUrl', () => {
    it("Doesn't render when the URL prop is malformed", () => {
        const url = 'sarasa';
        const component = mount(<ForwardUrl url={url} />);
        expect(component.html()).toBeNull();
    });

    it('Renders ok when the URL prop is well-formed', () => {
        const url = 'https://www.google.com.ar';
        const component = mount(<ForwardUrl url={url} />);
        expect(component.html()).not.toBe(null);
        expect(component.find('script')).toHaveLength(1);
    });

    it("Doesn't render if the URL prop is not passed", () => {
        const component = mount(<ForwardUrl />);
        expect(component.html()).toBeNull();
    });
});
