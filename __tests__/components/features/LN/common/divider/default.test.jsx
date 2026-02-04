import React from 'react';
import Divider from '../../../../../../components/features/LN/common/divider/default';

jest.mock(
    '../../../../../../components/features/ui/ln/divider/default',
    () => ({
        __esModule: true,
        default: props => <div data-testid="divider-ui" {...props} />
    })
);

describe('Divider', () => {
    it('exposes arcType property', () => {
        expect(Divider.arcType).toBe('divider');
    });
});
