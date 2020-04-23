import React, { Children } from 'react';
import ComLink from './com-link';

const ModFirma = props => {
    const { autor, classCondition } = props;

    return (
        <div className="container-firma">
            <ComLink
                textname={autor}
                link="#"
                classCondition={classCondition}
            />
            <ComLink textname={autor} classCondition={classCondition} />
            <ComLink
                textname={autor}
                link="#"
                classCondition={classCondition}
            />
            <ComLink textname={autor} classCondition={classCondition} />
        </div>
    );
};

export default ModFirma;
