import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Search } from '../../../../../../../components/features/foodit-global/common/Header/components/Search';

jest.mock('fusion:environment', () => ({
    SITE_FOODIT: 'https://foodit-lanacion.com.ar'
}));
describe('Components - features - foodit-global - common - header - components - Search', () => {
    it('renders without crashing', () => {
        const { getByPlaceholderText, getByTitle } = render(<Search />);

        const inputElement = getByPlaceholderText('¿Qué querés cocinar hoy?');
        expect(inputElement).toBeInTheDocument();

        const buttonElement = getByTitle('Buscar');
        expect(buttonElement).toBeInTheDocument();
    });

    it('updates on change', () => {
        const { getByPlaceholderText } = render(<Search />);
        const inputElement = getByPlaceholderText('¿Qué querés cocinar hoy?');

        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(inputElement.value).toBe('test');
    });
    it('pressing enter redirects to correct url', () => {
        const { getByPlaceholderText } = render(<Search />);

        const inputElement = getByPlaceholderText('¿Qué querés cocinar hoy?');

        delete window.location;
        window.location = { href: '' };

        fireEvent.change(inputElement, { target: { value: 'searching' } });
        fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

        expect(window.location.href).toBe(
            'https://foodit-lanacion.com.ar/buscador/?query=searching'
        );
    });
    it('button "Buscar" as Ancle should be a correctly URL', () => {
        const { getByPlaceholderText, getByTitle } = render(<Search />);

        const inputElement = getByPlaceholderText('¿Qué querés cocinar hoy?');
        const buttonElementAsAncle = getByTitle('Buscar');

        fireEvent.change(inputElement, { target: { value: 'searching' } });

        expect(buttonElementAsAncle).toHaveAttribute(
            'href',
            'https://foodit-lanacion.com.ar/buscador/?query=searching'
        );
    });

    it('should match snapshot', () => {
        const { container } = render(<Search />);
        expect(container).toMatchSnapshot();
    });
});
