import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import { transformInternals } from '../../../../content/sources/utils/servicesSource/economicIndices/_helpers';
import TableV2 from '../../LN-nota/tableV2/default';
import get from '../../../private/common/utils/get';

function EconomicIndices(props) {
    const { customFields = {} } = props;
    const globalServiceItem = get(
        useAppContext(),
        'globalContent.serviceItem',
        ''
    );
    const serviceItem = globalServiceItem || customFields.serviceItem || '';
    const isHome = !globalServiceItem;

    const tableData = useContent({
        source: 'servicesSource',
        query: {
            service: 'economia',
            serviceItem
        },
        transform: response => {
            const { dataService } = response || {};
            return dataService ? transformInternals(dataService, isHome) : null;
        }
    });

    if (!tableData) {
        return null;
    }

    const {
        fecha_actualizacion: fechaActualizacion,
        hora_actualizacion: horaActualizacion
    } = tableData;

    return (
        <div className="economic-indices">
            <div className="economic-indices__header mb-16">
                <span className="font-secondary text-sm text-light-500">
                    Actualizado: {fechaActualizacion} {horaActualizacion}
                </span>
            </div>
            <TableV2 data={tableData} />
        </div>
    );
}

EconomicIndices.label = 'LN Indices Economicos';

EconomicIndices.propTypes = {
    customFields: PropTypes.shape({
        serviceItem: PropTypes.oneOf([
            'merval',
            'etf',
            'bonos',
            'adrs',
            'cedears',
            'riesgo-pais'
        ]).tag({
            label: 'Tipo de índice',
            defaultValue: ''
        })
    })
};

EconomicIndices.defaultProps = {
    customFields: {}
};

export default EconomicIndices;
