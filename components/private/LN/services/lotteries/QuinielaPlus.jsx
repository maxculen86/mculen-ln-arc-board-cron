import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';

const QuinielaPlus = ({ name, date, results, isDetail, link }) => {
    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result --quini-plus">
                {!isDetail && <LabelText text={results[0].name} />}
                <div
                    className={`box-result --grid-5-columns ${isDetail &&
                        '--quini-plus'}`}
                >
                    {(!isDetail ? results[0].result : results).map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size="large"
                        />
                    ))}
                </div>
            </div>
        </CardLayout>
    );
};

QuinielaPlus.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

QuinielaPlus.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: ''
};

export default QuinielaPlus;
