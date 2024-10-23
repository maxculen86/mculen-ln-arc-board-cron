import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../../../../components/private/common/ErrorBoundary';
import logger from '../../../../components/private/common/utils/logger';

jest.mock('../../../../components/private/common/utils/logger', () => ({
    push: jest.fn()
}));

describe('ErrorBoundary', () => {
    it('should catch errors and update state correctly', () => {
        const consoleErrorMock = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const ThrowError = () => {
            throw new Error('Test error');
        };

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );

        expect(logger.push).toHaveBeenCalledWith(expect.any(Error), {
            source: 'Error Boundary - Article Feature LN 10'
        });

        expect(consoleErrorMock).toHaveBeenCalledWith(
            'LN ErrorBoundary',
            expect.objectContaining({
                error: expect.any(Error),
                errorInfo: expect.any(Object)
            })
        );

        consoleErrorMock.mockRestore();
    });
});
