import { getSearchTerm } from '../../../../../components/layouts/Foodit-chat-ia/_children/getSearchTerm';

const assistantMessage = message => ({
    success: true,
    message_type: 'input',
    error: null,
    data: {
        message: {
            query: '',
            answer: 'Una respuesta.',
            follow_up_query: null,
            sources: [],
            ...message
        },
        session_id: 'foodit-1',
        chat_count: 1,
        max_reached: false,
        session_status: 'active'
    }
});

const userMessage = content => ({ message_type: 'output', content });

describe('getSearchTerm', () => {
    describe('keywords', () => {
        it('should join the first two keywords', () => {
            const messages = [
                assistantMessage({
                    keywords: [
                        'menu semanal',
                        'batch cooking',
                        'planificacion',
                        'nutricion'
                    ]
                })
            ];

            expect(getSearchTerm(messages)).toBe(
                'menu semanal / batch cooking'
            );
        });

        it('should use the only keyword when the backend sends one', () => {
            const messages = [assistantMessage({ keywords: ['chocotorta'] })];

            expect(getSearchTerm(messages)).toBe('chocotorta');
        });

        it('should ignore empty keywords', () => {
            const messages = [
                assistantMessage({ keywords: ['  ', 'postres', 'flan'] })
            ];

            expect(getSearchTerm(messages)).toBe('postres / flan');
        });

        it('should trim the keywords it uses', () => {
            const messages = [assistantMessage({ keywords: ['  postres  '] })];

            expect(getSearchTerm(messages)).toBe('postres');
        });
    });

    describe('fallback to query', () => {
        it('should use the query when there are no keywords', () => {
            const messages = [assistantMessage({ query: 'tengo pollo' })];

            expect(getSearchTerm(messages)).toBe('tengo pollo');
        });

        it('should use the query when keywords is an empty array', () => {
            const messages = [
                assistantMessage({ query: 'tengo pollo', keywords: [] })
            ];

            expect(getSearchTerm(messages)).toBe('tengo pollo');
        });

        it('should use the query when keywords is not an array', () => {
            const messages = [
                assistantMessage({ query: 'tengo pollo', keywords: 'pollo' })
            ];

            expect(getSearchTerm(messages)).toBe('tengo pollo');
        });

        it('should fall back to an earlier answer when the last one has no term', () => {
            const messages = [
                assistantMessage({ keywords: ['postres'] }),
                assistantMessage({})
            ];

            expect(getSearchTerm(messages)).toBe('postres');
        });
    });

    describe('message selection', () => {
        it('should take the most recent answer', () => {
            const messages = [
                assistantMessage({ keywords: ['pastelería'] }),
                assistantMessage({ keywords: ['chocotorta'] })
            ];

            expect(getSearchTerm(messages)).toBe('chocotorta');
        });

        it('should ignore user messages', () => {
            const messages = [
                assistantMessage({ keywords: ['postres'] }),
                userMessage('dale')
            ];

            expect(getSearchTerm(messages)).toBe('postres');
        });
    });

    describe('when there is nothing to search', () => {
        it('should return an empty string without messages', () => {
            expect(getSearchTerm([])).toBe('');
        });

        it('should return an empty string when called with no arguments', () => {
            expect(getSearchTerm()).toBe('');
        });

        it('should not crash when the response is outside the contract', () => {
            const messages = [{ message_type: 'input', success: false }];

            expect(getSearchTerm(messages)).toBe('');
        });
    });
});
