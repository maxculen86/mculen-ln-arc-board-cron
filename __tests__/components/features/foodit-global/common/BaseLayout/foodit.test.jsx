import React from 'react';
import { render } from '@testing-library/react';
import { useAppContext } from 'fusion:context';
import { useDrawer } from '@ln/common-ui-drawer';
import { getConfigByLayout } from '../../../../../../components/features/foodit-global/common/floatingGroupButton/helpers';
import BaseLayout from '../../../../../../components/features/foodit-global/common/BaseLayout/foodit';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('@ln/common-ui-drawer', () => ({
    useDrawer: jest.fn()
}));

jest.mock(
    '../../../../../../components/features/foodit-global/common/Header/foodit',
    () => jest.fn(() => <div>Header</div>)
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/Footer/foodit',
    () => jest.fn(() => <div>Footer</div>)
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/DrawerMyAccount/foodit',
    () => jest.fn(() => <div>DrawerMyAccount</div>)
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/Modals/SaveRecipe/foodit',
    () => jest.fn(() => <div>Modal</div>)
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/floatingGroupButton/foodit',
    () => jest.fn(() => <div>FloatingGroupButton</div>)
);
jest.mock(
    '../../../../../../components/features/ui/foodit/toastContainer/foodit',
    () => jest.fn(() => <div>ToastsContainer</div>)
);
jest.mock(
    '../../../../../../components/private/common/scriptManager/DataLayerInteracions',
    () => jest.fn(() => <div>DataLayerInteractions</div>)
);
jest.mock(
    '../../../../../../components/private/common/auth/AuthInitializer',
    () => jest.fn(({ children }) => <div>{children}</div>)
);
jest.mock(
    '../../../../../../components/features/foodit-global/common/floatingGroupButton/helpers',
    () => ({
        getConfigByLayout: jest.fn()
    })
);

describe('Components - Features - Foodit-global - Common -BaseLayout', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });

        useAppContext.mockReturnValue({
            layout: 'Foodit-ficha-nota',
            contextPath: '/test-path',
            deployment: jest.fn(),
            arcSite: 'site-test',
            siteProperties: {
                layoutsName: {
                    FooditRecipePaywall: 'Foodit-recipe-paywall',
                    FooditFichaNota: 'Foodit-ficha-nota'
                }
            }
        });

        useDrawer.mockReturnValue({
            toggleDrawer: jest.fn()
        });

        getConfigByLayout.mockReturnValue({
            someConfig: 'testConfig'
        });
    });

    it('should render the header, footer, modal, and other components', () => {
        const { getByText } = render(<BaseLayout>Test Children</BaseLayout>);

        expect(getByText('Header')).toBeInTheDocument();
        expect(getByText('Footer')).toBeInTheDocument();
        expect(getByText('DrawerMyAccount')).toBeInTheDocument();
        expect(getByText('Modal')).toBeInTheDocument();
        expect(getByText('ToastsContainer')).toBeInTheDocument();
        expect(getByText('FloatingGroupButton')).toBeInTheDocument();
        expect(getByText('DataLayerInteractions')).toBeInTheDocument();

        expect(getByText('Test Children')).toBeInTheDocument();
    });

    it('should apply the correct class to main based on the layout', () => {
        const { container } = render(<BaseLayout>Test Children</BaseLayout>);

        const mainElement = container.querySelector('main');
        expect(mainElement).toHaveClass('pb-64');
    });

    it('should not apply "pb-64" class when the layout is FooditRecipePaywall', () => {
        useAppContext.mockReturnValueOnce({
            layout: 'Foodit-recipe-paywall',
            contextPath: '/test-path',
            deployment: jest.fn(),
            arcSite: 'site-test',
            siteProperties: {
                layoutsName: {
                    FooditRecipePaywall: 'Foodit-recipe-paywall'
                }
            }
        });

        const { container } = render(<BaseLayout>Test Children</BaseLayout>);
        const mainElement = container.querySelector('main');

        expect(mainElement).not.toHaveClass('pb-64');
    });

    it('should pass the correct config to FloatingGroupButton', () => {
        const { getByText } = render(<BaseLayout>Test Children</BaseLayout>);

        expect(getConfigByLayout).toHaveBeenCalledWith('Foodit-ficha-nota', [
            expect.any(Function)
        ]);
        expect(getByText('FloatingGroupButton')).toBeInTheDocument();
    });
});
