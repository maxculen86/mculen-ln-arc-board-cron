import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckBoxHeader from '../../../../../components/features/foodit-global/Queryly/_children/checkboxHeader';

describe('CheckBoxHeader Component', () => {
    const mockHandleCheckBox = jest.fn();
    const mockCheckboxes = [
        {
            key: '1',
            value: 10,
            checked: true,
            facetedKey: 'facet-1',
            group: 'group-1'
        },
        {
            key: '7',
            value: 10,
            checked: false,
            facetedKey: 'facet-2',
            group: 'group-2'
        },
        {
            key: '4',
            value: 5,
            checked: true,
            facetedKey: 'facet-3',
            group: 'group-3'
        }
    ];

    const setup = (checkboxes = mockCheckboxes) => {
        render(
            <CheckBoxHeader
                checkboxes={checkboxes}
                handleCheckBox={mockHandleCheckBox}
            />
        );
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render an ordered list', () => {
        setup();
        const list = screen.getByRole('list');
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass('flex flex-column gap-8');
    });

    it('If the key is 1 it should not render', () => {
        setup();
        const excludedItem = screen.queryByLabelText('1 (10)');
        expect(excludedItem).not.toBeInTheDocument();
    });

    it('If the key is 7 it should render "Recetas"', () => {
        setup();
        const includedItem = screen.getByLabelText('Recetas (10)');
        expect(includedItem).toBeInTheDocument();
    });

    it('If the key is 4 it should render "Notas"', () => {
        setup();
        const includedItem = screen.getByLabelText('Notas (5)');
        expect(includedItem).toBeInTheDocument();
    });

    it('should call handleCheckBox with the correct arguments when a checkbox is clicked', () => {
        setup();

        const checkbox = screen.getByLabelText('Notas (5)');
        fireEvent.click(checkbox);

        expect(mockHandleCheckBox).toHaveBeenCalledTimes(1);
        expect(mockHandleCheckBox).toHaveBeenCalledWith(
            expect.any(Object),
            'facet-3'
        );
    });

    it('should correctly set the "checked" state of checkboxes', () => {
        setup();

        const checkedCheckbox = screen.getByLabelText('Recetas (10)');
        expect(checkedCheckbox).not.toBeChecked();
    });

    it('should render labels with the correct "for" attribute', () => {
        setup();
        const label = screen.getByText('Notas (5)');
        expect(label).toHaveAttribute('for', '4-facet-3');
    });

    it('should handle an empty checkboxes array', () => {
        setup([]);

        const listItems = screen.queryAllByRole('listitem');
        expect(listItems).toHaveLength(0);
    });
});
