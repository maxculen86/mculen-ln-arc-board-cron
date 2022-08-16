/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import ComIco from './icon';
import ComLink from './com-link';
import setVisibility from './utils/setVisibility';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    const visibility = setVisibility(props);

    return (
        <ComLink
            classCondition="--weather"
            dataEvent="LinkClick"
            dataSection="MenuLN"
            link="https://www.lanacion.com/clima/"
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
