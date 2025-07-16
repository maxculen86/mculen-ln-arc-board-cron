import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbCustomFoodit from '../../../../../../../components/features/foodit-global/common/breadcrumb/_childrens/BreadcrumbCustom/foodit';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('BreadcrumbCustomFoodit', () => {
    const site = 'https://foodit.lanacion.com.ar';

    it('renders BreadcrumbCustomFoodit component with 4 sections (foodit, receta, salada, pollo)', () => {
        render(
            <BreadcrumbCustomFoodit
                sectionsCustom={[
                    { name: 'Recetas', url: `${site}/recetas/` },
                    { name: 'Saladas', url: `${site}/saladas/` },
                    { name: 'Pollo', url: `${site}/pollo/` }
                ]}
            />
        );

        expect(
            screen.getByRole('link', { name: 'Foodit' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Recetas' })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: 'Saladas' })
        ).toBeInTheDocument();

        const lastElement = screen.getByText('Pollo');
        expect(lastElement).toBeInTheDocument();
        expect(lastElement.tagName).toBe('SPAN');
        expect(lastElement).not.toHaveAttribute('href');
    });

    it('If there are no sections, it should show the Foodit anchor', () => {
        render(<BreadcrumbCustomFoodit sectionsCustom={[]} />);
        expect(
            screen.getByRole('link', {
                name: 'Foodit'
            })
        ).toBeInTheDocument();
    });

    it('The last link should have the class --disabled', () => {
        const { container } = render(
            <BreadcrumbCustomFoodit
                sectionsCustom={[
                    { name: 'Recetas', url: `${site}/recetas/` },
                    { name: 'dietas', url: `${site}/dietas/` }
                ]}
            />
        );

        expect(screen.getByText('Dietas')).toBeInTheDocument();
        expect(container.querySelector('.--disabled')).toBeTruthy();
    });
});
