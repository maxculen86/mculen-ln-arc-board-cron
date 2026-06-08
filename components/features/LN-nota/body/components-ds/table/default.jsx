import React from 'react';
import LNTable from '../../../../LN/common/table/default';

function Table({ data = {} }) {
    return (
        <div data-tw style={{ display: 'contents' }}>
            <LNTable data={data} striped maxWidth className="mb-32" />
        </div>
    );
}
Table.arcType = 'table';

export default Table;
