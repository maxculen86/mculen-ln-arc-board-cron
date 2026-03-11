import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageAssistant } from '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/MessageAssistant';
// --- Mocks ---
const mockUseShowFuentesAfterMutation = jest.fn();

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/hooks/helpers',
    () => ({
        useShowFuentesAfterMutation: args =>
            mockUseShowFuentesAfterMutation(args)
    })
);

jest.mock('@ln/ds-blocks-thread', () => ({
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

    it('renderiza fuentes solo si hay fuentes y showFuentes=true', () => {
        mockUseShowFuentesAfterMutation.mockReturnValue(true);

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
                isGenerating={false}
            />
        );

        const links = screen.getAllByTestId('source-link');
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', 'https://a.com');
        expect(links[0]).toHaveTextContent('Fuente 1');
        expect(links[1]).toHaveAttribute('href', 'https://b.com');
    });

    it('si una fuente no tiene url, no la renderiza', () => {
        mockUseShowFuentesAfterMutation.mockReturnValue(true);

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
                isGenerating={false}
            />
        );

        const links = screen.getAllByTestId('source-link');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveAttribute('href', 'https://ok.com');
        expect(links[0]).toHaveTextContent('Con URL');
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
                isGenerating={false}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
