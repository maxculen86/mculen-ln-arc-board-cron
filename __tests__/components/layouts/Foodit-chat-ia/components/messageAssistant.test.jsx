import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageAssistant } from '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/MessageAssistant';
// --- Mocks ---
// Solo se mockea `Thread` (componente). `partitionSourcesByMatch` se usa real
// (requireActual) para ejercitar el MISMO matcher que el render inline.
jest.mock('@ln/ds-blocks-thread', () => ({
    ...jest.requireActual('@ln/ds-blocks-thread'),
    Thread: {
        Message: ({ message, isLastOutput }) => (
            <div data-testid="thread-message" data-is-last={!!isLastOutput}>
                {message && message.content}
            </div>
        )
    }
}));

jest.mock('@ln/ds-common-link', () => ({
    Link: ({ href, className, children }) => (
        <a data-testid="source-link" href={href} className={className}>
            {children}
        </a>
    )
}));

jest.mock('../../../../../components/features/ui/foodit/icon/default', () => ({
    __esModule: true,
    default: ({ name, size }) => (
        <span data-testid="icon" data-name={name} data-size={size} />
    )
}));

describe('MessageAssistant', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza fuentes no mencionadas cuando showAfterRender=true', () => {
        render(
            <MessageAssistant
                message={{
                    message_type: 'input',
                    content: 'x',
                    response_chat: {
                        descripcion: 'desc',
                        fuentes: [
                            { titulo: 'Fuente 1', url: 'https://a.com' },
                            { titulo: 'Fuente 2', url: 'https://b.com' }
                        ]
                    }
                }}
                isLastOutput={false}
            />
        );

        const links = screen.getAllByTestId('source-link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'https://a.com');
        expect(links[0]).toHaveTextContent('Fuente 1');
        expect(links[1]).toHaveAttribute('href', 'https://b.com');
    });

    it('si una fuente no tiene url, no la renderiza', () => {
        render(
            <MessageAssistant
                message={{
                    message_type: 'input',
                    content: 'x',
                    response_chat: {
                        descripcion: 'desc',
                        fuentes: [
                            { titulo: 'Sin URL', url: '' },
                            { titulo: 'Con URL', url: 'https://ok.com' }
                        ]
                    }
                }}
                isLastOutput={false}
            />
        );

        const links = screen.getAllByTestId('source-link');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveAttribute('href', 'https://ok.com');
        expect(links[0]).toHaveTextContent('Con URL');
    });

    it('excluye de la lista las fuentes ya mencionadas en la descripcion', () => {
        render(
            <MessageAssistant
                message={{
                    message_type: 'input',
                    content: 'x',
                    response_chat: {
                        descripcion: 'segun Fuente 1 esto es asi',
                        fuentes: [
                            { titulo: 'Fuente 1', url: 'https://a.com' },
                            { titulo: 'Fuente 2', url: 'https://b.com' }
                        ]
                    }
                }}
                isLastOutput={false}
            />
        );

        const links = screen.getAllByTestId('source-link');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveTextContent('Fuente 2');
    });

    it('no muestra fuentes mientras showAfterRender=false (ultimo output sin tipeo)', () => {
        render(
            <MessageAssistant
                message={{
                    message_type: 'input',
                    content: 'x',
                    response_chat: {
                        descripcion: 'desc',
                        fuentes: [{ titulo: 'Fuente 1', url: 'https://a.com' }]
                    }
                }}
                isLastOutput
                showAfterRender={false}
            />
        );

        expect(screen.queryByTestId('source-link')).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(
            <MessageAssistant
                message={{
                    message_type: 'input',
                    content: 'x',
                    response_chat: {
                        descripcion: 'desc',
                        fuentes: [
                            { titulo: 'Fuente 1', url: 'https://a.com' },
                            { titulo: 'Fuente 2', url: 'https://b.com' }
                        ]
                    }
                }}
                isLastOutput={false}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
