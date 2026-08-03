import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useChatRuntime } from '@ln/ds-blocks-thread';
import ChatIaFoodit from '../../../../../components/layouts/Foodit-chat-ia/_children/ChatFoodit';
import useGetUserConfig from '../../../../../components/features/foodit-global/hooks/useGetUserConfig';
import {
    createSessionChat,
    sendChatMessage
} from '../../../../../components/features/foodit-global/common/Header/_helpers';
import { getAuthTokens } from '../../../../../components/private/common/auth/helper/loginHelper';
import { pushFooditEvent } from '../../../../../components/features/foodit-global/common/utils/pushFooditEvent';

jest.mock('fusion:context', () => ({
    useAppContext: () => ({ requestUri: '/chat-ia/' })
}));

// Guardamos el `onTypingComplete` del root para simular el fin del tipeo
let typingComplete = null;
jest.mock('@ln/ds-blocks-thread', () => ({
    Thread: Object.assign(
        ({ children, responseOptions }) => {
            typingComplete = responseOptions?.onTypingComplete;
            return (
                <div
                    data-testid="thread"
                    data-answer-format={responseOptions?.answerFormat}
                >
                    {children}
                </div>
            );
        },
        {
            Viewport: ({ children }) => <div>{children}</div>,
            Composer: ({ children }) => <div>{children}</div>
        }
    ),
    useChatRuntime: jest.fn()
}));

jest.mock('@ln/hooks', () => ({
    useDisclosure: () => ({
        isOpen: false,
        onOpen: jest.fn(),
        onClose: jest.fn()
    })
}));

jest.mock(
    '../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({ __esModule: true, default: jest.fn() })
);

jest.mock(
    '../../../../../components/features/foodit-global/common/Header/_helpers',
    () => ({
        createSessionChat: jest.fn(),
        sendChatMessage: jest.fn(),
        RESPONSE_FORMAT: 'markdown'
    })
);

jest.mock(
    '../../../../../components/private/common/auth/helper/loginHelper',
    () => ({ getAuthTokens: jest.fn() })
);

jest.mock(
    '../../../../../components/features/foodit-global/common/utils/pushFooditEvent',
    () => ({ pushFooditEvent: jest.fn() })
);

jest.mock(
    '../../../../../components/features/foodit-global/common/dataLayer/_helpers',
    () => ({ cleanUrl: url => url })
);

jest.mock(
    '../../../../../components/private/common/utils/getQueryParamValue',
    () => ({ __esModule: true, default: () => '' })
);

// Guardamos el `onTimeout` para poder disparar la expiración de sesión a mano.
let inactivityTimeout = null;
jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/hooks/helpers',
    () => ({
        useInactivityTimer: ({ onTimeout }) => {
            inactivityTimeout = onTimeout;
            return { reset: jest.fn() };
        }
    })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/MessageContainer/MessageContainer',
    () => ({
        MessageContainer: ({ messages, showAfterRenderAssistant }) => (
            <div
                data-testid="message-container"
                data-count={messages.length}
                data-show-after-render={String(showAfterRenderAssistant)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/formContainer',
    () => ({
        FormContainer: ({ disableInput, requestLimit, hasError }) => (
            <div
                data-testid="form-container"
                data-disabled={String(disableInput)}
                data-request-limit={String(requestLimit)}
                data-has-error={String(hasError)}
            />
        )
    })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/emptyStateChat',
    () => ({ EmptyStateChat: () => <div data-testid="empty-state-chat" /> })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/skeletonChatIa',
    () => ({ SkeletonChatIa: () => <div data-testid="skeleton" /> })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/SessionExpiredModal',
    () => ({ SessionExpiredModal: () => <div data-testid="session-modal" /> })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/buttonScroll',
    () => ({ ButtonScroll: () => <div data-testid="button-scroll" /> })
);

jest.mock(
    '../../../../../components/layouts/Foodit-chat-ia/_children/SessionEnd',
    () => ({
        SessionEnd: ({ isSessionCompleted, requestLimit }) => (
            <div
                data-testid="session-end"
                data-session-completed={String(isSessionCompleted)}
                data-request-limit={String(requestLimit)}
            />
        )
    })
);

const mockSetMessages = jest.fn();
const mockOnSubmit = jest.fn();
const mockSetStatus = jest.fn();
const mockSetError = jest.fn();

const createRuntime = (overrides = {}) => ({
    status: 'idle',
    messages: [],
    error: null,
    setMessages: mockSetMessages,
    onSubmit: mockOnSubmit,
    setStatus: mockSetStatus,
    setError: mockSetError,
    ...overrides
});

const assistantMessage = (query, overrides = {}) => ({
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query,
            answer: 'Una respuesta.',
            follow_up_query: null,
            sources: []
        },
        session_id: 'foodit-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active',
        ...overrides
    }
});

beforeEach(() => {
    jest.clearAllMocks();
    useChatRuntime.mockReturnValue(createRuntime());
    useGetUserConfig.mockReturnValue({ isSubscribed: true, id: 'user-42' });
    getAuthTokens.mockResolvedValue({ accessToken: 'jwt-token' });
    createSessionChat.mockResolvedValue({ session_id: 'session-abc' });
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
});

describe('ChatIaFoodit', () => {
    // Pintar el chat antes de saber si el usuario tiene acceso obliga a
    // cambiarlo apenas resuelve, y eso es un salto de layout a la vista
    describe('skeleton', () => {
        it('should hold the skeleton while the user is still loading', () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                id: '',
                userType: 'loading'
            });

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('skeleton')).toBeInTheDocument();
            expect(screen.queryByTestId('thread')).not.toBeInTheDocument();
        });

        it('should swap to the thread once the user resolved', () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: true,
                id: 'user-42',
                userType: 'subscribed'
            });

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('thread')).toBeInTheDocument();
            expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
        });
    });

    describe('session creation', () => {
        it('should send the user id required by the new contract when subscribed', async () => {
            render(<ChatIaFoodit />);

            await waitFor(() =>
                expect(createSessionChat).toHaveBeenCalledWith({
                    accessToken: 'jwt-token',
                    userId: 'user-42'
                })
            );
        });

        it('should not create a session when the user is not subscribed', async () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                id: 'user-42'
            });

            render(<ChatIaFoodit />);

            await waitFor(() => expect(getAuthTokens).not.toHaveBeenCalled());
            expect(createSessionChat).not.toHaveBeenCalled();
        });

        it('should render the empty state instead of the composer when not subscribed', () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                id: 'user-42'
            });

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('empty-state-chat')).toBeInTheDocument();
            expect(
                screen.queryByTestId('form-container')
            ).not.toBeInTheDocument();
        });
    });

    describe('formato de la respuesta', () => {
        it('should render with the same format it asks the API for', () => {
            const { RESPONSE_FORMAT } = jest.requireMock(
                '../../../../../components/features/foodit-global/common/Header/_helpers'
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('thread')).toHaveAttribute(
                'data-answer-format',
                RESPONSE_FORMAT
            );
        });
    });

    describe('session failures', () => {
        it('should log the error instead of crashing when the API rejects', async () => {
            createSessionChat.mockRejectedValue(new Error('500 del proxy'));

            render(<ChatIaFoodit />);

            await waitFor(() =>
                expect(console.error).toHaveBeenCalledWith(
                    'ChatFoodit - error create session chat',
                    expect.any(Error)
                )
            );
        });

        it('should not call the session endpoint when there is no access token', async () => {
            getAuthTokens.mockResolvedValue({ accessToken: undefined });

            render(<ChatIaFoodit />);

            await waitFor(() => expect(console.error).toHaveBeenCalled());
            expect(createSessionChat).not.toHaveBeenCalled();
        });

        it('should report a descriptive error when the JWT is missing', async () => {
            getAuthTokens.mockResolvedValue({ accessToken: undefined });

            render(<ChatIaFoodit />);

            await waitFor(() =>
                expect(console.error).toHaveBeenCalledWith(
                    'ChatFoodit - error create session chat',
                    expect.objectContaining({
                        message: expect.stringContaining('sin accessToken')
                    })
                )
            );
        });

        // Sin sesión no hay a quién pedirle el mensaje: se reusa el estado
        // `error` del runtime para que salga el mismo cartel que un fallo de chat
        it('should flag the runtime as errored so the generic banner shows', async () => {
            createSessionChat.mockRejectedValue(new Error('500 del proxy'));

            render(<ChatIaFoodit />);

            await waitFor(() =>
                expect(mockSetStatus).toHaveBeenCalledWith('error')
            );
            expect(mockSetError).toHaveBeenCalledWith(
                expect.objectContaining({ code: 'internal_error' })
            );
        });
    });

    describe('search term for Queryly', () => {
        const withKeywords = (query, keywords) => {
            const message = assistantMessage(query);
            message.data.message.keywords = keywords;
            return message;
        };

        it('should prefer the keywords over the raw user question', () => {
            const onSearchTermChange = jest.fn();
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [
                        withKeywords('podrías darme un menú semanal?', [
                            'menu semanal',
                            'batch cooking',
                            'planificacion'
                        ])
                    ]
                })
            );

            render(<ChatIaFoodit onSearchTermChange={onSearchTermChange} />);

            expect(onSearchTermChange).toHaveBeenCalledWith(
                'menu semanal / batch cooking'
            );
        });

        it('should report the query of the last assistant message', () => {
            const onSearchTermChange = jest.fn();
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [
                        { message_type: 'output', content: 'hola' },
                        assistantMessage('cómo hacer un buen asado')
                    ]
                })
            );

            render(<ChatIaFoodit onSearchTermChange={onSearchTermChange} />);

            expect(onSearchTermChange).toHaveBeenCalledWith(
                'cómo hacer un buen asado'
            );
        });

        it('should use the most recent query when there are several exchanges', () => {
            const onSearchTermChange = jest.fn();
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [
                        assistantMessage('primera consulta'),
                        assistantMessage('última consulta')
                    ]
                })
            );

            render(<ChatIaFoodit onSearchTermChange={onSearchTermChange} />);

            expect(onSearchTermChange).toHaveBeenLastCalledWith(
                'última consulta'
            );
        });

        it('should not report anything when the response has no query', () => {
            const onSearchTermChange = jest.fn();
            useChatRuntime.mockReturnValue(
                createRuntime({ messages: [assistantMessage('')] })
            );

            render(<ChatIaFoodit onSearchTermChange={onSearchTermChange} />);

            expect(onSearchTermChange).not.toHaveBeenCalled();
        });

        it('should ignore user messages, which carry no query field', () => {
            const onSearchTermChange = jest.fn();
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );

            render(<ChatIaFoodit onSearchTermChange={onSearchTermChange} />);

            expect(onSearchTermChange).not.toHaveBeenCalled();
        });
    });

    describe('analytics', () => {
        it('should read chat_count from data, where the new contract puts it', async () => {
            sendChatMessage.mockResolvedValue(
                assistantMessage('consulta', { chat_count: 7 })
            );

            render(<ChatIaFoodit />);

            const { onNewMessage } = useChatRuntime.mock.calls[0][0];
            await onNewMessage('consulta');

            expect(pushFooditEvent).toHaveBeenCalledWith({
                rest: expect.objectContaining({
                    event: 'enviar_consulta',
                    cta: 7
                })
            });
        });

        it('should send the user id and ask for markdown when submitting a message', async () => {
            sendChatMessage.mockResolvedValue(assistantMessage('consulta'));

            render(<ChatIaFoodit />);

            const { onNewMessage } = useChatRuntime.mock.calls[0][0];
            await onNewMessage('consulta');

            expect(sendChatMessage).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: 'consulta',
                    userId: 'user-42',
                    accessToken: ''
                })
            );
        });

        it('should push the chat_open event on mount', () => {
            render(<ChatIaFoodit />);

            expect(pushFooditEvent).toHaveBeenCalledWith({
                rest: expect.objectContaining({ event: 'chat_open' })
            });
        });
    });

    describe('blocked state', () => {
        it('should flag the request limit when the runtime blocks the session', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-request-limit',
                'true'
            );
        });

        it('should not flag an error when the runtime recovered and is idle', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'idle',
                    error: { code: 'internal_error' }
                })
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-has-error',
                'false'
            );
        });

        it('should flag an error when the runtime status is error', () => {
            useChatRuntime.mockReturnValue(createRuntime({ status: 'error' }));

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-has-error',
                'true'
            );
        });

        it('should disable the input when the runtime blocks the session', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'blocked' })
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });

        it('should disable the input while a response is being generated', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'generating' })
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });
    });

    describe('thinking indicator', () => {
        it('should show it while the runtime is generating', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'generating',
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );

            render(<ChatIaFoodit />);

            expect(
                screen.getByText('Foodit está pensando ...')
            ).toBeInTheDocument();
        });

        // Regresión: un error de red no appendea mensaje del asistente, así que
        // `messages.length` se queda en 1 para siempre. Gatear por eso, y no
        // por `status`, dejaba este cartel colgado en vez de ceder el lugar al error.
        it('should hide it when a failed request leaves the reply unanswered', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'error',
                    error: { code: 'internal_error' },
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );

            render(<ChatIaFoodit />);

            expect(
                screen.queryByText('Foodit está pensando ...')
            ).not.toBeInTheDocument();
        });

        it('should hide it when the session got blocked before any answer', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'blocked',
                    error: { code: 'session_terminated' },
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );

            render(<ChatIaFoodit />);

            expect(
                screen.queryByText('Foodit está pensando ...')
            ).not.toBeInTheDocument();
        });

        it('should hide it once idle with an answered message', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'idle',
                    messages: [
                        { message_type: 'output', content: 'hola' },
                        assistantMessage('hola')
                    ]
                })
            );

            render(<ChatIaFoodit />);

            expect(
                screen.queryByText('Foodit está pensando ...')
            ).not.toBeInTheDocument();
        });

        // El hueco que hacía el segundo parpadeo: la sesión ya está creada pero
        // el `onSubmit` todavía no movió el status, así que el runtime pasa por `idle`
        it('should keep it on in the idle gap between session and submit', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'idle', messages: [] })
            );

            render(<ChatIaFoodit />);

            expect(
                screen.getByText('Foodit está pensando ...')
            ).toBeInTheDocument();
        });

        it('should not show it to a user without subscription', () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                id: 'user-42',
                userType: 'unlogged'
            });

            render(<ChatIaFoodit />);

            expect(
                screen.queryByText('Foodit está pensando ...')
            ).not.toBeInTheDocument();
        });

        // Antes de tener sesión el runtime sigue en `idle`, sin mensajes: sin
        // este gate el usuario ve el chat vacío mientras arma la sesión
        it('should show it while the session is still being created', async () => {
            let resolveSession;
            createSessionChat.mockReturnValue(
                new Promise(resolve => {
                    resolveSession = resolve;
                })
            );

            render(<ChatIaFoodit />);

            await waitFor(() =>
                expect(
                    screen.getByText('Foodit está pensando ...')
                ).toBeInTheDocument()
            );

            await act(async () => {
                resolveSession({ session_id: 'session-abc' });
            });
        });
    });

    // El runtime vuelve a `idle` en cuanto llega la respuesta: el tipeo corre con el chat "libre"
    describe('input while the answer types', () => {
        const typingRuntime = () =>
            createRuntime({
                status: 'idle',
                messages: [
                    { message_type: 'output', content: 'hola' },
                    assistantMessage('hola')
                ]
            });

        it('should disable the input while the last answer is still typing', () => {
            useChatRuntime.mockReturnValue(typingRuntime());

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });

        it('should enable the input once the answer finished typing', () => {
            useChatRuntime.mockReturnValue(typingRuntime());

            render(<ChatIaFoodit />);
            act(() => typingComplete());

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'false'
            );
        });

        it('should keep the input enabled when the last message is the user question', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'idle',
                    messages: [{ message_type: 'output', content: 'hola' }]
                })
            );

            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'false'
            );
        });
    });

    describe('session end block', () => {
        const blockedRuntime = (code = 'session_completed') =>
            createRuntime({ status: 'blocked', error: { code } });

        it('should not render the session end block while the answer is still typing', () => {
            useChatRuntime.mockReturnValue(blockedRuntime());

            render(<ChatIaFoodit />);

            expect(screen.queryByTestId('session-end')).not.toBeInTheDocument();
        });

        it('should render the session end block once the answer finished typing', () => {
            useChatRuntime.mockReturnValue(blockedRuntime());

            render(<ChatIaFoodit />);
            act(() => typingComplete());

            expect(screen.getByTestId('session-end')).toBeInTheDocument();
        });

        it('should flag the completed session so the closing text is shown', () => {
            useChatRuntime.mockReturnValue(blockedRuntime());

            render(<ChatIaFoodit />);
            act(() => typingComplete());

            expect(screen.getByTestId('session-end')).toHaveAttribute(
                'data-session-completed',
                'true'
            );
        });

        it('should not flag a completed session when the backend reported an error code', () => {
            useChatRuntime.mockReturnValue(blockedRuntime('internal_error'));

            render(<ChatIaFoodit />);
            act(() => typingComplete());

            expect(screen.getByTestId('session-end')).toHaveAttribute(
                'data-session-completed',
                'false'
            );
        });

        it('should not flag a completed session while the chat is still active', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    status: 'idle',
                    error: { code: 'session_completed' }
                })
            );

            render(<ChatIaFoodit />);
            act(() => typingComplete());

            expect(screen.getByTestId('session-end')).toHaveAttribute(
                'data-session-completed',
                'false'
            );
        });

        it('should hide the block again when a new answer starts coming in', () => {
            const { rerender } = render(<ChatIaFoodit />);
            act(() => typingComplete());
            expect(screen.getByTestId('session-end')).toBeInTheDocument();

            useChatRuntime.mockReturnValue(
                createRuntime({ status: 'sending' })
            );
            rerender(<ChatIaFoodit />);

            expect(screen.queryByTestId('session-end')).not.toBeInTheDocument();
        });
    });

    describe('inactivity timeout', () => {
        it('should disable the input when the session expires', () => {
            render(<ChatIaFoodit />);

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'false'
            );

            act(() => inactivityTimeout());

            expect(screen.getByTestId('form-container')).toHaveAttribute(
                'data-disabled',
                'true'
            );
        });
    });

    describe('snapshots', () => {
        it('should match snapshot when subscribed and waiting for the first answer', () => {
            const { container } = render(<ChatIaFoodit />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when the first answer already arrived', () => {
            useChatRuntime.mockReturnValue(
                createRuntime({
                    messages: [
                        { message_type: 'output', content: 'hola' },
                        assistantMessage('hola')
                    ]
                })
            );

            const { container } = render(<ChatIaFoodit />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot when not subscribed', () => {
            useGetUserConfig.mockReturnValue({
                isSubscribed: false,
                id: 'user-42'
            });
            const { container } = render(<ChatIaFoodit />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});
