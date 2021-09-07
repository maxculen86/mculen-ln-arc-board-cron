import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Comments from '../../../../../components/private/LN/nota/comments';

jest.mock(
    '../../../../../components/private/common/hocs/withNavigation',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../../components/private/common/hooks/useComments',
    () => () => {
        return { setCommentsEnabledAndCount: () => {} };
    }
);

jest.mock('react', () => {
    const ActualReact = require.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({
            state: {
                logueado: true,
                loginData: {
                    goToLoginUrl: () => {}
                }
            }
        })
    };
});

// jest.mock('../../../private/LN/common/utils/contextHelper.test.js', () => {
//     return {
//         getLoginData: jest.fn(),
//         isLoggedIn: jest.fn()
//     };
// });

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

    // jest.spyOn(contextHelper, 'getLoginData').mockReturnValue({
    //     loginData: {
    //         goToLoginUrl: () => {}
    //     }
    // });

    // jest.spyOn(contextHelper, 'isLoggedIn').mockReturnValue(true);

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
