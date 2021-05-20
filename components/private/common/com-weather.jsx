import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComIco from './com-icon';
import ComLink from './com-link';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    return (
        <ComLink
            classCondition="--weather"
            dataEvent="LinkClick"
            dataSection="MenuLN"
            link="https://servicios.lanacion.com.ar/pronostico-del-tiempo"
        >
            <div className="com-weather">
                {iconName ? (
                    <ComIco iconName={iconName} sizeIcon={sizeIcon} />
                ) : null}
                <span id="spanTemperatura" className={size}>
                    {temperature ? `${temperature}°` : '0°'}
                </span>
                <span id="spanPlace" className={size}>
                    {weatherPlace ? weatherPlace : 'Capital Federal'}
                </span>
            </div>
        </ComLink>
    );
};

export default ComWeather;
