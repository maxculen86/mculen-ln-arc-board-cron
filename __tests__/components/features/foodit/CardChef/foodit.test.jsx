import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContent } from 'fusion:content';
import CardChef from '../../../../../components/features/foodit/CardChef/foodit';

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
        useComponentContext: jest.fn(() => ({})),
        useAppContext: () => ({ isAdmin: true, arcSite: 'foodit' })
    };
});

describe('Components - features - CardChef', () => {
    it('renders without errors', () => {
        const mockAuthor = {
            _id: 'chef-123',
            canonical_url: 'http://lanacion/chef-123.com',
            name: 'Maru botana',
            image: { url: 'http://image.com/image-chef-123.jpg' }
        };
        useContent.mockReturnValue(mockAuthor);

        const customFields = { id: 'chef-123' };

        render(<CardChef customFields={customFields} />);

        expect(screen.getByText('Maru botana')).toBeTruthy();
        expect(screen.getByTitle('Ir a Maru botana')).toBeTruthy();
        expect(
            screen.getByRole('link', { name: 'Maru botana' })
        ).toHaveAttribute('href', 'http://lanacion/chef-123.com');
    });

    it('renders warning message when ID is missing', () => {
        const customFields = { id: '' };

        render(<CardChef customFields={customFields} />);

        expect(screen.getByText('Se requiere id de chef.')).toBeInTheDocument();
    });

    it('renders warning message when author is not found', () => {
        const customFields = { id: 'chef-123' };

        useContent.mockReturnValue(null);

        render(<CardChef customFields={customFields} />);

        expect(screen.getByText('No se encontro chef.')).toBeInTheDocument();
    });
});
