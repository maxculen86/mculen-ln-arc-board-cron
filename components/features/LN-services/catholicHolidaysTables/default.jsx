import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import LNTable from '../../LN/common/table/default';
import ModheaderSection from '../../../private/common/mod-headerSection';

const THREE_COLS = ['29%', '23%', '48%'];

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
                    <div data-tw style={{ display: 'contents' }}>
                        <LNTable
                            data={unmovableHolidays}
                            align="center"
                            striped
                            columnWidths={THREE_COLS}
                            classnames={{ table: 'w-full table-fixed' }}
                            className="mt-16 mb-32"
                        />
                    </div>
                </>
            )}
            {!!Object.keys(transferableHolidays).length && (
                <>
                    <ModheaderSection
                        tag="h2"
                        title="Feriados trasladables"
                        line
                    />
                    <div data-tw style={{ display: 'contents' }}>
                        <LNTable
                            data={transferableHolidays}
                            align="center"
                            striped
                            columnWidths={THREE_COLS}
                            classnames={{ table: 'w-full table-fixed' }}
                            className="mt-16 mb-32"
                        />
                    </div>
                </>
            )}
            {!!Object.keys(bridgeHolidays).length && (
                <>
                    <ModheaderSection
                        tag="h2"
                        title="Días no laborables"
                        line
                    />
                    <div data-tw style={{ display: 'contents' }}>
                        <LNTable
                            data={bridgeHolidays}
                            align="center"
                            striped
                            classnames={{ table: 'w-full table-fixed' }}
                            className="mt-16 mb-32"
                        />
                    </div>
                </>
            )}
        </>
    );
}

CatholicHolidaysTables.label = 'LN Tablas Feriados Católicos';

export default CatholicHolidaysTables;
