import React from 'react';
import { render, screen } from '@testing-library/react';
import LNMapaDelSitio from '../../../components/layouts/LN-mapa-del-sitio';

jest.mock('../../../components/private/common/com-logo', () => () => (
    <div>ComLogo Component</div>
));
jest.mock('../../../components/private/common/com-title', () => () => (
    <div>Title Component</div>
));
jest.mock('../../../components/private/common/utils/listSection', () => () => (
    <div>ListSection Component</div>
));
jest.mock(
    '../../../components/private/LN/common/footer/copyright',
    () => () => <div>Copyright Component</div>
);
jest.mock('../../../components/features/LN-10-global/pwaModal/default', () => ({
    PwaModal: () => <div>PwaModal Component</div>
}));

describe('Componentes- Layouts - LNMapaDelSitio', () => {
    describe('LNMapaDelSitio', () => {
        test('should render the component correctly with children', () => {
            render(<LNMapaDelSitio>Children</LNMapaDelSitio>);

            expect(screen.getByText('Copyright Component')).toBeInTheDocument();
            expect(screen.getByText('PwaModal Component')).toBeInTheDocument();
            expect(screen.getByText('ComLogo Component')).toBeInTheDocument();
        });
    });
});
