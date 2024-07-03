import React from 'react';
import { render } from '@testing-library/react';
import Subtitle from '../../../../../components/private/LN/nota/cuerpo/subtitle';

describe('components - private - LN - nota', () => {
    const props = {
        data: {
            level: 2,
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    };

    it('renders without crashing', () => {
        const { container } = render(<Subtitle {...props} />);
        expect(container).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(<Subtitle {...props} />);
        expect(container).toMatchSnapshot();
    });
});
