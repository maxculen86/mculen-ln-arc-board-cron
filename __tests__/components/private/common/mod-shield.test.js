import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModShield from '../../../../components/private/common/mod-shield';
import SHIELD_DATA from '../../../../__mocks__/data/shields/shields';

// Mock de los componentes
jest.mock(
    '../../../../components/private/common/mod-headerSection',
    () => () => <div data-testid="mock-header-section">Header Section Mock</div>
);
jest.mock('../../../../components/private/common/com-shield', () => props => (
    <div data-testid="mock-com-shield">
        {props.nameshield} - {props.link} - {props.src}
    </div>
));
describe('Private - Common - ModShield =>', () => {
    describe('with empty data list or title', () => {
        it('should returns null', () => {
            const { queryByTestId } = render(<ModShield />);
            expect(queryByTestId('mock-header-section')).toBeNull();
            // Repite para los otros casos
        });
    });

    describe('with data list', () => {
        it('should render 3 ComShield components', () => {
            const { getAllByTestId } = render(<ModShield {...SHIELD_DATA} />);
            const shieldComponents = getAllByTestId('mock-com-shield');
            expect(shieldComponents.length).toBe(27);
        });

        it('snapshot', () => {
            const { asFragment } = render(<ModShield {...SHIELD_DATA} />);
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
