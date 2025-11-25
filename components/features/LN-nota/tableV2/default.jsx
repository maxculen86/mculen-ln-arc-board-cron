import React from 'react';
import PropTypes from 'prop-types';
import { cx } from '@ln/cva';
import TableHeader from './components/header';
import TableRow from './components/row';

function TableV2({ data = {}, classnames = {} }) {
    const { header = [], rows = [] } = data;

    if (!rows.length) return null;

    return (
        <div
            className={cx([
                'container-table',
                'overflow-x-auto',
                'contenidos-scrollbar scrollbar-4',
                'w-800_l max-w-100_l',
                'pb-12',
                'mb-32',
                classnames.container
            ])}
        >
            <table className="table-v2 p-0" cellPadding={0} cellSpacing={0}>
                <TableHeader header={header} />
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <TableRow
                            // TODO: Reemplazar con ID único desde el source, ARC no lo esta mandando en ._id (si no abrir ticket)
                            // eslint-disable-next-line react/no-array-index-key
                            key={rowIndex}
                            row={row}
                            rowIndex={rowIndex}
                            headerLength={header.length}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

TableV2.arcType = 'table';
TableV2.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        header: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
                type: PropTypes.string
            })
        ),
        rows: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.shape({
                    content: PropTypes.string,
                    type: PropTypes.string
                })
            )
        ).isRequired
    }).isRequired,
    classnames: PropTypes.shape({
        container: PropTypes.string,
        header: PropTypes.string,
        headerCell: PropTypes.string,
        body: PropTypes.string,
        bodyCell: PropTypes.string
    })
};

TableV2.defaultProps = {
    classnames: {}
};

export default TableV2;
