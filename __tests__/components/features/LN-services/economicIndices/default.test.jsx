import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Context from 'fusion:context';
import Content from 'fusion:content';

jest.mock('fusion:consumer', Component => {
    return function (Component) {
        return props => <Component {...props} />;
    };
});

import EconomicIndices from '../../../../../components/features/LN-services/economicIndices/default';

jest.mock('fusion:context', () => ({
    useAppContext: jest.fn()
}));

jest.mock('fusion:content', () => ({
    useContent: jest.fn()
}));

jest.mock(
    '../../../../../components/features/LN-nota/tableV2/default',
    () =>
        function MockTableV2({ data }) {
            return (
                <div data-testid="table-v2">
                    <span>{JSON.stringify(data)}</span>
                </div>
            );
        }
);

const mockTableData = {
    tableType: 'merval',
    fecha_actualizacion: '25-02-2026',
    hora_actualizacion: '10:30:05',
    cotizaciones: [
        {
            ticket: 'GGAL',
            var_diaria: '1.5',
            var_semanal: '2.3',
            cotizacion_actual: '150.00'
        }
    ]
};

describe('Components - features - LN-services - EconomicIndices - default', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should render null when tableData is null', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { serviceItem: 'merval' }
        });
        Content.useContent.mockReturnValue(null);

        const { container } = render(<EconomicIndices />);

        expect(container.firstChild).toBeNull();
    });

    it('Should render correctly with data', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { serviceItem: 'merval' }
        });
        Content.useContent.mockReturnValue(mockTableData);

        const { container } = render(<EconomicIndices />);

        expect(
            container.querySelector('.index-table-container')
        ).toBeInTheDocument();
        expect(container).toHaveTextContent('Actualización general del panel');
    });

    it('Should render roof and table data without brittle snapshot assertions', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: { serviceItem: 'merval' }
        });
        Content.useContent.mockReturnValue(mockTableData);

        const { container } = render(<EconomicIndices />);

        expect(
            container.querySelector('[roof-container="roof-container"]')
        ).toBeInTheDocument();
        expect(
            container.querySelector('[roof-group="left"]')
        ).toBeInTheDocument();
        expect(
            container.querySelector('[data-testid="table-v2"]')
        ).toHaveTextContent('"tableType":"merval"');
        expect(container).toHaveTextContent('Actualización general del panel');
    });

    it('Should use customFields.serviceItem when globalContent.serviceItem is empty', () => {
        Context.useAppContext.mockReturnValue({
            globalContent: {}
        });
        Content.useContent.mockReturnValue(mockTableData);

        render(<EconomicIndices customFields={{ serviceItem: 'bonos' }} />);

        expect(Content.useContent).toHaveBeenCalledWith(
            expect.objectContaining({
                query: {
                    service: 'economia',
                    serviceItem: 'bonos'
                }
            })
        );
    });
});
