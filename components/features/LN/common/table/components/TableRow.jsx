import React from 'react';
import { cx } from '@ln/ds-cva';
import { Table } from '@ln/ds-common-table';
import stripHtml from '../../../../../private/common/utils/stripHtml';
import Icon from '../../../../ui/ln/icon/default';
import { cellVariants } from '../styles';

function TableRow({
    row = [],
    stickyFirstCol,
    align,
    className,
    striped,
    rowIndex
}) {
    const stickyBg =
        striped && rowIndex % 2 === 1 ? 'bg-neutral-50' : 'bg-white';

    return (
        <Table.Row className={cx({ 'even:bg-neutral-50': striped })}>
            {row.map((column, columnIndex) => (
                <Table.Cell
                    // eslint-disable-next-line react/no-array-index-key
                    key={columnIndex}
                    aria-label={stripHtml({ html: column.content }) || 'Fila'}
                    className={cellVariants({
                        isSticky: columnIndex === 0 && stickyFirstCol,
                        align,
                        className: cx(
                            className,
                            columnIndex === 0 && stickyFirstCol && stickyBg
                        )
                    })}
                    align={align}
                >
                    <div
                        className={cx(
                            Boolean(column.iconSprite) &&
                                'flex items-center justify-center'
                        )}
                        style={column.color && { color: column.color }}
                    >
                        {column.iconSprite && (
                            <Icon
                                size={column.iconSize || 20}
                                name={column.iconSprite}
                            />
                        )}
                        <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: column.content }}
                        />
                    </div>
                </Table.Cell>
            ))}
        </Table.Row>
    );
}

export default TableRow;
