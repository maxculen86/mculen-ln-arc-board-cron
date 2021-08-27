import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Comments from '../../../../../components/private/LN/nota/comments';
import loginHelper from '../../../../../components/private/LN/common/utils/loginHelper';

jest.mock(
    '../../../../../components/private/common/hocs/withNavigation',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock('../../../private/LN/common/utils/loginHelper.test.js', () => {
    return {
        getLoginData: jest.fn(),
        isLoggedIn: jest.fn()
    };
});

global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
};

global.Livefyre = {
    require: () => {}
};

describe('Comments', () => {
    const props = {
        globalContent: {
            _id: `RDCAIGB3WNHJVHSBLDT367MU3Q`,
            canonical_url: `/turismo/ocio-y-negocios-nid30032020/`,
            headlines: { basic: 'Testing comments' },
            subtype: 1
        },
        deployment: () => {},
        termicas: {
            livefyre: true,
            comentarios: true
        }
    };

    jest.spyOn(loginHelper, 'getLoginData').mockReturnValue({
        loginData: {
            goToLoginUrl: () => {}
        }
    });

    jest.spyOn(loginHelper, 'isLoggedIn').mockReturnValue(true);

    it('Matches snapshot', () => {
        const comments = mount(<Comments {...props} />);
        expect(toJson(comments)).toMatchSnapshot();
    });

    it('Receives props accordingly', () => {
        const component = mount(<Comments {...props} />);
        Object.keys(props).forEach(prop => {
            expect(component.prop(prop)).toBeDefined();
        });
    });
});
