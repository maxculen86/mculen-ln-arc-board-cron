import React from 'react';
import { render } from 'enzyme';
import Tips from '../../../../../components/private/LN/nota/cuerpo/tips';

describe('Tips', () => {
    const props = {
        size: 'm',
        title: 'Tips',
        paragraph: [
            {
                title: 'Optional',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        ]
    };

    it('renders without crashing', () => {
        render(<Tips {...props} />);
    });

    it('matches snapshot', () => {
        const component = render(<Tips {...props} />);
        expect(component).toMatchSnapshot();
    });
});
