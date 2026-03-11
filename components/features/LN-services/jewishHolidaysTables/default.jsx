import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import Table from '../../../private/LN/nota/cuerpo/table';
import ModheaderSection from '../../../private/common/mod-headerSection';

function JewishHolidaysTable() {
    const jewishTable = get(
        useAppContext(),
        'globalContent.dataService.tables.Judio',
        {}
    );

    return (
        !!Object.keys(jewishTable).length && (
            <>
                <ModheaderSection tag="h2" title="Feriados judíos" line />
                <Table data={jewishTable} extraClass="--holidays" />
            </>
        )
    );
}

JewishHolidaysTable.label = 'LN Tabla Feriados Judíos';

export default JewishHolidaysTable;
