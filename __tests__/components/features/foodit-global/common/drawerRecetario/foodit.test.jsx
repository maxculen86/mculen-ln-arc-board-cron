import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DrawerRecetario from '../../../../../../components/features/foodit-global/common/drawerRecetario/foodit';

describe('DrawerRecetario component', () => {
    const summarListMock = [
        { id: 'Todas', label: 'Todas (3)', quantity: 3 },
        { id: 'Lunes', label: 'Lunes (2)', quantity: 2 },
        { id: 'Martes', label: 'Martes (1)', quantity: 1 }
    ];
    it('renders correctly', () => {
        const { container } = render(
            <DrawerRecetario summaryList={summarListMock} />
        );
        const drawer = container.querySelector('[data-id="drawer-recetario"]');
        expect(drawer).toBeInTheDocument();
    });
    it('should match snapshot', () => {
        const { container } = render(
            <DrawerRecetario summaryList={summarListMock} />
        );
        expect(container).toMatchSnapshot();
    });
});
