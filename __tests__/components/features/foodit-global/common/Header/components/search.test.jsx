import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '../../../../../../../components/features/foodit-global/common/Header/components/Search';
jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit-lanacion.com.ar'
}));

jest.mock('@ln/utils', () => ({
    ...jest.requireActual('@ln/utils'),
    getTypeOfDevicev2: jest.fn()
}));

jest.mock(
    '../../../../../../../components/features/foodit-global/common/Header/_helpers.js',
    () => ({
        searchFood: () => ({ chat: false })
    })
);

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
});
