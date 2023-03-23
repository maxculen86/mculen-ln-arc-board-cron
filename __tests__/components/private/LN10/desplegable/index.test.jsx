import React from 'react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import { render, screen, fireEvent } from '@testing-library/react';

import Desplegable from '../../../../../components/private/LN10/desplegable/';
import menuData from '../../../../../__mocks__/data/menu/menu.json';

describe('private - common - LN10 - Desplegable', () => {
    useContent.mockImplementation(() => menuData);

    test('should renders without props', () => {
        const { getAllByRole } = render(<Desplegable />);
        const [wrapperDropdown] = getAllByRole('button');

        expect(wrapperDropdown).toBeInTheDocument();
    });

    test('should renders with active class', () => {
        const { getAllByRole } = render(<Desplegable isActive />);
        const [wrapperDropdown] = getAllByRole('button');

        expect(wrapperDropdown.classList).toContain('--dd-active');
    });

    test('should executes callback function correctly', () => {
        const toggleDesplegable = jest.fn();
        const { container } = render(
            <Desplegable isActive toggleDesplegable={toggleDesplegable} />
        );

        const closeButton = container.querySelector('.ln-button-close');
        fireEvent.click(closeButton);

        expect(toggleDesplegable).toHaveBeenCalledTimes(1);
    });
});
