import React from 'react';
import { render } from '@testing-library/react';
import ArrowButton from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScroller/arrowButton';

describe('components - chains - LN10_Caja_Carrusel - components - mediaScroller - Arrow Button', () => {
    it('matches the snapshot', () => {
        const { asFragment } = render(<ArrowButton />);

        expect(asFragment()).toMatchSnapshot();
    });
});
