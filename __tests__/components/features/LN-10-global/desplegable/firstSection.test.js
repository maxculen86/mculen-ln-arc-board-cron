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
    it('should render the search component with the "label" tag and the htmlFor attribute for the queryly functionality', () => {
        const { container } = render(<FirstSection />);
        const search = container.querySelector('label');
        expect(search).toBeInTheDocument();
        expect(search).toHaveAttribute('for', 'queryly_toggle');
    });

    it('should call the addEventToDataLayerV2 function when the search component is clicked', () => {
        const { container } = render(<FirstSection />);
        const search = container.querySelector('label');
        fireEvent.click(search);
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
