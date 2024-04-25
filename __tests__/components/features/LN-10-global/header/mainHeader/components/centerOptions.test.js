import React from 'react';
import Context from 'fusion:context';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { CenterOptions } from '../../../../../../../components/features/LN-10-global/header/mainHeader/components/centerOptions';
import { useHeaderContext } from '../../../../../../../components/features/LN-10-global/header/context';
import { logoCallback } from '../../../../../../../components/features/LN-10-global/header/mainHeader/_helper';

jest.mock(
    '../../../../../../../components/features/LN-10-global/header/mainHeader/_helper',
    () => {
        return {
            logoCallback: jest.fn()
        };
    }
);
jest.mock(
    '../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);
describe('components - features - LN-10-global - header - mainHeader - centerOptions', () => {
    useHeaderContext.mockImplementation(() => ({
        centerOptionsClassNames: 'logo-header flex jc-center'
    }));
    it('should render successfully', () => {
        const { baseElement } = render(<CenterOptions />);
        expect(baseElement).toBeInTheDocument();
    });
    it('should render LN Logo and execute logoCallBack successfully', () => {
        const { container } = render(<CenterOptions />);
        const logo = container.querySelector('.logo-header');

        fireEvent.click(logo);

        expect(logo).toBeInTheDocument();
        expect(logoCallback).toHaveBeenCalledTimes(1);
    });
    it('should render logo banners', () => {
        const { container } = render(<CenterOptions />);

        const banners = [
            '#logo_header_dsk',
            '#logo_header_dsk_sticky',
            '#logo_header_mob',
            '#logo_header_tab'
        ];

        banners.forEach(banner => {
            expect(container.querySelector(banner)).toBeInTheDocument();
        });
    });
});
