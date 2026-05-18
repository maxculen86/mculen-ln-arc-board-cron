import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import LNTable from '../../LN/common/table/default';
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
                <div data-tw style={{ display: 'contents' }}>
                    <LNTable
                        data={jewishTable}
                        align="center"
                        striped
                        classnames={{ table: 'w-full table-fixed' }}
                        className="mt-16 mb-32"
                    />
                </div>
            </>
        )
    );
}

JewishHolidaysTable.label = 'LN Tabla Feriados Judíos';

export default JewishHolidaysTable;
