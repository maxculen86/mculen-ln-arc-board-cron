import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonSearch } from '../../../../../../../components/features/foodit-global/common/Header/components/ButtonSearch';

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        function MockIconSprite(props) {
            return <span>{props.name}</span>;
        }
);

it('renderiza el botón de audio cuando inputValue está vacío', () => {
    const urlSearch = 'https://foodit.lanacion.com.ar/buscador/?query=';

    render(<ButtonSearch inputValue="" urlSearch={urlSearch} />);

    const button = screen.getByTitle('audio');

    expect(button).toHaveAttribute('title', 'audio');

    expect(screen.getByText('audio')).toBeInTheDocument();
});

it('renderiza el botón de search con href cuando inputValue tiene valor', () => {
    const urlSearch = 'https://foodit.lanacion.com.ar/buscador/?query=pollo';

    render(<ButtonSearch inputValue="pollo" urlSearch={urlSearch} />);

    const button = screen.getByTitle('Buscar');

    expect(button).toHaveAttribute('title', 'Buscar');
    expect(button).toHaveAttribute('href', urlSearch);

    expect(screen.getByText('search')).toBeInTheDocument();
});

it('match snapshot if inputValue is empty', () => {
    const { container } = render(
        <ButtonSearch inputValue="" urlSearch="/buscador/?query=" />
    );
    expect(container).toMatchSnapshot();
});

it('match snapshot if inputValue has value', () => {
    const { container } = render(
        <ButtonSearch inputValue="pollo" urlSearch="/buscador/?query=pollo" />
    );
    expect(container).toMatchSnapshot();
});
