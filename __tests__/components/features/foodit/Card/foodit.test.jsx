import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CardFoodit from '../../../../../components/features/foodit/Card/foodit.jsx';

import renderables from '../../../../../__mocks__/data/renderables/foodit/focal1HomeRenderables.json';
import articleFoodit from '../../../../../__mocks__/data/articlesFoodit/D3SATI3N45FQTB5PYSC7TRFTTU.json';
import articleFooditNota from '../../../../../__mocks__/data/articlesFoodit/FMLGIYTL2ZBCRAKQTSO27CCQ6U.json';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

jest.mock('fusion:context', Component => {
    return {
        default: function (Component) {
            return props => <Component {...props} />;
        },
        useComponentContext: jest.fn(() => ({}))
    };
});

describe('Components - features - CardFoodit', () => {
    it('should test CardFoodit - variant day-recipe with default label', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0fujPmnOyutm2Tj',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU',
                videoId: '',
                label: 'RECETA DEL DÍA'
            }
        };

        useContent.mockReturnValue(articleFoodit);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('article')).toHaveClass('--day-recipe');
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

        expect(screen.getByRole('img').getAttribute('loading')).toBe('eager');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'high'
        );
    });

    it('should test CardFoodit - variant day-recipe with empty label (fallback to default)', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0fujPmnOyutm2Tj',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU',
                videoId: '',
                label: ''
            }
        };

        useContent.mockReturnValue(articleFoodit);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('article')).toHaveClass('--day-recipe');
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

        expect(screen.getByRole('img').getAttribute('loading')).toBe('eager');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'high'
        );
    });

    it('should test CardFoodit - variant recipe with custom label', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0fK1lyE9F7t1Mr',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU',
                label: 'Mi Etiqueta Personalizada'
            }
        };

        useContent.mockReturnValue(articleFoodit);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('article')).toHaveClass('bg-light-1');
        expect(screen.getByRole('article')).not.toHaveClass('--day-recipe');

        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('should test CardFoodit - variant recipe without label', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0fK1lyE9F7t1Mr',
            customFields: {
                noteId: 'D3SATI3N45FQTB5PYSC7TRFTTU'
            }
        };

        useContent.mockReturnValue(articleFoodit);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        const cardElement = container.querySelector(
            '[data-test-id*="card-recipe"]'
        );
        expect(cardElement).toBeInTheDocument();

        expect(
            container.querySelector('[data-testid="card-label"]')
        ).not.toBeInTheDocument();

        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('should test CardFoodit - variant note', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0fRSQq3v9qt15n',
            customFields: {
                noteId: 'FMLGIYTL2ZBCRAKQTSO27CCQ6U',
                label: 'Nota Especial'
            }
        };

        useContent.mockReturnValue(articleFooditNota);

        const { container } = render(<CardFoodit {...props} />);
        expect(container).toMatchSnapshot();

        expect(screen.getByRole('article')).toHaveClass('bg-positive');
        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('with isAdmin, should return WarningMessage without noteId', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            renderables,
            arcSite: 'foodit'
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
            arcSite: 'foodit'
        }));

        const props = {
            id: 'f0f1sPQ6tYQr7ye',
            customFields: {
                noteId: ''
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<CardFoodit {...props} />);
        expect(container.querySelector('div')).toBeEmptyDOMElement();
    });
});
