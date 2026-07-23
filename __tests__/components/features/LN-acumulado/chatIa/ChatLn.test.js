import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatLN from '../../../../../components/features/LN-acumulado/chatIa/default';
import { useChatRuntime } from '@ln/ds-blocks-thread';
import useGetUserData from '../../../../../components/private/common/auth/hooks/useGetUserData';

jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: Object.assign(
        ({ children, responseOptions }) => (
            <div
                data-testid="thread"
                data-answer-format={responseOptions?.answerFormat}
            >
                {children}
            </div>
        ),
        {
            Composer: ({ children }) => <div>{children}</div>,
            Viewport: ({ children, className }) => (
                <div data-testid="thread-viewport" className={className}>
                    {children}
                </div>
            ),
            // Replica la visibilidad real: sin error no monta, y el `filter` del consumidor pisa el default por status
            Error: ({ children, className, filter }) => {
                const { status, error } = jest.requireMock(
                    '@ln/ds-blocks-thread'
                ).useChatRuntime.mock.results[0].value;

                if (!error || !status) return null;

                const isVisible = filter
                    ? filter(error, status)
                    : status === 'error' || status === 'blocked';

                if (!isVisible) return null;

                return (
                    <div data-testid="thread-error" className={className}>
                        {children}
                    </div>
                );
            }
        }
    ),
    useChatRuntime: jest.fn()
}));

jest.mock('@ln/ds-cva', () => ({
    cx: (...args) => args.filter(Boolean).join(' ')
}));

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/InputChat',
    () => ({
        InputChat: ({ isSubscribed, isGenerating, isBlocked, disabled }) => (
            <div
                data-testid="input-chat"
                data-subscribed={String(isSubscribed)}
                data-generating={String(isGenerating)}
                data-blocked={String(isBlocked)}
                data-disabled={String(disabled)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/MessageContainer',
    () => ({
        MessageContainer: ({ messages, isGenerating }) => (
            <div
                data-testid="message-container"
                data-count={messages.length}
                data-generating={String(isGenerating)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/EmptyState',
    () => ({
        EmptyState: ({ isSubscribed }) => (
            <div
                data-testid="empty-state"
                data-subscribed={String(isSubscribed)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/components/SkeletonChat',
    () => ({
        SkeletonChat: () => <div data-testid="skeleton-chat" />
    })
);

jest.mock('../../../../../components/features/ui/ln/icon/default', () => ({
    __esModule: true,
    default: ({ name }) => <span data-testid={`icon-${name}`} />
}));

jest.mock('../../../../../components/features/ui/ln/button/default', () => ({
    __esModule: true,
    default: ({ children, onClick, type, disabled }) => (
        <button
            data-testid="reset-button"
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}));

jest.mock('../../../../../components/features/ui/ln/divider/default', () => ({
    __esModule: true,
    default: () => <hr data-testid="divider" />
}));

jest.mock(
    '../../../../../components/private/common/auth/hooks/useGetUserData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/auth/helper/loginHelper',
    () => ({
        SUBSCRIBED_HELPER: { LN: 'ln' }
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/chatIa/helpers/api',
    () => ({
        createMundialSession: jest
            .fn()
            .mockResolvedValue({ session_id: 'test-session-id' }),
        sendMundialChatMessage: jest.fn(),
        getSuggestedQuestions: jest
            .fn()
            .mockResolvedValue(['Pregunta 1', 'Pregunta 2', 'Pregunta 3']),
        resolveErrorMessage: jest.fn(),
        RESPONSE_FORMAT: 'text',
        FALLBACK_SUGGESTED_QUESTIONS: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3']
    })
);

jest.mock('../../../../../components/private/common/hooks/useTermica', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock(
    '../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../components/private/common/auth/hooks/useAuthManager',
    () => ({
        __esModule: true,
        default: jest.fn(() => ({
            token: 'mock-token',
            accessToken: 'mock-access-token'
        }))
    })
);

const mockSetMessages = jest.fn();
const mockSetStatus = jest.fn();
const mockSetError = jest.fn();
const mockOnSubmit = jest.fn();

const createRuntime = (overrides = {}) => ({
    status: 'idle',
    error: null,
    messages: [],
    setMessages: mockSetMessages,
    setStatus: mockSetStatus,
    setError: mockSetError,
    onSubmit: mockOnSubmit,
    ...overrides
});

beforeEach(() => {
    jest.clearAllMocks();
    useChatRuntime.mockReturnValue(createRuntime());
    useGetUserData.mockReturnValue({
        isSubscribed: true,
        userId: 'test-user-id'
    });
});

describe('ChatLN', () => {
    describe('snapshots', () => {
        it('should match snapshot when subscribed and idle', () => {
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when the runtime errors', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            const { container } = render(<ChatLN />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });

    describe('heading', () => {
        it('should render the LA NACION IA title', () => {
            render(<ChatLN />);
            expect(screen.getByText('LA NACION IA')).toBeInTheDocument();
        });
    });

    describe('suggested questions', () => {
        it('should show suggestions when idle with no messages', () => {
            render(<ChatLN />);
            expect(screen.getByText('Pregunta 1')).toBeInTheDocument();
            expect(screen.getByText('Pregunta 2')).toBeInTheDocument();
            expect(screen.getByText('Pregunta 3')).toBeInTheDocument();
        });

        it('should hide suggestions when the conversation already started', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );
            render(<ChatLN />);
            expect(screen.queryByText('Pregunta 1')).not.toBeInTheDocument();
        });

        it('should hide suggestions when the user is not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.queryByText('Pregunta 1')).not.toBeInTheDocument();
        });

        it('should enable the suggestion buttons when the user is subscribed', async () => {
            render(<ChatLN />);
            await waitFor(() => {
                const buttons = screen.getAllByRole('button', {
                    name: /Pregunta/
                });
                buttons.forEach(btn => expect(btn).not.toBeDisabled());
            });
        });

        it('should submit the suggestion text when a suggestion is clicked', async () => {
            render(<ChatLN />);
            await waitFor(() =>
                expect(screen.getByText('Pregunta 1')).not.toBeDisabled()
            );
            fireEvent.click(screen.getByText('Pregunta 1'));
            expect(mockOnSubmit).toHaveBeenCalledWith('Pregunta 1');
        });
    });

    describe('reset button', () => {
        it('should show the reset button when the session is blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('reset-button')).toBeInTheDocument();
        });

        it('should show the reset button when the runtime errors', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            expect(screen.getByTestId('reset-button')).toBeInTheDocument();
        });

        it('should not show the reset button when idle', () => {
            render(<ChatLN />);
            expect(
                screen.queryByTestId('reset-button')
            ).not.toBeInTheDocument();
        });

        it('should not show the reset button while generating', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'generating' })
            );
            render(<ChatLN />);
            expect(
                screen.queryByTestId('reset-button')
            ).not.toBeInTheDocument();
        });

        it('should create a new session and clear the runtime when reset from blocked', async () => {
            const { createMundialSession, getSuggestedQuestions } =
                jest.requireMock(
                    '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
                );
            createMundialSession.mockResolvedValue({
                session_id: 'new-session-123'
            });
            getSuggestedQuestions.mockResolvedValue([
                'Nueva P1',
                'Nueva P2',
                'Nueva P3'
            ]);

            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            fireEvent.click(screen.getByTestId('reset-button'));

            await waitFor(() => {
                expect(createMundialSession).toHaveBeenCalledWith({
                    userId: 'test-user-id',
                    accessToken: 'mock-access-token'
                });
                expect(mockSetMessages).toHaveBeenCalledWith([]);
                expect(mockSetStatus).toHaveBeenCalledWith('idle');
                expect(mockSetError).toHaveBeenCalledWith(null);
                expect(getSuggestedQuestions).toHaveBeenCalledWith({
                    userId: 'test-user-id',
                    accessToken: 'mock-access-token'
                });
            });
        });

        it('should create a new session and clear the runtime when reset from error', async () => {
            const { createMundialSession, getSuggestedQuestions } =
                jest.requireMock(
                    '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
                );
            createMundialSession.mockResolvedValue({
                session_id: 'new-session-456'
            });
            getSuggestedQuestions.mockResolvedValue([
                'Nueva P1',
                'Nueva P2',
                'Nueva P3'
            ]);

            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            fireEvent.click(screen.getByTestId('reset-button'));

            await waitFor(() => {
                expect(createMundialSession).toHaveBeenCalled();
                expect(mockSetMessages).toHaveBeenCalledWith([]);
                expect(mockSetStatus).toHaveBeenCalledWith('idle');
                expect(mockSetError).toHaveBeenCalledWith(null);
                expect(getSuggestedQuestions).toHaveBeenCalledWith({
                    userId: 'test-user-id',
                    accessToken: 'mock-access-token'
                });
            });
        });
    });

    describe('request failures', () => {
        const { sendMundialChatMessage, resolveErrorMessage } =
            jest.requireMock(
                '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
            );

        const submitFailingMessage = async () => {
            const { onNewMessage } = useChatRuntime.mock.calls[0][0];
            await expect(onNewMessage('pregunta')).rejects.toBeDefined();
        };

        it('should let the error propagate so the runtime marks it', async () => {
            sendMundialChatMessage.mockRejectedValue({ status: 500 });
            resolveErrorMessage.mockReturnValue('Ocurrió un error.');

            render(<ChatLN />);

            await submitFailingMessage();
        });

        it('should show the resolved copy for the HTTP status that failed', async () => {
            sendMundialChatMessage.mockRejectedValue({ status: 403 });
            resolveErrorMessage.mockReturnValue('No puedo responder eso.');
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'error',
                    error: { code: 'internal_error', message: null }
                })
            );

            render(<ChatLN />);
            await submitFailingMessage();

            await waitFor(() =>
                expect(screen.getByTestId('thread-error')).toHaveTextContent(
                    'No puedo responder eso.'
                )
            );
        });

        it('should still offer the reset CTA when the request failed', async () => {
            sendMundialChatMessage.mockRejectedValue({ status: 500 });
            resolveErrorMessage.mockReturnValue('Ocurrió un error.');
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));

            render(<ChatLN />);
            await submitFailingMessage();

            await waitFor(() =>
                expect(screen.getByTestId('reset-button')).toBeInTheDocument()
            );
        });

        it('should render with the same format it asks the API for', () => {
            const { RESPONSE_FORMAT } = jest.requireMock(
                '../../../../../components/features/LN-acumulado/chatIa/helpers/api'
            );

            render(<ChatLN />);

            expect(screen.getByTestId('thread')).toHaveAttribute(
                'data-answer-format',
                RESPONSE_FORMAT
            );
        });

        it('should not show the error banner while the chat is idle', () => {
            render(<ChatLN />);

            expect(
                screen.queryByTestId('thread-error')
            ).not.toBeInTheDocument();
        });

        it('should not show the error banner when the session just ended', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'blocked',
                    error: { code: 'session_completed', message: null }
                })
            );

            render(<ChatLN />);

            expect(
                screen.queryByTestId('thread-error')
            ).not.toBeInTheDocument();
        });

        it('should still offer the reset CTA when the session ended', async () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'blocked',
                    error: { code: 'session_completed', message: null }
                })
            );

            render(<ChatLN />);

            await waitFor(() =>
                expect(screen.getByTestId('reset-button')).toBeInTheDocument()
            );
        });
    });

    describe('disclaimer', () => {
        it('should show the disclaimer when the user is subscribed', () => {
            render(<ChatLN />);
            expect(
                screen.getByText(/Las respuestas se basan/)
            ).toBeInTheDocument();
        });

        it('should hide the disclaimer when the user is not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(
                screen.queryByText(/Las respuestas se basan/)
            ).not.toBeInTheDocument();
        });

        it('should show the divider when the user is subscribed', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('divider')).toBeInTheDocument();
        });

        it('should hide the divider when the user is not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
        });
    });

    describe('input state', () => {
        it('should disable the input when the user is not subscribed', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });

        it('should enable the input when the user is subscribed', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-disabled',
                'false'
            );
        });

        it('should flag the input as generating while a response streams', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'generating' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-generating',
                'true'
            );
        });

        it('should block the input when the session is blocked', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-blocked',
                'true'
            );
        });

        it('should block the input when the runtime errors', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));
            render(<ChatLN />);
            expect(screen.getByTestId('input-chat')).toHaveAttribute(
                'data-blocked',
                'true'
            );
        });
    });

    describe('when hideChat is set', () => {
        it('should render nothing when hideChat is true', () => {
            const { container } = render(
                <ChatLN customFields={{ hideChat: true }} />
            );
            expect(container.firstChild).toBeNull();
        });

        it('should render the chat when hideChat is false', () => {
            useGetUserData.mockReturnValue({ isSubscribed: false });
            const { container } = render(
                <ChatLN customFields={{ hideChat: false }} />
            );
            expect(container.firstChild).not.toBeNull();
        });
    });

    describe('when the termica flag and hideChat coexist', () => {
        let restoreUseTermica;

        beforeEach(() => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            restoreUseTermica = useTermica.getMockImplementation();
        });

        afterEach(() => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            useTermica.mockImplementation(restoreUseTermica);
        });

        it('should render nothing when the termica flag is on, even if hideChat is false', () => {
            const useTermica = jest.requireMock(
                '../../../../../components/private/common/hooks/useTermica'
            ).default;
            useTermica.mockImplementation(() => 'true');
            const { container } = render(
                <ChatLN customFields={{ hideChat: false }} />
            );
            expect(container.firstChild).toBeNull();
        });
    });

    describe('viewport visibility', () => {
        it('should hide the viewport when there are no messages', () => {
            render(<ChatLN />);
            expect(screen.getByTestId('thread-viewport')).toHaveClass('hidden');
        });

        it('should show the viewport when there are messages', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );
            render(<ChatLN />);
            expect(screen.getByTestId('thread-viewport')).not.toHaveClass(
                'hidden'
            );
        });
    });
});
