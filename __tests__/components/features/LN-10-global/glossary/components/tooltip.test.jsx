import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from '../../../../../../components/features/LN-10-global/glossary/components/tooltip';
import { useTooltip } from '../../../../../../components/features/LN-10-global/glossary/hooks/useTooltip';
import arrayData from '../../../../../../__mocks__/data/glossary/arrayWords.json';
import capitalizeFirstLetter from '../../../../../../components/private/common/utils/capitalizeFirstLetter';

jest.mock(
    '../../../../../../components/features/LN-10-global/glossary/hooks/useTooltip',
    () => ({
        useTooltip: jest.fn()
    })
);

describe('features - LN-10-GLOBAL - glossary - components- Tooltip', () => {
    let container;
    const defaultTooltipData = {
        tooltipRef: null,
        show: true,
        key: arrayData[0].key,
        value: arrayData[0].value,
        tooltipLocation: { left: 150, top: 500 }
    };
    useTooltip.mockReturnValue({
        ...defaultTooltipData
    });
    beforeEach(() => {
        ({ container } = render(<Tooltip glossaryData={arrayData} />));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render attributes correctly', () => {
        expect(container.firstChild).toHaveAttribute('role', 'tooltip');
        expect(container.firstChild).toHaveAttribute(
            'style',
            'left: 150px; top: 500px; z-index: 10000;'
        );
    });
    it('should render key and value correctly', () => {
        expect(container.firstChild).toHaveTextContent(
            capitalizeFirstLetter(arrayData[0].key)
        );
        expect(container.firstChild).toHaveTextContent(arrayData[0].value);
    });
    useTooltip.mockReturnValue({
        ...defaultTooltipData,
        show: false
    });
    it('should render with className none when show is false', () => {
        expect(container.firstChild).toHaveClass('none');
    });
    it('should match snapshot', () => {
        expect(container).toMatchSnapshot();
    });
});
