import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PowerupsReceta from '../../../../../../components/features/foodit-global/Body/PowerupsReceta/foodit';

describe('FoodIt', () => {
    it('should match snapshot', () => {
        const { container } = render(<PowerupsReceta />);
        expect(container).toMatchSnapshot();
    });
});
