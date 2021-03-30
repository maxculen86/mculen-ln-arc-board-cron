import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComIco from './com-icon';
import ComLink from './com-link';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    return (
        <ComLink
            link="https://servicios.lanacion.com.ar/pronostico-del-tiempo"
            classCondition="--weather"
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
