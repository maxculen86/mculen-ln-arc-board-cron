import React from 'react';
import { Search } from '../../../../../components/features/LN-10-global/desplegable/search';
import { render, fireEvent } from '@testing-library/react';
import addEventToDataLayer from '../../../../../components/private/LN/common/utils/addEventToDataLayer';
import '@testing-library/jest-dom/extend-expect';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

describe('components - features - LN-10-global - desplegable - search', () => {
    it('should render the search component with the "label" tag and the htmlFor attribute for the queryly functionality', () => {
        const { container } = render(<Search />);
        const search = container.querySelector('label');
        expect(search).toBeInTheDocument();
        expect(search).toHaveAttribute('for', 'queryly_toggle');
    });
    it('should call the addEventToDataLayer function when the search component is clicked', () => {
        const { container } = render(<Search />);
        const search = container.querySelector('label');
        fireEvent.click(search);
        expect(addEventToDataLayer).toHaveBeenCalledWith({
            category: 'home_ln10',
            label: 'buscar',
            action: 'menu_secciones',
            event: 'e_linkclick'
        });
    });
    it('should match snapshot', () => {
        const { container } = render(<Search />);
        expect(container).toMatchSnapshot();
    });
});
