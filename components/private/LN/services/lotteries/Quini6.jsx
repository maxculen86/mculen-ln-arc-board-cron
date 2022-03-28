import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import { setTraditionFirst } from './utils';

const Quini6 = ({ name, estimatedPot, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = resultsTomap.slice(1, 5);
    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result --quini-6">
                {!isDetail && <LabelText text={resultsTomap[0].name} />}
                <div
                    className={
                        isDetail
                            ? 'box-result --quini-6-detail'
                            : 'box-result --quini-6'
                    }
                >
                    {resultsTomap[0].result.map(number => (
                        <BallLotteries
                            key={number}
                            number={number}
                            size={isDetail ? 'large' : 'small'}
                        />
                    ))}
                </div>
            </div>
            {!isDetail && (
                <div className="extra-results">
                    {arrResults.map(({ name: resultName, result }) => (
                        <ResultItem
                            key={resultName}
                            text={resultName}
                            result={result}
                        />
                    ))}
                </div>
            )}
        </CardLayout>
    );
};

Quini6.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    estimatedPot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

Quini6.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    estimatedPot: ''
};

export default Quini6;
