import React from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';

const HolidaysNav = ({ year }) => {
    return (
        <div className="holidaysNav">
            <div className="sampler">
                <Text tag="p" weight="regular" size="4xs" font="arial">
                    Feriados inamovibles
                </Text>
                <Text tag="p" weight="regular" size="4xs" font="arial">
                    Feriados puente
                </Text>
                <Text tag="p" weight="regular" size="4xs" font="arial">
                    Feriados trasladables
                </Text>
            </div>
            <div className="year">
                <Text tag="p" weight="bold" size="5xs" font="arial">
                    <Link
                        link={`
                            https://www.lanacion.com.ar/feriados/${year - 1}/
                        `}
                        title={`Ir a feriados ${`${year - 1}`}`}
                        textname={`${year - 1}`}
                    />
                </Text>
                <Text tag="p" weight="bold" size="5xs" font="arial">
                    {`${year}`}
                </Text>
                <Text tag="p" weight="bold" size="5xs" font="arial">
                    <Link
                        link={`
                            https://www.lanacion.com.ar/feriados/${year + 1}/
                        `}
                        title={`Ir a feriados ${`${year + 1}`}`}
                        textname={`${year + 1}`}
                    />
                </Text>
            </div>
        </div>
    );
};

HolidaysNav.propTypes = {
    year: PropTypes.number.isRequired
};

export default HolidaysNav;
