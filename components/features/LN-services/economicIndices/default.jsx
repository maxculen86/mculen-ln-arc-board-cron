import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import { Text } from '@ln/contenidos-ui-text';
import { transformInternals } from '../../../../content/sources/utils/servicesSource/economicIndices/_helpers';
import TableV2 from '../../LN-nota/tableV2/default';
import get from '../../../private/common/utils/get';
import BuildRoof from '../../../chains/utils/_BuildRoof/default';
import Divider from '../../ui/ln/divider/default';
import { useRoofData } from '../../../chains/utils/_helpers';

function EconomicIndices(props) {
    const { customFields = {} } = props;
    const globalServiceItem = get(
        useAppContext(),
        'globalContent.serviceItem',
        ''
    );
    const serviceItem = globalServiceItem || customFields.serviceItem || '';
    const isHome = !globalServiceItem;
    const roofData = useRoofData({ title: customFields.title });

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
        <div className="index-table-container mb-32">
            <BuildRoof
                textProps={{
                    className: 'prumo text-24 --font-bold',
                    overrideDefaultClasses: true,
                    size: null
                }}
                {...roofData}
            />
            <TableV2
                data={tableData}
                stickyFirstCol
                isCentered
                withMargin={false}
                classnames={{
                    container: 'index-table',
                    row: 'index-table-row',
                    header: 'index-table-header'
                }}
            />
            <Text as="p" className="text-10 pt-12 pb-8">
                Actualización general del panel: {horaActualizacion} |{' '}
                {fechaActualizacion}
            </Text>
            <Divider />
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
        }),
        title: PropTypes.string.tag({
            label: 'Título del índice',
            defaultValue: 'Índice'
        })
    })
};

EconomicIndices.defaultProps = {
    customFields: {}
};

export default EconomicIndices;
