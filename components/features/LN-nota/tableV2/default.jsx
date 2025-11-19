/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import { cx } from '@ln/cva';
import PropTypes from 'prop-types';
import React from 'react';
import { cellVariants } from './styles';

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
                <thead>
                    <tr>
                        {header.map((head, index) => (
                            <th
                                className={cellVariants(
                                    {
                                        variant: 'header',
                                        withBorderLeft: index !== 0,
                                        withBorderRight:
                                            index !== header.length - 1
                                    },
                                    'vertical-align-top'
                                )}
                                key={
                                    head._id !== ''
                                        ? head._id
                                        : `header-cell-${index}`
                                }
                            >
                                {head.content}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((column, columnIndex) => (
                                <td
                                    className={cellVariants(
                                        {
                                            variant: 'body',
                                            withBg: rowIndex % 2 !== 0,
                                            withBorderLeft: columnIndex !== 0,
                                            withBorderRight:
                                                columnIndex !==
                                                header.length - 1
                                        },
                                        'vertical-align-top'
                                    )}
                                    key={
                                        column._id !== ''
                                            ? column._id
                                            : `body-cell-${columnIndex}`
                                    }
                                    aria-label={
                                        column.content?.replace(
                                            /<[^>]*>/g,
                                            ''
                                        ) || 'Vacío'
                                    }
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

export default TableV2;
