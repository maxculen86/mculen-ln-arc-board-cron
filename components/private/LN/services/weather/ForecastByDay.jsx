import React from 'react';
import PropTypes from 'prop-types';
import ForecastCard from './ForecastCard';
import { addHoursAndFormat } from '../../../common/utils/dateAndTimeUtil';
import { weekDays } from '../../../common/utils/transformISODate';
import Text from '../../../common/text';

const ForecastByDay = ({ _id, index, section, data } = {}) => {
    if ([index, section, data].some(e => e === undefined)) return null;

    const { morning, afternoon, night, date } = data;

    const getDate = (fecha, i) => {
        const weekDayName = weekDays[
            new Date(addHoursAndFormat(3, fecha)).getDay()
        ].toLowerCase();

        const dateFactory = {
            0: 'hoy',
            1: 'mañana',
            default: weekDayName ? `el ${weekDayName}` : ''
        };
        return dateFactory[i] || dateFactory.default;
    };

    return (
        <div className="extend-forecast">
            <Text font="sueca" tag="h2" size="--l">
                Pronóstico del tiempo en
                <strong>{` ${section} ${getDate(date, index)}`}</strong>
            </Text>
            <div className="content-forecast">
                {morning && <ForecastCard title="Mañana" data={morning} />}
                {afternoon && <ForecastCard title="Tarde" data={afternoon} />}
                {night && <ForecastCard title="Noche" data={night} />}
            </div>
        </div>
    );
};

ForecastByDay.propTypes = {
    _id: PropTypes.string,
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
    _id: ''
};

export default ForecastByDay;
