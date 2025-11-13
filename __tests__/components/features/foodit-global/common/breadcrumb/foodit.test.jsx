import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreadcrumbFoodit from '../../../../../../components/features/foodit-global/common/breadcrumb/foodit';

jest.mock('fusion:environment', () => {
    return {
        SITE_FOODIT: 'https://foodit.lanacion.com.ar'
    };
});

describe('BreadcrumbFoodit', () => {
    it('renders BreadcrumbFoodit component with 4 sections (foodit, receta, salada, pollo)', () => {
        const globalContent = {
            _id: 'TYIAVEAOYCEUACVYEUO',
            taxonomy: {
                primary_section: {
                    _id: '/recetas/saladas/pollo'
                }
            }
        };

        render(<BreadcrumbFoodit globalContent={globalContent} />);

        expect(
            screen.getByRole('link', {
                name: 'Foodit'
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', {
                name: 'Recetas'
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', {
                name: 'Saladas'
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', {
                name: 'Pollo'
            })
        ).toBeInTheDocument();
    });

    it('If there are no sections, it should show the Foodit anchor', () => {
        const globalContent = {};

        render(<BreadcrumbFoodit globalContent={globalContent} />);
        expect(
            screen.getByRole('link', {
                name: 'Foodit'
            })
        ).toBeInTheDocument();
    });

    it('The last link of an accumulation should have the class --disabled', () => {
        const globalContent = {
            _id: '/recetas/dietas/sin-gluten'
        };

        const { container } = render(
            <BreadcrumbFoodit globalContent={globalContent} />
        );

        expect(screen.getByText('Sin gluten')).toBeInTheDocument();
        expect(container.querySelector('.--disabled')).toBeTruthy();
    });

    it('Should show the tooltip when the recipe contains the /gluten-free/ section, and button "Mostrar tooltip" is clicked', () => {
        const globalContent = {
            _id: 'SUYAOIFGEYUWIOBF',
            taxonomy: {
                primary_section: {
                    _id: '/recetas/dietas'
                },
                sections: [
                    { _id: '/recetas' },
                    { _id: '/dietas' },
                    { _id: '/sin-gluten' }
                ]
            }
        };
        render(<BreadcrumbFoodit globalContent={globalContent} />);

        const Button = screen.getByTitle('Mostrar tooltip');
        fireEvent.click(Button);

        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toBeVisible();
    });

    it('Exclude sections que cocinar hoy in breadcrumb', () => {
        const { container: containerSaladas } = render(
            <BreadcrumbFoodit
                globalContent={{
                    _id: '/recetas/saladas/pollo'
                }}
            />
        );

        expect(containerSaladas.getElementsByTagName('li')).toHaveLength(4);

        const { container: containerDieta } = render(
            <BreadcrumbFoodit
                globalContent={{
                    _id: '/recetas/dieta/sin-gluten'
                }}
            />
        );
        expect(containerDieta.getElementsByTagName('li')).toHaveLength(3);

        const { container: containerQueCocinarHoy } = render(
            <BreadcrumbFoodit
                globalContent={{
                    _id: '/recetas/dieta/sin-gluten'
                }}
            />
        );

        expect(containerQueCocinarHoy.getElementsByTagName('li')).toHaveLength(
            3
        );
    });
});
