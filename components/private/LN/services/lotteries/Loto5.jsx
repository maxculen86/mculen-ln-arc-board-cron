import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';

const Loto5 = ({ name, vacantPot, date, results, isDetail, link }) => {
    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result">
                <div className={`--loto-5 ${isDetail && 'detail'}`}>
                    {(!isDetail ? results[0].result : results).map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
                {!isDetail && vacantPot && (
                    <LabelText text={`Pozo vacante: ${vacantPot}`} />
                )}
            </div>
        </CardLayout>
    );
};

Loto5.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string,
                winners: PropTypes.string,
                amount: PropTypes.string
            }),
            PropTypes.string
        ])
    ),
    name: PropTypes.string,
    date: PropTypes.string,
    vacantPot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Loto5.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    vacantPot: ''
};

export default Loto5;
