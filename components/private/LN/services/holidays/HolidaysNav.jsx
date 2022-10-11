import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const HolidaysNav = ({ year }) => {
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
                <li className="--font-bold --fivexs">
                    <Link
                        link={`
                            https://www.lanacion.com.ar/feriados/${year - 1}/
                        `}
                        title={`Ir a feriados ${`${year - 1}`}`}
                        textname={`${year - 1}`}
                    />
                </li>
                <li className="--font-bold --fivexs">{`${year}`}</li>
                <li className="--font-bold --fivexs">
                    <Link
                        link={`
                            https://www.lanacion.com.ar/feriados/${year + 1}/
                        `}
                        title={`Ir a feriados ${`${year + 1}`}`}
                        textname={`${year + 1}`}
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
