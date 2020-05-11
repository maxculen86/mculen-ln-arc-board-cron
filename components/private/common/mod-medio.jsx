import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComLink from './com-link';

const ModMedio = props => {
    const { medio, classCondition } = props;

    return (
        <div className="container-medio">
            <ComLink textname={medio} classCondition={classCondition} />
        </div>
    );
};

ModMedio.propTypes = {
    medio: PropTypes.string.isRequired,
    classCondition: PropTypes.string.isRequired
};

export default ModMedio;
