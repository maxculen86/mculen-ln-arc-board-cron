import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderComments from '../../../../../../components/private/LN/nota/comments/header';
import * as scrollUtils from '../../../../../../components/private/LN/common/utils/scrollToElementWithOffset';

jest.mock(
    '../../../../../../components/private/LN/common/utils/scrollToElementWithOffset'
);
jest.mock(
    '../../../../../../components/features/LN/common/scrollToTopButton/ScrollToTopButton',
    () => {
        return function MockScrollToTopButton({ onClick }) {
            return (
                <button onClick={onClick} data-testid="scroll-top-btn">
                    Scroll Top
                </button>
            );
        };
    }
);

const HEADER_OFFSET = 100;

beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = jest.fn();
});

describe('HeaderComments', () => {
    it('renders heading with correct text', () => {
        const { container } = render(<HeaderComments />);
        expect(screen.getByText('Enviá tu comentario')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('scrolls to article title when h1 exists', () => {
        const mockElement = document.createElement('h1');
        mockElement.className = 'com-title';
        mockElement.textContent = 'Article Title';
        jest.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
            top: 200
        });
        document.body.appendChild(mockElement);
        window.scrollY = 500;

        render(<HeaderComments />);
        fireEvent.click(screen.getByTestId('scroll-top-btn'));

        expect(scrollUtils.scrollToElementWithOffset).toHaveBeenCalledWith(
            mockElement
        );

        document.body.removeChild(mockElement);
    });

    it('scrolls to top with smooth behavior when h1 not found', () => {
        render(<HeaderComments />);
        fireEvent.click(screen.getByTestId('scroll-top-btn'));

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth'
        });
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
