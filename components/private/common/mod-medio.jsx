import React, { Children } from 'react';
import ComLink from './com-link';

const ModMedio = props => {
    const { medio, classCondition } = props;

    return (
        <div className="container-medio">
            <ComLink textname={medio} classCondition={classCondition} />
        </div>
    );
};

export default ModMedio;
