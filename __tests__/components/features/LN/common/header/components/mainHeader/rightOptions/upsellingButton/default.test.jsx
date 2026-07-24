import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UpsellingButton from '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/upsellingButton/default';
import { useHeaderContext } from '../../../../../../../../../../components/features/LN/common/header/context';
import useTermica from '../../../../../../../../../../components/private/common/hooks/useTermica';
import handleCookie from '../../../../../../../../../../components/private/LN/common/utils/handleCookie';
import { isMultiproductGaComboType } from '../../../../../../../../../../components/private/LN/common/utils/upsellingHelper';
import { getTermicaValues } from '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/helpers';

jest.mock('fusion:environment', () => ({
    MY_ACCOUNT_URL: 'https://mi.cuenta.test'
}));

jest.mock(
    '../../../../../../../../../../components/features/ui/ln/button/default',
    () =>
        function MockButton({ color, children, asChild, ...props }) {
            return (
                <button type="button" data-color={color} {...props}>
                    {children}
                </button>
            );
        }
);

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/upsellingButton/UpsellingTooltip',
    () =>
        function MockUpsellingTooltip({ children }) {
            return <>{children}</>;
        }
);

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/context',
    () => ({
        useHeaderContext: jest.fn()
    })
);

jest.mock(
    '../../../../../../../../../../components/private/common/hooks/useTermica',
    () => jest.fn()
);

jest.mock(
    '../../../../../../../../../../components/private/LN/common/utils/handleCookie',
    () => jest.fn()
);

jest.mock(
    '../../../../../../../../../../components/private/LN/common/utils/upsellingHelper',
    () => ({ isMultiproductGaComboType: jest.fn() })
);

jest.mock(
    '../../../../../../../../../../components/private/LN/common/utils/addEventToDataLayer',
    () => ({ addEventToDataLayerV2: jest.fn() })
);

jest.mock(
    '../../../../../../../../../../components/features/LN/common/header/components/mainHeader/rightOptions/helpers',
    () => ({
        getTermicaValues: jest.fn(),
        termicaValuesUpselling: [],
        upsellingLabels: { 'ga-combo2': 'upselling_duo' }
    })
);

describe('UpsellingButton', () => {
    const setup = ({
        userType = 'subscribed',
        termica = true,
        cookie = 'ga-combo2,algo',
        isMultiproduct = false
    } = {}) => {
        useHeaderContext.mockReturnValue({ userType });
        useTermica.mockReturnValue(termica);
        handleCookie.mockReturnValue({ getCookie: () => cookie });
        isMultiproductGaComboType.mockReturnValue(isMultiproduct);
        getTermicaValues.mockReturnValue({
            duo_button_text: 'Pasate a DUO',
            triple_button_text: 'Pasate a TRIPLE',
            black_button_text: 'Pasate a BLACK',
            upselling_tooltip_text: ''
        });
        return render(<UpsellingButton isHome />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when the user is a subscriber with a valid combo', () => {
        it('should render the upselling button', () => {
            setup();

            expect(screen.getByText('Pasate a DUO')).toBeInTheDocument();
        });

        it('should use color "subscription" on the button', () => {
            setup();

            expect(screen.getByRole('button')).toHaveAttribute(
                'data-color',
                'subscription'
            );
        });
    });

    describe('when the button should not be shown', () => {
        it('should render nothing when the user is not a subscriber', () => {
            const { container } = setup({ userType: 'anonymous' });

            expect(container).toBeEmptyDOMElement();
        });

        it('should render nothing when the upselling termica is inactive', () => {
            const { container } = setup({ termica: false });

            expect(container).toBeEmptyDOMElement();
        });

        it('should render nothing for a multiproduct user', () => {
            const { container } = setup({ isMultiproduct: true });

            expect(container).toBeEmptyDOMElement();
        });
    });

    describe('snapshots', () => {
        it('should match snapshot for a subscriber with a valid combo', () => {
            const { asFragment } = setup();

            expect(asFragment()).toMatchSnapshot();
        });

        it('should match snapshot when nothing is rendered', () => {
            const { asFragment } = setup({ userType: 'anonymous' });

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
