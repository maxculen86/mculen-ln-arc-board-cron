import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import {
    setTraditionFirst,
    hasTraditionalResult,
    reorderQuini6
} from './utils';

const Quini6 = ({ name, estimatedPot, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = reorderQuini6(resultsTomap.slice(1, 5));
    if (hasTraditionalResult(isDetail, resultsTomap)) return <></>;

    const extraPotClass = name === 'Pozo extra' && 'quini-6-extra-pot';

    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result --quini-6">
                {!isDetail && <LabelText text={resultsTomap[0].name} />}
                <div
                    className={
                        isDetail
                            ? `box-result --quini-6-detail  ${extraPotClass}`
                            : 'box-result --quini-6'
                    }
                >
                    {(!isDetail ? resultsTomap[0].result : results).map(
                        number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                size={isDetail ? 'large' : 'small'}
                            />
                        )
                    )}
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
