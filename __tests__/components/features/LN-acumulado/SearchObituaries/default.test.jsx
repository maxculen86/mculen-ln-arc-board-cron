import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchObituaries from '../../../../../components/features/LN-acumulado/SearchObituaries/default';
import { getSelectOptionClass } from '../../../../../components/features/LN-acumulado/SearchObituaries/_helpers';

jest.mock(
    '../../../../../components/features/LN-common/hooks/useInputListener',
    () => () => ({
        values: { keyword: '' },
        onChange: jest.fn()
    })
);
jest.mock(
    '../../../../../components/features/LN-common/hooks/useSelectListener',
    () => () => ({
        selectValue: { label: 'Hoy', value: '24' },
        onSelectChange: jest.fn()
    })
);

jest.mock(
    '../../../../../components/features/LN-acumulado/SearchObituaries/_helpers',
    () => ({
        optionsTime: [
            { label: 'Hoy', value: '24' },
            { label: 'Últimas 48 horas', value: '48' },
            { label: 'Última semana', value: '168' },
            { label: 'Todas las fechas', value: 'all' }
        ],
        getSelectOptionClass: jest.fn(({ selectedValue, optionValue }) =>
            selectedValue === optionValue ? 'text-14 text-blue-500' : 'text-14'
        )
    })
);

describe('Components - features - LN-acumulado - SearchObituaries - default', () => {
    it('should render correctly and match snapshot', () => {
        const { asFragment } = render(<SearchObituaries />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should call getSelectOptionClass with the correct parameters', () => {
        render(<SearchObituaries />);
        expect(getSelectOptionClass).toHaveBeenCalledWith({
            selectedValue: '24',
            optionValue: '24'
        });
    });
});
