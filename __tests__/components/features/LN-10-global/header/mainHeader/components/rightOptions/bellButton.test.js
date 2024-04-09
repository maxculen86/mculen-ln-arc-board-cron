import React from 'react';
import '@testing-library/jest-dom';
import { BellButton } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/bellButton';
import { render } from '@testing-library/react';

describe('components - features - LN-10-global - header - mainHeader - rightOptions - BellButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BellButton />);
        expect(baseElement).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<BellButton />);
        expect(container).toMatchSnapshot();
    });
});
