import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderComments from '../../../../../../components/private/LN/nota/comments/header';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('HeaderComments', () => {
    it('renders heading with correct text', () => {
        const { container } = render(<HeaderComments />);
        expect(screen.getByText('Enviá tu comentario')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('toggles legales text visibility on click', () => {
        render(<HeaderComments />);
        const legalesElement = screen.getByText(/Los comentarios publicados/, {
            selector: 'p'
        });
        expect(legalesElement).toHaveClass('none');

        fireEvent.click(screen.getByText('Ver legales'));
        expect(legalesElement).not.toHaveClass('none');

        fireEvent.click(screen.getByText('Ver legales'));
        expect(legalesElement).toHaveClass('none');
    });

    it('renders legales text with correct content', () => {
        render(<HeaderComments />);
        expect(
            screen.getByText(
                /Los comentarios publicados son de exclusiva responsabilidad/
            )
        ).toBeInTheDocument();
    });
});
