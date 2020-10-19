import React from 'react';
import { mount } from 'enzyme';

jest.mock('fusion:context', Component => {
    return function(Component) {
        const owner = {
            sponsored: true
        };
        return props => (
            <Component
                {...{
                    ...props,
                    globalContent: {
                        ...{
                            ...props.globalContent,
                            owner
                        }
                    }
                }}
            />
        );
    };
});

import Context from 'fusion:context';

import Trust from '../../../../../components/features/LN-nota/trust';

describe('Trust', () => {
    it('Does not show when sponsored content is present', () => {
        const component = mount(<Trust />);
        expect(component.html()).toBeFalsy();
    });
});
