import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardFoodit from '../../../../../components/features/foodit/Card/recetas.jsx';

import renderables from '../../../../../__mocks__/data/renderables/foodit/renderablesRecetas1.json';
import articleReceta from '../../../../../__mocks__/data/articlesFoodit/D3SATI3N45FQTB5PYSC7TRFTTU.json';
import articleRecetaNota from '../../../../../__mocks__/data/articlesFoodit/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';

jest.mock('fusion:consumer', Component => {
    return function(Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return {
        default: function(Component) {
            return props => <Component {...props} />;
        },
        useComponentContext: jest.fn(() => ({}))
    };
});

describe('Components - features - CardReceta', () => {
    it('should test CardReceta - variant day-recipe', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fJFPMkar6s1FK',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU'
            }
        };

        useContent.mockReturnValue(articleReceta);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('article')).toHaveClass('--day-recipe');

        expect(screen.getByRole('img').getAttribute('loading')).toBe('eager');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'high'
        );
    });

    it('should test CardReceta - variant recipe', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fK1lyE9F7t1Mr',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU'
            }
        };

        useContent.mockReturnValue(articleReceta);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        // expect(screen.getByRole('div')).toHaveClass('bg-light-1'); pendiente definicion
        expect(screen.getByRole('article')).not.toHaveClass('--day-recipe');

        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('should test CardReceta - variant note', () => {
        // TODO: test no apertura
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fRSQq3v9qt15n',
            customFields: {
                noteId: 'FMLGIYTL2ZBCRAKQTSO27CCQ6U'
            }
        };

        useContent.mockReturnValue(articleRecetaNota);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        // expect(screen.getByRole('article')).toHaveClass('bg-light-100'); pendiente definicion
        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('with isAdmin, should return WarningMessage without noteId', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0f1sPQ6tYQr7ye',
            customFields: {
                noteId: ''
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('without isAdmin, should return fragment without noteId', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0f1sPQ6tYQr7ye',
            customFields: {
                noteId: ''
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<CardFoodit {...props} />);
        expect(container.innerHTML).toBeFalsy();
    });
});
