import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterRecetas from '../../../../../../components/features/recetas-global/common/Footer/recetas';

describe('Components - Features - Recetas-global - Common - FooterRecetas', () => {
    beforeEach(() => {
        render(<FooterRecetas />);
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
        const { container } = render(<FooterRecetas />);
        expect(container).toMatchSnapshot();
    });
});
