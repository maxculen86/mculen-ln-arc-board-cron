import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaScroller from '../../../../../../components/chains/LN10_Caja_Carrusel/components/mediaScroller/mediaScroller';

jest.mock('fusion:consumer', () => component => component);

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
}));

describe('components - chains - LN10_Caja_Carrusel - components - mediaScroller - MediaScroller', () => {
    it('matches the snapshot', () => {
        const roofData = {};
        const children = <div>Test Child</div>;

        const { asFragment } = render(
            <MediaScroller roofData={roofData}>{children}</MediaScroller>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
