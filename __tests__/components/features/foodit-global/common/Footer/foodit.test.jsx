import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterFoodit from '../../../../../../components/features/foodit-global/common/Footer/foodit';

describe('Components - Features - foodit-global - Common - FooterFoodit', () => {
    beforeEach(() => {
        render(<FooterFoodit />);
    });
    it('should contain five links', () => {
        const { length } = screen.getAllByRole('link');
        expect(length).toEqual(5);
    });
    it('should contain four icons', () => {
        const { length } = document.querySelectorAll('.icon');
        expect(length).toEqual(4);
    });
    it('should match snapshot', () => {
        const { container } = render(<FooterFoodit />);
        expect(container).toMatchSnapshot();
    });
});
