import React from 'react';
import { cx } from '@ln/ds-cva';
import { Table } from '@ln/ds-common-table';
import stripHtml from '../../../../../private/common/utils/stripHtml';

function TableHeader({
    header = [],
    stickyFirstCol,
    align,
    className,
    columnWidths = []
}) {
    if (!header.length) return null;

    return (
        <Table.Head>
            <Table.Row>
                {header.map((head, headerIndex) => (
                    <Table.HeaderCell
                        // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                        // eslint-disable-next-line react/no-array-index-key
                        key={headerIndex}
                        aria-label={
                            stripHtml({ html: head?.content }) || 'Columna'
                        }
                        className={cx(
                            'bg-muted align-middle',
                            {
                                'sticky left-0 z-20 w-160 min-w-160':
                                    headerIndex === 0 && stickyFirstCol
                            },
                            className
                        )}
                        align={align}
                        colWidth={columnWidths[headerIndex]}
                    >
                        {head?.content}
                    </Table.HeaderCell>
                ))}
            </Table.Row>
        </Table.Head>
    );
}

export default TableHeader;
