import Consumer from 'fusion:consumer';
import React from 'react';
import { render, mount } from 'enzyme';

jest.mock(
    '../../../../../components/private/common/hocs/withNavigation',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

jest.mock(
    '../../../../../components/private/LN/common/hocs/withLoginData',
    () => Comp => props => (Comp ? <Comp {...props} /> : null)
);

import Comments from '../../../../../components/private/LN/nota/comments';

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
        logueado: true,
        loginData: {
            goToLoginUrl: () => {}
        },
        deployment: () => {},
        termicas: {
            livefyre: true
        }
    };

    it('Matches snapshot', () => {
        const comments = render(<Comments {...props} />);
        expect(comments).toMatchSnapshot();
    });

    it('Receives props accordingly', () => {
        const component = mount(<Comments {...props} />);
        Object.keys(props).forEach(prop => {
            expect(component.prop(prop)).toBeDefined();
        });
    });
});
