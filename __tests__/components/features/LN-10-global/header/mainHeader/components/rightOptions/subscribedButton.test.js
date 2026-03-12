import React, { useContext } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { getTermicaValues } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/_helper';
import { useHeaderContext } from '../../../../../../../../components/features/LN-10-global/header/context';
import { SubscribeButton } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/subscribeButton';
import { termicaValuesSubscribe } from '../../../../../../../../components/features/LN-10-global/header/mainHeader/components/rightOptions/_helper';
import useTermica from '../../../../../../../../components/private/common/hooks/useTermica';
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

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn()
}));

describe('components - features - LN-10-global - header - mainHeader - rightOptions - BellButton', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render a fragment when the userType is "subscribed"', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'subscribed'
        }));
        const { container } = render(<SubscribeButton />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render a button when the userType is "logged" or "unlogged"', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'unlogged'
        }));
        const { container } = render(<SubscribeButton />);
        expect(container).toBeInTheDocument();
    });

    it('should render a Tooltip component when the termicaSubscribe is true, and fields: "tooltip_text", "class_tooltip" are provided by siteService', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'unlogged',
            isHome: true
        }));

        useContext.mockReturnValue({
            state: {
                siteService: {
                    termicas: [
                        { key: 'tooltip_text', value: 'TooltipText' },
                        { key: 'class_tooltip', value: 'TooltipClass' }
                    ]
                }
            }
        });

        const { getByText } = render(<SubscribeButton />);

        const { tooltip_text, class_tooltip } = getTermicaValues(
            termicaValuesSubscribe
        );
        const tooltip = getByText(tooltip_text);
        expect(tooltip.parentNode).toHaveClass(class_tooltip);
    });

    it('should not render a Tooltip component when the termicaSubscribe is false and prop isHome is false', () => {
        useTermica.mockImplementation(() => false);
        useHeaderContext.mockImplementation(() => ({
            userType: 'unlogged',
            isHome: false
        }));

        useContext.mockReturnValue({
            state: {
                siteService: {
                    termicas: [
                        { key: 'tooltip_text', value: 'TooltipText' },
                        { key: 'class_tooltip', value: 'TooltipClass' }
                    ]
                }
            }
        });

        const { queryByText } = render(<SubscribeButton />);

        const { tooltip_text } = getTermicaValues(termicaValuesSubscribe);
        const tooltip = queryByText(tooltip_text);

        expect(tooltip).toBeNull();
    });

    it('should render a fallback <span> when termicaSubscribe is true, and the field "button_text" provided by siteService is empty', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged'
        }));

        useContext.mockReturnValue({
            state: {
                siteService: {
                    termicas: [
                        { key: 'button_text', value: '' },
                        { key: 'sticky_button_text', value: 'StickyButtonText' }
                    ]
                }
            }
        });

        const { getByText } = render(<SubscribeButton />);
        const fallbackText = getByText('Suscribite');
        expect(fallbackText).toBeInTheDocument();
    });

    it('should render a fallback <span>Suscribite</span> when termicaSubscribe is true, and the field "sticky_button_text" provided by siteService is empty', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged'
        }));

        useContext.mockReturnValue({
            state: {
                siteService: {
                    termicas: [
                        { key: 'button_text', value: 'ButtonText' },
                        { key: 'sticky_button_text', value: '' }
                    ]
                }
            }
        });

        const { getByText } = render(<SubscribeButton />);
        const fallbackText = getByText('Suscribite');
        expect(fallbackText).toBeInTheDocument();
    });
    it('should render a <span>{sticky_button_text}<span> when termicaSubscribe is true, the field "sticky_button_text" are provided by siteService, sticky is true', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged',
            sticky: true
        }));

        useContext.mockReturnValue({
            state: {
                siteService: {
                    termicas: [
                        { key: 'button_text', value: 'ButtonText' },
                        { key: 'sticky_button_text', value: 'StickyButtonText' }
                    ]
                }
            }
        });

        const { getByText } = render(<SubscribeButton />);
        const buttonText = getByText('StickyButtonText');
        expect(buttonText).toBeInTheDocument();
    });

    it('should render a <span>{button_text}<span> when termicaSubscribe is true, the field "button_text" are provided by siteService, sticky is false and isHome true', () => {
        useTermica.mockImplementation(() => true);
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged',
            sticky: false,
            isHome: true
        }));

        const { getByText } = render(<SubscribeButton />);
        const buttonText = getByText('ButtonText');
        expect(buttonText).toBeInTheDocument();
    });

    it('should match snapshot', () => {
        useHeaderContext.mockImplementation(() => ({
            userType: 'logged'
        }));
        const { container } = render(<SubscribeButton />);
        expect(container).toMatchSnapshot();
    });

    it('should push correct event data to dataLayer', () => {
        render(<SubscribeButton />);

        fireEvent.click(document.getElementById('btnsuscribite'));

        expect(addEventToDataLayerV2).toHaveBeenCalledWith({
            category: 'home_ln10',
            label: 'suscribite',
            action: 'header_logo',
            event: 'e_linkclick'
        });
    });
});
