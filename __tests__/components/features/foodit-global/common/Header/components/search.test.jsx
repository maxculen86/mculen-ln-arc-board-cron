import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '../../../../../../../components/features/foodit-global/common/Header/components/Search';
jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit-lanacion.com.ar'
}));

window.matchMedia =
    window.matchMedia ||
    function (query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        };
    };

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Header/_helpers.js',
    () => ({
        searchFood: jest.fn(() => ({ chat: false }))
    })
);

let mockTermicas = {};
jest.mock(
    '../../../../../../../components/features/foodit-global/common/Header/hooks/useNavigationData',
    () => ({ useNavigationData: () => ({ termicasData: mockTermicas }) })
);

let mockUserConfig = { isSubscribed: false, id: 'user-42' };
jest.mock(
    '../../../../../../../components/features/foodit-global/hooks/useGetUserConfig',
    () => ({ __esModule: true, default: () => mockUserConfig })
);

jest.mock(
    '../../../../../../../components/private/common/auth/helper/loginHelper',
    () => ({ getAuthTokens: async () => ({ accessToken: 'jwt-token' }) })
);

const { searchFood } = jest.requireMock(
    '../../../../../../../components/features/foodit-global/common/Header/_helpers.js'
);

beforeEach(() => {
    jest.clearAllMocks();
    mockTermicas = {};
    mockUserConfig = { isSubscribed: false, id: 'user-42' };
    delete window.location;
    window.location = { href: '' };
});

global.fetch = jest.fn();

describe('Components - features - foodit-global - common - header - components - Search', () => {
    it('renders without crashing', () => {
        const { getByPlaceholderText, getByTitle } = render(<Search />);

        const inputElement = getByPlaceholderText('Buscá o pregúntale a la IA');
        expect(inputElement).toBeInTheDocument();

        const buttonElement = getByTitle('audio');
        expect(buttonElement).toBeInTheDocument();
    });

    it('updates on change', () => {
        const { getByPlaceholderText } = render(<Search />);
        const inputElement = getByPlaceholderText('Buscá o pregúntale a la IA');

        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(inputElement.value).toBe('test');
    });
    it('pressing enter redirects to correct url', async () => {
        const { getByPlaceholderText } = render(<Search />);

        const inputElement = getByPlaceholderText('Buscá o pregúntale a la IA');

        delete window.location;
        window.location = { href: '' };

        fireEvent.change(inputElement, { target: { value: 'searching' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            const href = window.location.href;
            expect(href).toBe(
                'https://foodit-lanacion.com.ar/chat/?query=searching%20'
            );
        });
    });

    it('should match snapshot', () => {
        const { container } = render(<Search />);
        expect(container).toMatchSnapshot();
    });

    // La térmica apaga el chat, pero el buscador seguía consultando la API del
    // chatbot y derivando a una página que ya no tiene chat.
    describe('when the chat termica is on', () => {
        beforeEach(() => {
            mockTermicas = { hide_chat_ia_foodit: 'true' };
            mockUserConfig = { isSubscribed: true, id: 'user-42' };
            // `chat: true` a propósito: si la térmica no cortara antes, la
            // respuesta de la API mandaría al chat y el test lo delata.
            searchFood.mockResolvedValue({ chat: true });
        });

        const submitSearch = () => {
            const { getByPlaceholderText } = render(<Search />);
            const input = getByPlaceholderText('¿Qué querés cocinar hoy?');
            fireEvent.change(input, { target: { value: 'searching' } });
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        };

        it('should not call the chat API', async () => {
            submitSearch();

            await waitFor(() => expect(window.location.href).not.toBe(''));
            expect(searchFood).not.toHaveBeenCalled();
        });

        it('should redirect to the classic search', async () => {
            submitSearch();

            await waitFor(() =>
                expect(window.location.href).toBe(
                    'https://foodit-lanacion.com.ar/buscador/?query=searching%20'
                )
            );
        });
    });

    describe('when the chat API fails', () => {
        it('should fall back to the classic search instead of hanging', async () => {
            mockUserConfig = { isSubscribed: true, id: 'user-42' };
            searchFood.mockRejectedValue(new Error('502 del proxy'));
            jest.spyOn(console, 'error').mockImplementation(() => {});

            const { getByPlaceholderText } = render(<Search />);
            const input = getByPlaceholderText('Buscá o pregúntale a la IA');
            fireEvent.change(input, { target: { value: 'searching' } });
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

            await waitFor(() =>
                expect(window.location.href).toBe(
                    'https://foodit-lanacion.com.ar/buscador/?query=searching%20'
                )
            );

            console.error.mockRestore();
        });
    });
});
