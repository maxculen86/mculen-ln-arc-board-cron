import PropTypes from 'prop-types';
import React from 'react';
import { cellVariants } from '../styles';
import stripHtml from '../../../../private/common/utils/stripHtml';

function TableRow({ row = [], rowIndex, headerLength }) {
    return (
        <tr>
            {row.map((column, columnIndex) => (
                <td
                    className={cellVariants(
                        {
                            variant: 'body',
                            withBg: rowIndex % 2 !== 0,
                            withBorderLeft: columnIndex !== 0,
                            withBorderRight: columnIndex !== headerLength - 1
                        },
                        'vertical-align-top'
                    )}
                    // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${column._id}-${columnIndex}`}
                    aria-label={stripHtml({ html: column.content }) || 'Fila'}
                >
                    <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                            __html: column.content
                        }}
                    />
                </td>
            ))}
        </tr>
    );
}

TableRow.propTypes = {
    row: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            content: PropTypes.string,
            type: PropTypes.string
        })
    ),
    rowIndex: PropTypes.number.isRequired,
    headerLength: PropTypes.number.isRequired
};

TableRow.defaultProps = {
    row: []
};

export default TableRow;
