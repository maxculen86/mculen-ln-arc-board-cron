import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';

import '../../../../../resources/dist/css/ln/components/lotteries.css';

const Loto5 = ({ name, estimatedPot, date, results, isDetail, link }) => {
    return (
        <CardLayout
            title={name}
            subtitle={date}
            link={!isDetail && link}
            linkTitle={name}
        >
            <div className="main-result">
                <div className={`--loto-5 ${isDetail && 'detail'}`}>
                    {results[0].result.map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
                {!isDetail && (
                    <LabelText text={`Pozo vacante: ${estimatedPot}`} />
                )}
            </div>
        </CardLayout>
    );
};

Loto5.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    estimatedPot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Loto5.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    estimatedPot: ''
};

export default Loto5;
