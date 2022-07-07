import React from 'react';
import PropTypes from 'prop-types';
// import get from '../../../common/utils/get';
import ForecastCard from './ForecastCard';

const ForecastByDay = ({ id, data, section, index }) => {
    console.log(
        '🚀 ~ file: ForecastByDay.jsx ~ line 6 ~ ForecastByDay ~ data',
        data
    );
    const { morning, afternoon, night, date } = data;

    const getDate = (fecha, i) => {
        const dateFactory = {
            0: 'hoy',
            1: 'mañana',
            default: 'miercoles'
        };
        return dateFactory[i] || dateFactory.default;
    };

    return (
        <div style={{ padding: '10px' }}>
            <h2>{`Pronóstico del tiempo en ${section} el ${getDate(
                date,
                index
            )}`}</h2>
            {morning && <ForecastCard title="Mañana" data={morning} />}
            {afternoon && <ForecastCard title="Tarde" data={afternoon} />}
            {night && <ForecastCard title="Noche" data={night} />}
        </div>
    );
};

ForecastByDay.propTypes = {
    id: PropTypes.string,
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
