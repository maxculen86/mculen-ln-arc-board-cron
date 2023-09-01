import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';
import CardRecetas from '../../../../../components/features/recetas/CardRecetas/recetas.jsx';

import renderables from '../../../../../__mocks__/data/renderables/recetas/renderablesRecetas1.json';
import articleReceta from '../../../../../__mocks__/data/articlesReceta/HLVF6HRMYNB2TI7L7G724OAPIU.json';

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
    it('should test CardReceta', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            renderables,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0f1sPQ6tYQr7ye',
            customFields: {
                noteId: 'HLVF6HRMYNB2TI7L7G724OAPIU'
            }
        };

        useContent.mockReturnValue(articleReceta);

        const { container } = render(<CardRecetas {...props} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('img').getAttribute('loading')).toBe('eager');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'high'
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

        const { container } = render(<CardRecetas {...props} />);
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

        const { container } = render(<CardRecetas {...props} />);
        expect(container.innerHTML).toBeFalsy();
    });
});
