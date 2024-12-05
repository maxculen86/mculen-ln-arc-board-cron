import React from 'react';
import { render } from '@testing-library/react';
import { InitCtrlGrp } from '@ln/segmentacion-control-group';
import InitControlGroup from '../../../../components/layouts/helpers/initCtrlGrp';

jest.mock('@ln/segmentacion-control-group', () => ({
    InitCtrlGrp: jest.fn()
}));

jest.mock('fusion:environment', () => ({
    API_V3_GROUP: 'https://api.example.com',
    DATADOG_CONFIG: {
        'la-nacion-ar': {
            clientTokenLogs: 'dummy-token'
        }
    }
}));

const TestComponent = () => {
    InitControlGroup();
    return null;
};

describe('InitControlGroup', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize the control group on mount', () => {
        render(<TestComponent />);

        expect(InitCtrlGrp).toHaveBeenCalledTimes(1);
        expect(InitCtrlGrp).toHaveBeenCalledWith(
            'https://api.example.com',
            'dummy-token',
            'controlGroupV3',
            null,
            null
        );
    });
});
