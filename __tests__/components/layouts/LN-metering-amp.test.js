import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LNMeteringAmp from '../../../components/layouts/LN-metering-amp';

jest.mock('fusion:consumer', () => Component => {
    return function(props) {
        return <Component {...props} />;
    };
});

describe('layout LN-meteting-amp', () => {
    const props = {
        queryParams: {
            id: '/espectaculos/luz-camara-accion-nid574/'
        },
        params: ['comun', 'BL4RTKROKZFUXKO5IJZ25PYG2I']
    };

    it('should return meteringAMP script', () => {
        const { container } = render(<LNMeteringAmp globalContent={props} />);
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should return empty frame', () => {
        const { container } = render(<LNMeteringAmp />);
        expect(container.innerHTML).toEqual('');
    });
});
