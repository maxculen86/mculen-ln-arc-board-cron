import React from 'react';
import { render } from '@testing-library/react';
import CardsBadge from '../Badge';

jest.mock(
    '../../../../../features/private-global/common/iconSprite/IconSprite',
    () =>
        function MockIconSprite() {
            return <span data-testid="mock-icon" />;
        }
);
jest.mock(
    '../../../../../private/common/com-logo',
    () =>
        function MockComLogo({ logoName }) {
            return <div data-testid="com-logo">{logoName}</div>;
        }
);
jest.mock('../styles', () => ({
    wrapperVariants: () => 'mock-wrapper-class'
}));

describe('CardsBadge', () => {
    it('should render logo when logoData exists but badge is null', () => {
        const logoData = {
            logoName: 'lnmas',
            path: '/a-fondo'
        };
        const { getByTestId } = render(
            <CardsBadge
                badge={null}
                badgeText=""
                isSubscriber={false}
                logoData={logoData}
            />
        );
        expect(getByTestId('com-logo')).toBeTruthy();
    });

    it('should return null when both badge and logoData are absent', () => {
        const { container } = render(
            <CardsBadge
                badge={null}
                badgeText=""
                isSubscriber={false}
                logoData={null}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render both logo and badge when both exist', () => {
        const logoData = {
            logoName: 'propiedades',
            path: '/propiedades/'
        };
        const badge = { text: 'EXCLUSIVO' };
        const { getByTestId, getByText } = render(
            <CardsBadge
                badge={badge}
                badgeText="EXCLUSIVO"
                isSubscriber={false}
                logoData={logoData}
            />
        );
        expect(getByTestId('com-logo')).toBeTruthy();
        expect(getByText('EXCLUSIVO')).toBeTruthy();
    });

    it('should render badge without logo when only badge exists', () => {
        const badge = { text: 'BREAKING' };
        const { getByText } = render(
            <CardsBadge
                badge={badge}
                badgeText="BREAKING"
                isSubscriber={false}
                logoData={null}
            />
        );
        expect(getByText('BREAKING')).toBeTruthy();
    });
});
