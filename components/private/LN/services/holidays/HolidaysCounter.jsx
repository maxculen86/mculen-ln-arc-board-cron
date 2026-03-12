/* eslint-disable react/require-default-props */
import React from 'react';
import '../../../../../resources/dist/css/ln/components/holidays-counter.css';
import Text from '../../../common/text';

function HolidaysCounter({
    nextHoliday,
    month,
    remainingDays,
    description,
    typeHoliday
}) {
    const extraClass = {
        Inamovible: ' --immovable',
        Puente: ' --bridge',
        Trasladable: ' --transferable'
    };
    const dayCondition =
        remainingDays === 1
            ? `Falta ${remainingDays} día `
            : `Faltan ${remainingDays} días `;
    return (
        <div className="holidays-counter">
            <div className={`number-counter${extraClass[typeHoliday]}`}>
                {nextHoliday && (
                    <Text size="3xl" weight="bold" font="prumo">
                        {nextHoliday}
                    </Text>
                )}
                {month && (
                    <Text size="medium" weight="bold">
                        {month}
                    </Text>
                )}
            </div>
            <div className="label-counter">
                {remainingDays && (
                    <Text tag="h2" size="large">
                        <strong>{dayCondition}</strong>
                        para el próximo feriado
                    </Text>
                )}
                {description && (
                    <Text tag="p" size="small">
                        Feriado
                        {` ${description}`}
                    </Text>
                )}
            </div>
        </div>
    );
}
export default HolidaysCounter;
