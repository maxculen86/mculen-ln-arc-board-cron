import React from 'react';
import { render, mount } from 'enzyme';
import Share from '../../../../../components/private/LN/nota/share';
import nota from '../../../../../__mocks__/data/articles/JZQDUAOPSRF3LLDZOT6374IDOM';
import notaNotAllowComments from '../../../../../__mocks__/data/articles/L47IICAOMVFW5MV343TJIHS4RY';

jest.mock('fusion:context', () => () => ({
    default: props => {
        const mockAvailableProps = {
            outputType: 'default',
            arcSite: 'la-nacion-ar'
        };

        return props.children(mockAvailableProps);
    }
}));

jest.mock('fusion:properties', () => () => ({
    default: props => {
        const mockAvailableProps = { arcSite: 'la-nacion-ar' };

        return props.children(mockAvailableProps);
    }
}));

import Context from 'fusion:context';
import getProperties from 'fusion:properties';

describe('Share', () => {
    Context.useAppContext = jest.fn(() => ({
        outputType: 'default',
        arcSite: 'la-nacion-ar'
    }));
    delete global.window.open;
    global.window = Object.create(window);
    global.window.open = jest.fn();
    global.window.FB = {
        init: jest.fn(),
        ui: jest.fn()
    };

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
        const button = component.find('.icon-facebook-filled');
        button.simulate('click');
        expect(window.FB.ui).toHaveBeenCalled();
    });

    it('Triggers defined twitter button click event function', () => {
        const button = component.find('.icon-twitter-filled');
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });

    it('Triggers defined whatsapp button click function', () => {
        const button = component.find('.icon-whatsapp-filled');
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });

    it('Triggers defined mail button click function', () => {
        const button = component.find('.icon-email');
        button.simulate('click');
        expect(window.open).toHaveBeenCalled();
    });

    describe('Note display comment in false ', () => {
        it('Matches snapshot', () => {
            const shareWithoutCommentIcon = render(
                <Share
                    globalContent={notaNotAllowComments}
                    requestUri="https://arc.lanacion.com.ar"
                />
            );

            expect(shareWithoutCommentIcon).toMatchSnapshot();
        });
    });
});
