import React from 'react';
import LNTable from '../../../../LN/common/table/default';

function Table({ data = {} }) {
    return (
        <div data-tw style={{ display: 'contents' }}>
            <LNTable data={data} striped maxWidth />
        </div>
    );
}
Table.arcType = 'table';

export default Table;
