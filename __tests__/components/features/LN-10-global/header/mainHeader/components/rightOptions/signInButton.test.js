import React from 'react';
import '@testing-library/jest-dom';
import { SignInButton } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/signInButton';
import { render } from '@testing-library/react';
import { useHeaderContext } from '../../../../../../../../components/features/LN-10-global/header/context';
jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);

describe('components - features - LN-10-global - header - mainHeader - rightOptions - SignInButton', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    it('should render successfully when user is not logged in', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'unlogged'
        }));
        const { baseElement } = render(<SignInButton />);
        expect(baseElement).toBeInTheDocument();
    });
    it('should render a fragment when user is logged in', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged'
        }));
        const { container } = render(<SignInButton />);
        expect(container).toBeEmptyDOMElement();
    });
    it('should match snapshot', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'unlogged'
        }));
        const { container } = render(<SignInButton />);
        expect(container).toMatchSnapshot();
    });
});
