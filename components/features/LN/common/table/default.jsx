import React, { useId } from 'react';
import { cx } from '@ln/ds-cva';
import { Table as TableLib } from '@ln/ds-common-table';
import TableHeader from './components/TableHeader';
import TableRow from './components/TableRow';

function Table({
    data = {},
    classnames = {},
    stickyFirstCol = false,
    maxWidth = false,
    striped,
    align = 'left',
    className,
    captionProps = {},
    columnWidths = []
}) {
    const { header = [], rows = [] } = data || {};

    const {
        content = '',
        align: captionAlign,
        className: captionClassName,
        ...restCaptionProps
    } = captionProps || {};

    const {
        container: containerClassName,
        header: headerClassName,
        row: rowClassName,
        table: tableClassName
    } = classnames;

    const captionAlignClass = cx(
        captionAlign === 'start' && 'text-start',
        captionAlign === 'center' && 'text-center',
        captionAlign === 'end' && 'text-end'
    );

    const captionId = useId();

    if (!rows.length) return null;

    return (
        <div
            className={cx(
                maxWidth && 'lg:w-800 lg:max-w-full',
                containerClassName,
                className
            )}
        >
            <div
                className="overflow-x-auto pb-12"
                data-testid="table-container"
            >
                <TableLib
                    striped={striped}
                    aria-describedby={content ? captionId : undefined}
                    className={tableClassName}
                >
                    <TableHeader
                        header={header}
                        stickyFirstCol={stickyFirstCol}
                        align={align}
                        className={headerClassName}
                        columnWidths={columnWidths}
                    />
                    <TableLib.Body>
                        {rows.map((row, rowIndex) => (
                            <TableRow
                                // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                                // eslint-disable-next-line react/no-array-index-key
                                key={rowIndex}
                                row={row}
                                rowIndex={rowIndex}
                                align={align}
                                stickyFirstCol={stickyFirstCol}
                                className={rowClassName}
                                striped={striped}
                            />
                        ))}
                    </TableLib.Body>
                </TableLib>
            </div>
            {content && (
                <div
                    id={captionId}
                    className={cx(captionAlignClass, captionClassName)}
                    {...restCaptionProps}
                >
                    {content}
                </div>
            )}
        </div>
    );
}

export default Table;
