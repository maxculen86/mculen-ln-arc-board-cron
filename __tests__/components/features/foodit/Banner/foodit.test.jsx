import React from 'react';
import Context from 'fusion:context';
import { useContent } from 'fusion:content';
import { render, screen } from '@testing-library/react';

import Banner from '../../../../../components/features/foodit/Banner/recetas.jsx';
import imageMock from '../../../../../__mocks__/data/images/TR5C3TK6F5BWRCYRR3AUO4RMQ4.json';

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

describe('Components - features - recetas - Banner', () => {
    it('should test Receta Banner', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fRiuRNL7AOka',
            customFields: {
                imageId: 'TR5C3TK6F5BWRCYRR3AUO4RMQ4',
                link: 'https://canchallena.lanacion.com.ar/',
                title: 'Fulbo',
                hideBanner: false
            }
        };

        useContent.mockReturnValue(imageMock);

        const { container } = render(<Banner {...props} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('img').getAttribute('loading')).toBe('lazy');
        expect(screen.getByRole('img').getAttribute('fetchPriority')).toBe(
            'low'
        );
    });

    it('Should return fragment with hideBanner', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fRiuRNL7AOka',
            customFields: {
                imageId: 'TR5C3TK6F5BWRCYRR3AUO4RMQ4',
                link: 'https://canchallena.lanacion.com.ar/',
                title: 'Fulbo',
                hideBanner: true
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<Banner {...props} />);
        expect(container.innerHTML).toBeFalsy();
    });

    it('with isAdmin, should return WarningMessage without imageId, title or link', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: true,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0fRiuRNL7AOka',
            customFields: {
                imageId: '',
                link: '',
                title: '',
                hideBanner: false
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<Banner {...props} />);
        expect(container).toMatchSnapshot();
    });

    it('without isAdmin, should return fragment without imageId, title or link', () => {
        Context.useAppContext = jest.fn(() => ({
            isAdmin: false,
            arcSite: 'recetas'
        }));

        const props = {
            id: 'f0f1sPQ6tYQr7ye',
            customFields: {
                noteId: ''
            }
        };

        useContent.mockReturnValue();

        const { container } = render(<Banner {...props} />);
        expect(container.innerHTML).toBeFalsy();
    });
});
