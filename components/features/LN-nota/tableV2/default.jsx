import React from 'react';
import { cx } from '@ln/cva';
import TableHeader from './components/header';
import TableRow from './components/row';

function TableV2({
    data = {},
    classnames = {},
    stickyFirstCol = false,
    isCentered = false,
    withMargin = true
}) {
    const { header = [], rows = [] } = data;

    if (!rows.length) return null;

    return (
        <div
            className={cx([
                'container-table',
                'overflow-x-auto',
                'contenidos-scrollbar scrollbar-4',
                'pb-12',
                !stickyFirstCol && 'w-800_l max-w-100_l',
                withMargin && 'mb-32',
                classnames.container
            ])}
        >
            <table
                className="table-v2 p-0"
                cellPadding={0}
                cellSpacing={0}
                style={{ tableLayout: 'auto', width: '100%' }}
            >
                <TableHeader
                    stickyFirstCol={stickyFirstCol}
                    isCentered={isCentered}
                    header={header}
                    className={classnames.header}
                />
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                            // eslint-disable-next-line react/no-array-index-key
                            key={rowIndex}
                            row={row}
                            rowIndex={rowIndex}
                            headerLength={header.length}
                            stickyFirstCol={stickyFirstCol}
                            isCentered={isCentered}
                            className={classnames.row}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

TableV2.arcType = 'table';

export default TableV2;
