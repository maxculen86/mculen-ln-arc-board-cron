import React from 'react';
import { render, screen } from '@testing-library/react';
import { NutritionalInfoCard } from '../../../../../../components/features/foodit-global/common/nutritionalInfo/component/cardInfo';

describe('NutritionalInfoCard', () => {
    it('renders correctly the required props', () => {
        render(<NutritionalInfoCard title="Proteínas" cant="15" udm="g" />);

        expect(screen.getByText('Proteínas')).toBeInTheDocument();
        expect(screen.getByText(/15/)).toBeInTheDocument();
        expect(screen.getByText('g')).toBeInTheDocument();
    });
    it('does not throw error and maintains structure with empty values', () => {
        const { container } = render(
            <NutritionalInfoCard title="" cant="" udm="" />
        );
        const article = container.querySelector('article');
        expect(article).toBeInTheDocument();

        expect(container.querySelector('.roboto-bold')).not.toBeNull();
        expect(container.querySelector('.text-light-700')).not.toBeNull();
    });
    it('should match snapshot', () => {
        const { container } = render(
            <NutritionalInfoCard title="Proteínas" cant="15" udm="g" />
        );
        expect(container).toMatchSnapshot();
    });
});
