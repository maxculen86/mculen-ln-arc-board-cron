/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const HolidaysNav = ({ year, layout }) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const posteriorYear = currentYear + 1;

    const validateYear = valYear => {
        return year === valYear
            ? false
            : `https://www.lanacion.com.ar/feriados/${valYear}/`;
    };

    const extraClass = {
        home: ' --home',
        month: ' --month'
    };

    return (
        <div className={`holidays-nav${extraClass[layout]}`}>
            <div className="sampler">
                <Text tag="p" size="4xs">
                    Feriados inamovibles
                </Text>
                <Text tag="p" size="4xs">
                    Feriados puente
                </Text>
                <Text tag="p" size="4xs">
                    Feriados trasladables
                </Text>
            </div>
            <ol className="year">
                <li
                    className={`--font-bold --fivexs${
                        !validateYear(previousYear) ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={validateYear(previousYear)}
                        title={`Ir a feriados ${`${previousYear}`}`}
                        textname={`${previousYear}`}
                    />
                </li>
                <li
                    className={`--font-bold --fivexs${
                        !validateYear(currentYear) ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={validateYear(currentYear)}
                        title={`Ir a feriados ${currentYear}`}
                        textname={`${currentYear}`}
                    />
                </li>
                <li
                    className={`--font-bold --fivexs${
                        !validateYear(posteriorYear) ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={validateYear(posteriorYear)}
                        title={`Ir a feriados ${`${posteriorYear}`}`}
                        textname={`${posteriorYear}`}
                    />
                </li>
            </ol>
        </div>
    );
};

HolidaysNav.propTypes = {
    year: PropTypes.number.isRequired,
    layout: PropTypes.oneOf(['home', 'month'])
};

export default HolidaysNav;
