/* eslint-disable react/no-array-index-key */
import React from 'react';
import setClassName from '../../../common/utils/setClassName';
import '../../../../../resources/dist/css/ln/components/table.css';

function Table({ data = {}, extraClass = '' }) {
    const { header = [], rows = [] } = data;

    if (!rows.length) return null;
    const classCondition = rows[0].length <= 2 ? '--two-columns' : '';
    const _className = setClassName({
        baseClass: 'table-wrapper',
        classCondition,
        className: extraClass
    });

    return (
        <div className={_className} data-testid="table-container">
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
}

Table.arcType = 'table';

export default Table;
