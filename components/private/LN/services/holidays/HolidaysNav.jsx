/* eslint-disable react/require-default-props */
import React from 'react';
import '../../../../../resources/dist/css/ln/components/holidays-nav.css';
import Link from '../../../common/com-link';
import Text from '../../../common/text';
import { getArgentinaYear } from '../../../common/utils/dateAndTimeUtil';

function HolidaysNav({ year, layout }) {
    const currentYear = Number(getArgentinaYear());
    const previousYear = currentYear - 1;
    const posteriorYear = currentYear + 1;

    const validateYear = valYear =>
        year === valYear ? '' : `/feriados/${valYear}/`;

    const extraClass = {
        home: '--home',
        month: '--month'
    };

    const isActivePrevious = validateYear(previousYear) ? '' : ' --active';
    const isActiveCurrent = validateYear(currentYear) ? '' : ' --active';
    const isActivePosterior = validateYear(posteriorYear) ? '' : ' --active';

    return (
        <div className={`holidays-nav ${extraClass[layout]}`}>
            <div className="sampler">
                <Text tag="p" size="4xs">
                    Feriados inamovibles
                </Text>
                <Text tag="p" size="4xs">
                    Días no laborables
                </Text>
                <Text tag="p" size="4xs">
                    Feriados trasladables
                </Text>
            </div>
            <ol className="year">
                <li className={`--font-bold --fivexs${isActivePrevious}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        link={validateYear(previousYear)}
                        title={`Ir a feriados ${previousYear}`}
                        textname={previousYear}
                    />
                </li>
                <li className={`--font-bold --fivexs${isActiveCurrent}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        link={validateYear(currentYear)}
                        title={`Ir a feriados ${currentYear}`}
                        textname={currentYear}
                    />
                </li>
                <li className={`--font-bold --fivexs${isActivePosterior}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link
                        link={validateYear(posteriorYear)}
                        title={`Ir a feriados ${posteriorYear}`}
                        textname={posteriorYear}
                    />
                </li>
            </ol>
        </div>
    );
}

export default HolidaysNav;
