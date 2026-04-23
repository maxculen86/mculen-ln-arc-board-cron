import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowTo from '../../../../../../../components/features/LN/DS-Body/components/howTo/default';

jest.mock(
    '../../../../../../../components/features/LN/common/howTo/default',
    () =>
        function MockHowToComponent({ number, title }) {
            return (
                <div
                    data-testid="how-to-component"
                    data-number={number}
                    data-title={title}
                />
            );
        }
);

jest.mock(
    '../../../../../../../components/features/LN/common/wrapperBody/default',
    () => ({
        WrapperBody: ({ children }) => (
            <div data-testid="wrapper-body">{children}</div>
        )
    })
);

const makeData = ({ step, title } = {}) => ({
    embed: { config: { step, title } }
});

describe('components - features - LN - DS-Body - components - howTo', () => {
    it('extracts number and title from data and passes them to the presentational component', () => {
        const { getByTestId } = render(
            <HowTo
                data={makeData({ step: 2, title: 'Preparar los ingredientes' })}
            />
        );

        const component = getByTestId('how-to-component');
        expect(component).toHaveAttribute('data-number', '2');
        expect(component).toHaveAttribute(
            'data-title',
            'Preparar los ingredientes'
        );
    });

    it('wraps the component in WrapperBody', () => {
        const { getByTestId } = render(
            <HowTo data={makeData({ step: 1, title: 'Paso uno' })} />
        );

        expect(getByTestId('wrapper-body')).toContainElement(
            getByTestId('how-to-component')
        );
    });

    it('has correct arcType', () => {
        expect(HowTo.arcType).toBe('custom-how-to');
    });
});
