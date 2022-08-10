/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ComIco from './icon';
import ComLink from './com-link';
import useVisibility from './hooks/useVisibility';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    const visibility = useVisibility(props);

    return (
        <ComLink
            classCondition="--weather"
            dataEvent="LinkClick"
            dataSection="MenuLN"
            link="https://servicios.lanacion.com.ar/pronostico-del-tiempo"
            style={{ visibility }}
        >
            <div className="com-weather">
                <ComIco name={iconName} sizeIcon={sizeIcon} />
                <span id="spanTemperatura" className={size}>
                    {`${temperature}°`}
                </span>
                <span id="spanPlace" className={size}>
                    {weatherPlace}
                </span>
            </div>
        </ComLink>
    );
};

ComWeather.propTypes = {
    iconName: PropTypes.string,
    sizeIcon: PropTypes.string,
    size: PropTypes.string,
    weatherPlace: PropTypes.string,
    temperature: PropTypes.string
};

export default ComWeather;
