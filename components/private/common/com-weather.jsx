import React from 'react';
import ComIco from './icon';
import ComLink from './com-link';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    return (
        <ComLink
            classCondition="--weather"
            dataEvent="LinkClick"
            dataSection="MenuLN"
            link="https://www.lanacion.com/clima/"
        >
            <div className="com-weather">
                {iconName ? (
                    <ComIco name={iconName} sizeIcon={sizeIcon} />
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
