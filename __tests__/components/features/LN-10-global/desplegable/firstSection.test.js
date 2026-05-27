import React from 'react';
import FirstSection from '../../../../../components/features/LN-10-global/desplegable/firstSection';
import { render, fireEvent } from '@testing-library/react';
import { addEventToDataLayerV2 } from '../../../../../components/private/LN/common/utils/addEventToDataLayer';
import '@testing-library/jest-dom';

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

describe('components - features - LN-10-global - desplegable - search', () => {
    it('should render the search input component', () => {
        const { getByRole } = render(<FirstSection />);
        const searchInput = getByRole('searchbox');
        expect(searchInput).toBeInTheDocument();
    });

    it('should call the addEventToDataLayerV2 function when the search button is clicked with a query', () => {
        const { getByRole } = render(<FirstSection />);
        const searchInput = getByRole('searchbox');
        fireEvent.change(searchInput, { target: { value: 'dolar' } });
        const searchBtn = getByRole('button', { name: /ir al buscador/i });
        fireEvent.click(searchBtn);
        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            action: 'menu_secciones',
            category: 'home_ln10',
            label: 'buscar'
        });
    });

    it('should render item LN 104.9 + Música', () => {
        const { getByText } = render(<FirstSection />);
        expect(getByText('LN 104.9 + Música')).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<FirstSection />);
        expect(container).toMatchSnapshot();
    });
});
