import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonSearch } from '../../../../../../../components/features/foodit-global/common/Header/components/ButtonSearch';
import { addEventToDataLayerV2 } from '../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../../components/features/private-global/common/iconSprite/IconSprite',
    () =>
        function MockIconSprite(props) {
            return <span>{props.name}</span>;
        }
);

jest.mock(
    '../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        addEventToDataLayerV2: jest.fn()
    })
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

describe('Voice search event tracking', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls addEventToDataLayerV2 with correct parameters when audio button is clicked', () => {
        const mockStartListening = jest.fn();
        const urlSearch = 'https://foodit.lanacion.com.ar/buscador/?query=';

        render(
            <ButtonSearch
                inputValue=""
                urlSearch={urlSearch}
                startListening={mockStartListening}
            />
        );

        const audioButton = screen.getByTitle('audio');
        fireEvent.click(audioButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            action: 'Busqueda',
            category: 'interaction',
            label: 'Busqueda_por_voz',
            event: 'e_linkclick'
        });
    });

    it('calls startListening before sending the event', () => {
        const callOrder = [];
        const mockStartListening = jest.fn(() =>
            callOrder.push('startListening')
        );
        const urlSearch = 'https://foodit.lanacion.com.ar/buscador/?query=';

        addEventToDataLayerV2.mockImplementation(() =>
            callOrder.push('addEvent')
        );

        render(
            <ButtonSearch
                inputValue=""
                urlSearch={urlSearch}
                startListening={mockStartListening}
            />
        );

        const audioButton = screen.getByTitle('audio');
        fireEvent.click(audioButton);

        expect(mockStartListening).toHaveBeenCalledTimes(1);
        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);

        expect(callOrder).toEqual(['startListening', 'addEvent']);
    });

    it('calls addEventToDataLayerV2 only once per click', () => {
        const mockStartListening = jest.fn();
        const urlSearch = 'https://foodit.lanacion.com.ar/buscador/?query=';

        render(
            <ButtonSearch
                inputValue=""
                urlSearch={urlSearch}
                startListening={mockStartListening}
            />
        );

        const audioButton = screen.getByTitle('audio');
        fireEvent.click(audioButton);

        expect(addEventToDataLayerV2).toHaveBeenCalledTimes(1);
    });

    it('does not call addEventToDataLayerV2 when inputValue has a value', () => {
        const mockStartListening = jest.fn();
        const urlSearch =
            'https://foodit.lanacion.com.ar/buscador/?query=pollo';

        render(
            <ButtonSearch
                inputValue="pollo"
                urlSearch={urlSearch}
                startListening={mockStartListening}
            />
        );

        const searchButton = screen.getByTitle('Buscar');
        fireEvent.click(searchButton);

        expect(addEventToDataLayerV2).not.toHaveBeenCalled();
        expect(mockStartListening).not.toHaveBeenCalled();
    });
});
