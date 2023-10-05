import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CryptoCarrousel from '../../../../components/features/LN-acumulado/CrypoCarrousel';

describe('Componentes - features - LN-Acumulado - CryptoCarrouse', () => {
    it('Should render live coin watch script', () => {
        const { container } = render(<CryptoCarrousel id={'randomId'} />);
        expect(container).toMatchSnapshot();
    });
});
