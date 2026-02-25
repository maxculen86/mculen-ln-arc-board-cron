import React from 'react';
import '@testing-library/jest-dom';
import { termicaValuesUpselling } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/_helper';
import { getTermicaValues } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/_helper';
import { UpsellingButton } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/upsellingButton';
import { render, fireEvent } from '@testing-library/react';
import { useHeaderContext } from '../../../../../../../../components/features/LN-10-global/header/context';
import useTermica from '../../../../../../../../components/private/common/hooks/useTermica';
import handleCookie from '../../../../../../../../components/private/LN/common/utils/handleCookie';
import { addEventToDataLayerV2 } from '../../../../../../../../components/private/LN/common/utils/addEventToDataLayer';

jest.mock(
    '../../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({
        __esModule: true,
        addEventToDataLayerV2: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../components/private/common/hooks/useTermica',
    () => jest.fn()
);

jest.mock(
    '../../../../../../../../components/features/LN-10-global/header/context',
    () => {
        return {
            useHeaderContext: jest.fn()
        };
    }
);
jest.mock(
    '../../../../../../../../components/private/LN/common/utils/handleCookie',
    () =>
        jest.fn(() => ({
            getCookie: jest.fn()
        }))
);

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(() => ({
        state: {
            siteService: {
                termicas: [
                    { key: 'black_button_text', value: 'black button text' },
                    {
                        key: 'class_upselling_tooltip',
                        value: 'class upselling --tooltip'
                    },
                    { key: 'duo_button_text', value: 'duo button text' },
                    { key: 'triple_button_text', value: 'triple button text' },
                    {
                        key: 'upselling_tooltip_text',
                        value: 'upselling tooltip text'
                    }
                ]
            }
        }
    }))
}));

describe('components - features - LN-10-global - header - mainHeader - rightOptions - UpsellingButton', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render a fragment when termicaUpselling is falsy', () => {
        useTermica.mockImplementationOnce(() => false);
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'logged'
        }));
        handleCookie.mockReturnValue({ getCookie: jest.fn(() => 'ga-combo2') });
        const { container } = render(<UpsellingButton />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render a fragment when userType is not subscribe', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementationOnce(() => ({
            userType: 'logged'
        }));
        const { container } = render(<UpsellingButton />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render a fragment when not match the cookies', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        handleCookie.mockReturnValue({
            getCookie: jest.fn(() => 'ga-fakeCookie')
        });
        const { container } = render(<UpsellingButton />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render a button with promotion text when match cookie "ga-combo2" - duo_button_text', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        handleCookie.mockReturnValue({
            getCookie: jest.fn(() => 'ga-combo2')
        });
        const { duo_button_text } = getTermicaValues(termicaValuesUpselling);
        const { getByText } = render(<UpsellingButton />);

        const upsellingButtonText = getByText(duo_button_text);

        expect(upsellingButtonText).toBeInTheDocument();
    });

    it('should render a button with promotion text when match cookie "ga-comboDuo" - triple_button_text', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        handleCookie.mockReturnValue({
            getCookie: jest.fn(() => 'ga-comboDuo')
        });
        const { triple_button_text } = getTermicaValues(termicaValuesUpselling);
        const { getByText } = render(<UpsellingButton />);

        const upsellingButtonText = getByText(triple_button_text);

        expect(upsellingButtonText).toBeInTheDocument();
    });

    it('should render a button with promotion text when match cookie "ga-comboTriple" - black_button_text', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        handleCookie.mockReturnValue({
            getCookie: jest.fn(() => 'ga-comboTriple')
        });
        const { black_button_text } = getTermicaValues(termicaValuesUpselling);
        const { getByText } = render(<UpsellingButton />);

        const upsellingButtonText = getByText(black_button_text);

        expect(upsellingButtonText).toBeInTheDocument();
    });

    it('should call addEventToDataLayer function when the button is clicked', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        handleCookie.mockReturnValue({
            getCookie: jest.fn(() => 'ga-combo2')
        });
        const { duo_button_text } = getTermicaValues(termicaValuesUpselling);
        const { getByText } = render(<UpsellingButton />);

        const button = getByText(duo_button_text);
        fireEvent.click(button);

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            event: 'e_linkclick',
            label: 'upselling_duo',
            category: 'home_ln10',
            action: 'header_logo'
        });
    });
});
