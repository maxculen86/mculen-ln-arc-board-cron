import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { cx } from '@ln/ds-cva';
import { cellVariants } from '../styles';
import stripHtml from '../../../../private/common/utils/stripHtml';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';

function TableRow({
    row = [],
    rowIndex,
    headerLength,
    stickyFirstCol,
    isCentered,
    className
}) {
    return (
        <tr>
            {row.map((column, columnIndex) => (
                <td
                    className={cellVariants({
                        variant: 'body',
                        withBg: rowIndex % 2 !== 0,
                        withBorderLeft: columnIndex !== 0,
                        withBorderRight: columnIndex !== headerLength - 1,
                        isSticky: columnIndex === 0 && stickyFirstCol,
                        isCentered,
                        className
                    })}
                    // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${column._id}-${columnIndex}`}
                    aria-label={stripHtml({ html: column.content }) || 'Fila'}
                >
                    <div
                        className={cx(
                            Boolean(column.iconSprite) &&
                                'flex ai-center jc-center'
                        )}
                        style={column.color && { color: column.color }}
                    >
                        {column.iconSprite && (
                            <Icon size={column.iconSize || 20}>
                                <IconSprite
                                    name={column.iconSprite}
                                    fill={column.iconFill || 'currentColor'}
                                />
                            </Icon>
                        )}
                        <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                                __html: column.content
                            }}
                        />
                    </div>
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
