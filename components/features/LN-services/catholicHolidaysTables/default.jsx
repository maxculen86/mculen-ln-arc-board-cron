import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import Table from '../../../private/LN/nota/cuerpo/table';
import ModheaderSection from '../../../private/common/mod-headerSection';

const CatholicHolidaysTables = ({ id: _featureId }) => {
    const tables = get(useAppContext(), 'globalContent.dataService.tables', {});
    const unmovableHolidays = get(tables, 'Inamovible', {});
    const transferableHolidays = get(tables, 'Trasladable', {});
    const bridgeHolidays = get(tables, 'Puente', {});

    return (
        <>
            {!!Object.keys(unmovableHolidays).length && (
                <>
                    <ModheaderSection
                        tag="h2"
                        font="sueca"
                        title="Feriados inamovibles"
                        line
                    />
                    <Table data={unmovableHolidays} extraClass="--holidays" />
                </>
            )}
            {!!Object.keys(transferableHolidays).length && (
                <>
                    <ModheaderSection
                        tag="h2"
                        font="sueca"
                        title="Feriados transferibles"
                        line
                    />
                    <Table
                        data={transferableHolidays}
                        extraClass="--holidays"
                    />
                </>
            )}
            {!!Object.keys(bridgeHolidays).length && (
                <>
                    <ModheaderSection
                        tag="h2"
                        font="sueca"
                        title="Feriados puentes"
                        line
                    />
                    <Table data={bridgeHolidays} extraClass="--holidays" />
                </>
            )}
        </>
    );
};

CatholicHolidaysTables.label = 'LN Tablas Feriados Católicos';
CatholicHolidaysTables.lazy = true;
CatholicHolidaysTables.propTypes = {
    id: PropTypes.string.isRequired
};

export default CatholicHolidaysTables;
