import React from 'react';
import '../../../resources/dist/css/ln/base/grid.css';
import PropTypes from 'prop-types';
import Text from './components/Text';

const KeepReading = ({ classCondition }) => {
    return (
        <section className={`grid-3-gap ${classCondition}`}>
            <Text
                tag="h4"
                text="Seguí leyendo"
                font="suecas"
                size="l"
                weight="bold"
                extraClass="column-1-4"
            />
        </section>
    );
};

KeepReading.defaultProps = {
    classCondition: ''
};

KeepReading.propTypes = {
    classCondition: PropTypes.string
};

export default KeepReading;
