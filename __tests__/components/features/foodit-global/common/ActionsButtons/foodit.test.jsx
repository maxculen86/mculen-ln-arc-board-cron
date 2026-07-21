import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn(() => ({
        deployment: jest.fn(path => `pathDeployment/${path}`),
        contextPath: 'contextPath',
        arcSite: 'ott',
        layout: 'FooditRecipe',
        siteProperties: {
            layoutsName: { FooditRecipePaywall: 'FooditRecipePaywall' }
        }
    })),
    useComponentContext: jest.fn(() => ({
        // Agrega los valores mockeados necesarios aquí
    })),
    useFusionContext: jest.fn(() => ({
        isAdmin: false,
        siteProperties: {
            site: 'the-prophet'
        }
    }))
}));

import ActionsButtons from '../../../../../../components/features/foodit-global/common/ActionsButtons/foodit';

describe('ActionsButtons component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    it('should renders share button when enabled', () => {
        render(
            <ActionsButtons
                article={{
                    _id: 'ABC',
                    type: 'story',
                    comments: { display_comments: true }
                }}
            />
        );
        expect(screen.getAllByRole('button')).toHaveLength(8);
        expect(screen.getByTitle('Comentarios')).toBeInTheDocument();
        expect(screen.getByTitle('Imprimir')).toBeInTheDocument();
        expect(screen.getByTitle('Copiar')).toBeInTheDocument();
    });

    it('should renders share button without comment', () => {
        render(
            <ActionsButtons
                article={{
                    _id: 'ABC',
                    type: 'story',
                    comments: { display_comments: false }
                }}
            />
        );
        expect(screen.getAllByRole('button')).toHaveLength(7);
        expect(screen.getByTitle('Imprimir')).toBeInTheDocument();
        expect(screen.getByTitle('Copiar')).toBeInTheDocument();
        expect(screen.getByTitle('Compartir')).toBeInTheDocument();
    });

    it('should render print button with --no-app class', () => {
        render(
            <ActionsButtons
                article={{
                    _id: 'ABC',
                    type: 'story',
                    comments: { display_comments: true }
                }}
            />
        );
        const printButton = screen.getByTitle('Imprimir');
        expect(printButton).toHaveClass('--no-app');
    });

    it('should render dropdown print button with --no-app class', () => {
        render(
            <ActionsButtons
                article={{
                    _id: 'ABC',
                    type: 'story',
                    comments: { display_comments: true }
                }}
                printButtonType="dropdown"
            />
        );
        const printButton = screen.getByTitle('Imprimir');
        const printDropdown = printButton.closest('.print-hide');
        expect(printDropdown).toHaveClass('--no-app');
    });

    it('should render only public buttons when isPrivate is true', () => {
        render(
            <ActionsButtons
                article={{
                    _id: 'ABC',
                    type: 'story',
                    comments: { display_comments: true }
                }}
                isPrivate={true}
            />
        );
        expect(screen.queryByTitle('Comentarios')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Imprimir')).not.toBeInTheDocument();
        expect(screen.getByTitle('Copiar')).toBeInTheDocument();
        expect(screen.getByTitle('Compartir')).toBeInTheDocument();
    });
});
