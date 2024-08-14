import React from 'react';
import { render } from '@testing-library/react';
import { authorNota } from '../../../../components/features/LN-nota/autorNota';

jest.mock('fusion:consumer', () => Component => props => (
    <Component {...props} />
));
jest.mock('fusion:static', () => ({
    __esModule: true,
    default: ({ id, children }) => <div id={id}>{children}</div>
}));

jest.mock(
    '../../../../components/private/LN/nota/author/authorAndDate',
    () => ({
        __esModule: true,
        default: () => <div>Author And Date Component</div>
    })
);

describe('Components - Features -  LN-Nota - AutorNota', () => {
    test('Should render AuthorAndDate inside Static with the provided props', () => {
        const props = { id: 'test-id' };
        const { container } = render(<authorNota {...props} />);

        expect(container).toBeInTheDocument();
    });
});
