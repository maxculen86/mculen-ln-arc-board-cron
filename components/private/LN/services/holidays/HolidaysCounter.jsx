/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-counter.css';
import Text from '../../../common/text';

const HolidaysCounter = ({
    nextHoliday = 10,
    month = 'Enero',
    remainingDays = 10,
    description = 'año nuevo',
    typeHoliday = 'puente'
}) => {
    const extraClass = {
        inamovibles: ' --immovable',
        puente: ' --bridge',
        trasladables: ' --transferable'
    };

    const dayCondition =
        remainingDays === 1
            ? `Falta ${remainingDays} día `
            : `Faltan ${remainingDays} días `;

    return (
        <div className="holidays-counter">
            <div className={`number-counter${extraClass[typeHoliday]}`}>
                <Text tag="h2" size="3xl" weight="bold" font="sueca">
                    {nextHoliday}
                </Text>
                <Text size="medium" weight="bold">
                    {month}
                </Text>
            </div>
            <div className="label-counter">
                <Text tag="h2" size="large">
                    <strong>{dayCondition}</strong>
                    para el próximo feriado
                </Text>
                <Text tag="span" size="small">
                    Feriado
                    {` ${description}`}
                </Text>
            </div>
        </div>
    );
};

HolidaysCounter.propTypes = {
    nextHoliday: PropTypes.number.isRequired,
    month: PropTypes.string.isRequired,
    remainingDays: PropTypes.number.isRequired,
    description: PropTypes.string,
    typeHoliday: PropTypes.shape({
        inamovibles: PropTypes.string,
        puente: PropTypes.string,
        trasladables: PropTypes.string
    })
};

export default HolidaysCounter;
