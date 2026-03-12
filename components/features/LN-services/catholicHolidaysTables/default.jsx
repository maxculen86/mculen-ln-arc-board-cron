import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import Table from '../../../private/LN/nota/cuerpo/table';
import ModheaderSection from '../../../private/common/mod-headerSection';

function CatholicHolidaysTables() {
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
                        title="Feriados trasladables"
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
                        title="Días no laborables"
                        line
                    />
                    <Table data={bridgeHolidays} extraClass="--holidays" />
                </>
            )}
        </>
    );
}

CatholicHolidaysTables.label = 'LN Tablas Feriados Católicos';

export default CatholicHolidaysTables;
