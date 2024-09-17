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
jest.mock('../../../../components/private/LN/nota/bajada', () => () => (
    <div>Bajada Nota Component</div>
));
jest.mock(
    '../../../../components/private/common/containerValidation',
    () => ({ children }) => <div>ContainerValidation {children}</div>
);

jest.mock(
    '../../../../components/private/common/utils/subtypes/subtypeHelper',
    () => ({
        VIDEO: 'video'
    })
);

describe('Components - Features -  LN-Nota - bajadaNota', () => {
    test('should render BajadaNota with the provided props', () => {
        const props = {
            id: 'test-id',
            globalContent: {},
            layout: 'layout-class'
        };
        const { container } = render(<bajadaNota {...props} />);

        expect(container).toBeInTheDocument();
    });

    test('should not render ContainerValidation or BadgeUsertype when content_code is not "closed"', () => {
        const props = {
            id: 'test-id',
            globalContent: {
                content_restrictions: { content_code: 'abierta' },
                subtype: 'video'
            },
            layout: 'layout-class'
        };
        const { queryByText } = render(<bajadaNota {...props} />);
        expect(queryByText('ContainerValidation')).toBeNull();
        expect(queryByText('BadgeUsertype')).toBeNull();
    });
});
