/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import setClassName from '../../../common/utils/setClassName';
import '../../../../../resources/dist/css/ln/components/table.css';

const Table = ({ data = {} }) => {
    const { header = [], rows = [], extraClass = '' } = data;

    if (!rows.length) return null;
    const classCondition = rows[0].length <= 2 ? '--two-columns' : '';
    const _className = setClassName({
        baseClass: 'table-wrapper',
        classCondition,
        className: extraClass
    });

    return (
        <div className={_className}>
            <table className="table">
                <thead>
                    <tr>
                        {header.map(head => (
                            <th key={head._id}>{head.content}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {row.map(column => (
                                <td key={column._id}>{column.content}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.arcType = 'table';
Table.propTypes = {
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
    }).isRequired
};

export default Table;
