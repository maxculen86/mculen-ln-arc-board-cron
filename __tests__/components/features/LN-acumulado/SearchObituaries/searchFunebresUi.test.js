import React from 'react';
import { render } from '@testing-library/react';
import SearchFuneberesUI from '../../../../../components/features/LN-acumulado/SearchObituaries/componentes/SearchFunebresUI';

describe('SearchFuneberesUI', () => {
    const optionsMock = [
        {
            value: '1',
            label: 'Hoy'
        },
        {
            value: '2',
            label: 'Últimas 48 horas'
        },
        {
            value: '3',
            label: 'Última semana'
        },
        {
            value: '4',
            label: 'Todas las fechas'
        }
    ];

    const defaultSelected = { value: '1', label: 'Hoy' };

    const setup = (selectedOption = defaultSelected) => {
        return render(
            <SearchFuneberesUI
                data={optionsMock}
                selectedOption={selectedOption}
                handleSelectedOption={() => {}}
                values={{ keyword: '' }}
                onKeywordChange={() => {}}
            />
        );
    };

    it('should match the snapshot', () => {
        const { asFragment } = setup();
        expect(asFragment()).toMatchSnapshot();
    });
});
