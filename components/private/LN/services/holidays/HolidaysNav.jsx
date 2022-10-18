import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const HolidaysNav = ({ year }) => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const posteriorYear = currentYear + 1;
    return (
        <div className="holidaysNav">
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
                        year === previousYear ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={
                            year === previousYear
                                ? false
                                : `https://www.lanacion.com.ar/feriados/${previousYear}/`
                        }
                        title={`Ir a feriados ${`${previousYear}`}`}
                        textname={`${previousYear}`}
                    />
                </li>
                <li
                    className={`--font-bold --fivexs${
                        year === currentYear ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={
                            year === currentYear
                                ? false
                                : `https://www.lanacion.com.ar/feriados/${currentYear}/`
                        }
                        title={`Ir a feriados ${currentYear}`}
                        textname={`${currentYear}`}
                    />
                </li>
                <li
                    className={`--font-bold --fivexs${
                        year === posteriorYear ? ' --active' : ''
                    }`}
                >
                    <Link
                        link={
                            year === posteriorYear
                                ? false
                                : `https://www.lanacion.com.ar/feriados/${posteriorYear}/`
                        }
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
