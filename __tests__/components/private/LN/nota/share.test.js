import React from 'react';
import { render, mount } from 'enzyme';
import Share from '../../../../../components/private/LN/nota/share';
import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';

describe('Share', () => {

    delete global.window.open;
    global.window = Object.create(window);
    global.window.open = jest.fn();
    global.window.FB = {
        init: jest.fn(),
        ui: jest.fn()
    }

    let component;

    beforeEach(() => {
        component = mount(
            <Share 
                globalContent={nota} 
                requestUri="https://arc.lanacion.com.ar" 
            />
        ); 
    });

    afterEach(() => {
        component = null;
    });

    it('Matches snapshot', () => {
        const share = render(
            <Share 
                globalContent={nota} 
                requestUri="https://arc.lanacion.com.ar" 
            />
        );

        expect(share).toMatchSnapshot();
    });

    it('Triggers defined facebook button click event function', () => {
        const button = component.find(".icon-facebook");
        button.simulate('click');
        expect(window.FB.ui).toHaveBeenCalled();
    });

    it('Triggers defined twitter button click event function', () => {
        const button = component.find(".icon-twitter");
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });

    it('Triggers defined whatsapp button click function', () => {
        const button = component.find(".icon-whatsapp");
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });

    it('Triggers defined mail button click function', () => {
        const button = component.find(".icon-mail");
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });
});