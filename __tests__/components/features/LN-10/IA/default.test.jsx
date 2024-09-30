import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import LnIa from '../../../../../components/features/LN-10/IA/default';
import { handleIaVisibility } from '../../../../../components/features/LN-10/IA/helpers';
import useIaData from '../../../../../components/features/LN-10/IA/hooks/useIaData';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('../../../../../components/features/LN-10/IA/helpers', () => ({
    handleIaVisibility: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN-10/IA/hooks/useIaData',
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock('../../../../../components/features/LN-10/IA/common/iaTools', () => ({
    IaTools: jest.fn(({ iaData, handleClose }) => <div>IaTools</div>)
}));

describe('features - LN-common - IA - default', () => {
    const mockGlobalContent = {};

    beforeEach(() => {
        useAppContext.mockReturnValue({ globalContent: mockGlobalContent });
        window.LN = {
            observable: {
                subscribe: jest.fn((event, callback) => {
                    if (event === 'showIa') {
                        callback({ show: true });
                    }
                }),
                unsubscribe: jest.fn()
            }
        };
    });

    it('does not render IaTools when visibility is false', () => {
        handleIaVisibility.mockReturnValue({
            isVisible: false,
            handleClose: jest.fn()
        });
        useIaData.mockReturnValue({
            iaData: {},
            shouldShowSummary: true,
            shouldShowGlossary: true
        });

        render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(screen.queryByText('IaTools')).toBeNull();
    });

    it('does not render IaTools when both summary and glossary are hidden', () => {
        handleIaVisibility.mockReturnValue({
            isVisible: true,
            handleClose: jest.fn()
        });
        useIaData.mockReturnValue({
            shouldShowSummary: false,
            shouldShowGlossary: false
        });

        render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(screen.queryByText('IaTools')).toBeNull();
    });

    it('renders IaTools when visibility is true and summary section is visible', () => {
        handleIaVisibility.mockReturnValue({
            isVisible: true,
            handleClose: jest.fn()
        });
        useIaData.mockReturnValue({
            iaData: {},
            shouldShowSummary: true,
            shouldShowGlossary: false
        });

        render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(screen.getByText('IaTools')).toBeInTheDocument();
    });

    it('renders IaTools when visibility is true and glossary section is visible', () => {
        handleIaVisibility.mockReturnValue({
            isVisible: true,
            handleClose: jest.fn()
        });
        useIaData.mockReturnValue({
            iaData: {},
            shouldShowSummary: false,
            shouldShowGlossary: true
        });

        render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(screen.getByText('IaTools')).toBeInTheDocument();
    });

    it('should match the snapshot when IaTools is rendered', () => {
        handleIaVisibility.mockReturnValue({
            isVisible: true,
            handleClose: jest.fn()
        });
        useIaData.mockReturnValue({
            iaData: {},
            shouldShowSummary: true,
            shouldShowGlossary: false
        });

        const { asFragment } = render(
            <LnIa customFields={{ hideSummary: false, hideGlossary: false }} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
