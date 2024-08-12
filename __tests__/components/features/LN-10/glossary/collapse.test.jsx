import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Collapse } from '../../../../../components/features/LN-10/glossary/collapse';
import { useDisclosure } from '@ln/hooks';
import { handleToggleCollapse } from '../../../../../components/features/LN-10/glossary/helpers';
import capitalizeFirstLetter from '../../../../../components/private/common/utils/capitalizeFirstLetter';
import arrayData from '../../../../../__mocks__/data/glossary/arrayWords.json';

jest.mock('@ln/hooks', () => ({
    useDisclosure: jest.fn()
}));

jest.mock('../../../../../components/features/LN-10/glossary/helpers', () => ({
    handleToggleCollapse: jest.fn()
}));

describe('features - LN-10 - glossary - Collapse', () => {
    const useDisclosureMock = {
        onOpen: jest.fn(),
        onClose: jest.fn(),
        isOpen: false
    };
    useDisclosure.mockReturnValue({
        ...useDisclosureMock
    });
    it('should render presentational attributes correctly when is open is false', () => {
        const { getByTitle, getByTestId } = render(
            <Collapse glossaryData={arrayData} />
        );
        const collapseBody = getByTestId('collpase-glossary-body');
        expect(collapseBody).toHaveAttribute('data-collapsed', 'false');
        expect(collapseBody.firstChild).toHaveAttribute(
            'data-difumination',
            'false'
        );
        expect(getByTitle('Ver menos')).toBeInTheDocument();
    });
    it('should render presentational attributes correctly when is open is true', () => {
        useDisclosure.mockReturnValue({
            ...useDisclosureMock,
            isOpen: true
        });
        const { getByTitle, getByTestId } = render(
            <Collapse glossaryData={arrayData} />
        );
        const collapseBody = getByTestId('collpase-glossary-body');
        expect(collapseBody).toHaveAttribute('data-collapsed', 'true');
        expect(collapseBody.firstChild).toHaveAttribute(
            'data-difumination',
            'true'
        );
        expect(getByTitle('Ver más')).toBeInTheDocument();
    });
    it('should render title, key and value correcly', () => {
        const { getByText } = render(<Collapse glossaryData={arrayData} />);

        expect(getByText('Glosario')).toBeInTheDocument();

        arrayData.forEach(element => {
            expect(
                getByText(capitalizeFirstLetter(element.key))
            ).toBeInTheDocument();
        });

        arrayData.forEach(element => {
            expect(getByText(element.value)).toBeInTheDocument();
        });
    });
    it('should call onToggle when the Collapse component is clicked', () => {
        const { getByTestId } = render(<Collapse glossaryData={arrayData} />);

        const collapseComponent = getByTestId('collapse-glossary');
        fireEvent.click(collapseComponent);

        expect(handleToggleCollapse).toHaveBeenCalled();
    });

    it('should match snapshot', () => {
        const { container } = render(<Collapse glossaryData={arrayData} />);
        expect(container).toMatchSnapshot();
    });
});
