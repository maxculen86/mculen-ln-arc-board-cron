import React from 'react';
import ComIco from './icon';
import ComLink from './com-link';

const ComWeather = props => {
    const { iconName, sizeIcon, size, weatherPlace, temperature } = props;
    const hasData = Object.values(props).every(Boolean);

    return (
        <ComLink
            classCondition="--weather"
            dataEvent="LinkClick"
            dataSection="MenuLN"
            link="https://www.lanacion.com/clima/"
        >
            <div className="com-weather">
                {hasData && (
                    <>
                        <ComIco name={iconName} sizeIcon={sizeIcon} />
                        <span id="spanTemperatura" className={size}>
                            {`${temperature}°`}
                        </span>
                        <span id="spanPlace" className={size}>
                            {weatherPlace}
                        </span>
                    </>
                )}
            </div>
        </ComLink>
    );
};

export default ComWeather;
