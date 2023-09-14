import React from 'react';
import { useContent } from 'fusion:content';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnexoRugbyWorldCup from '../../../../../components/features/LN-10/anexoRugby/default';
import mockRugbyData from './mocks/dataRugby.json';

describe('Components - features - LN10 - AnexoRugby', () => {
    test('Correct render test, snapshot', () => {
        useContent.mockImplementation(() => {
            return { data: mockRugbyData };
        });

        const { container } = render(<AnexoRugbyWorldCup />);
        expect(container).toMatchSnapshot();
    });

    test('Return empty when data is undefined', () => {
        useContent.mockImplementation(() => {
            return { data: undefined };
        });

        const { container } = render(<AnexoRugbyWorldCup />);

        expect(container).toBeEmptyDOMElement();
    });
});
