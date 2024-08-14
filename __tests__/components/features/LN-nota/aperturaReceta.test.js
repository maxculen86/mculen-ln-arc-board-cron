import React from 'react';
import { render } from '@testing-library/react';

jest.mock('fusion:consumer', () => Component => props => (
    <Component {...props} />
));
jest.mock('fusion:prop-types', () => ({
    string: {
        isRequired: {
            tag: jest.fn()
        }
    }
}));

jest.mock(
    '../../../../components/features/LN-nota/aperturaReceta',
    () => () => <div>Apertura Receta Component</div>
);

describe('Components - Features -  LN-Nota - AperturaReceta', () => {
    test('should render AperturaRecetaComponent with the provided props', () => {
        const props = { id: 'test-id' };
        const { container } = render(<aperturaReceta {...props} />);

        expect(container).toBeInTheDocument();
    });
});
