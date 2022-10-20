import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const HolidaysNav = ({ year }) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const posteriorYear = currentYear + 1;

    const validateYear = valYear => {
        return year === valYear
            ? false
            : `https://www.lanacion.com.ar/feriados/${valYear}/`;
    };
    return (
        <div className="holidays-nav">
            <div className="sampler">
                <Text size="4xs">Feriados inamovibles</Text>
                <Text size="4xs">Feriados puente</Text>
                <Text size="4xs">Feriados trasladables</Text>
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
    year: PropTypes.number.isRequired
};

export default HolidaysNav;
