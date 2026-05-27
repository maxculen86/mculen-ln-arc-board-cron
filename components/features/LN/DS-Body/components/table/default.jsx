import React from 'react';
import LNTable from '../../../common/table/default';
import { WrapperBody } from '../../../common/wrapperBody/default';

function Table({ data = {} }) {
    return (
        <WrapperBody className="mb-32">
            <LNTable data={data} striped maxWidth />
        </WrapperBody>
    );
}

Table.arcType = 'table';

export default Table;
