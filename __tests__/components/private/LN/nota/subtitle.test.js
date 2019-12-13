import React from 'react';
import { render } from 'enzyme';
import Subtitle from '../../../../../components/private/LN/nota/cuerpo/subtitle';

describe('Subtitle', () => {
    const props = {
        data: [
            {
                level: 2,
                content:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        ]
    };

    it('renders without crashing', () => {
        render(<Subtitle {...props} />);
    });

    it('matches snapshot', () => {
        const component = render(<Subtitle {...props} />);
        expect(component).toMatchSnapshot();
    });
});
