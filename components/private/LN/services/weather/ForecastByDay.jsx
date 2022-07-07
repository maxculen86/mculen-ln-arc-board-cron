import React from 'react';
import PropTypes from 'prop-types';
// import get from '../../../common/utils/get';
import ForecastCard from './ForecastCard';
import { addHoursAndFormat } from '../../../common/utils/dateAndTimeUtil';
import { weekDays } from '../../../common/utils/transformISODate';

const ForecastByDay = ({ id, index, section, data }) => {
    const { morning, afternoon, night, date } = data;

    const getDate = (fecha, i) => {
        const weekDayName = weekDays[
            new Date(addHoursAndFormat(3, date)).getDay()
        ].toLowerCase();

        const dateFactory = {
            0: 'hoy',
            1: 'mañana',
            default: weekDayName ? `el ${weekDayName}` : ''
        };
        return dateFactory[i] || dateFactory.default;
    };

    const customSubtitle = `Pronóstico del tiempo en ${section} ${getDate(
        date,
        index
    )}`;

    return (
        <div style={{ padding: '10px' }}>
            <h2>{customSubtitle}</h2>
            {morning && <ForecastCard title="Mañana" data={morning} />}
            {afternoon && <ForecastCard title="Tarde" data={afternoon} />}
            {night && <ForecastCard title="Noche" data={night} />}
        </div>
    );
};

ForecastByDay.propTypes = {
    id: PropTypes.string,
    index: PropTypes.number.isRequired,
    data: PropTypes.shape({
        morning: PropTypes.shape(),
        afternoon: PropTypes.shape(),
        night: PropTypes.shape(),
        date: PropTypes.string
    }).isRequired,
    section: PropTypes.string.isRequired
};

ForecastByDay.defaultProps = {
    id: ''
};

export default ForecastByDay;
