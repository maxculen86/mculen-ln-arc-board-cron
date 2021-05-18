import React from 'react';
import '../../../resources/dist/css/ln/base/grid.css';
import Text from './components/Text';

const KeepReading = props => {
    const { classCondition } = props;

    return (
        <section
            className={`grid-3-gap ${classCondition ? classCondition : ``}`}
        >
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

export default KeepReading;
