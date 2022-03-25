import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';
import { setTraditionFirst } from './utils';

const LotoPlus = ({ name, jackpot, date, results, isDetail, link }) => {
    const resultsTomap = setTraditionFirst(results);
    const arrResults = resultsTomap.slice(1, 5);

    return (
        <CardLayout title={name} subtitle={date} link={!isDetail && link}>
            <div className="main-result --loto-plus">
                {!isDetail && <LabelText text={resultsTomap[0].name} />}
                <div className="traditional --loto-plus">
                    <div className="box-result --loto-plus">
                        {(!isDetail ? resultsTomap[0].result : results).map(
                            number => (
                                <BallLotteries
                                    key={number}
                                    number={number}
                                    size="large"
                                />
                            )
                        )}
                    </div>
                    {!isDetail && (
                        <div className="jackpot-result">
                            {resultsTomap[0].jackpot.map(number => (
                                <BallLotteries
                                    key={number}
                                    number={number}
                                    size="large"
                                    color="blue"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {!isDetail && arrResults && (
                <div className="extra-results --loto-plus">
                    {arrResults.map(
                        ({
                            name: subLottery,
                            result,
                            jackpot: subLotteryJackpot
                        }) => (
                            <ResultItem
                                key={subLottery}
                                text={subLottery}
                                result={[...result, ...subLotteryJackpot]}
                            />
                        )
                    )}
                </div>
            )}
            {isDetail && jackpot && (
                <div className="extra-results --jackpot-details">
                    <LabelText
                        text="Jackpot"
                        className="jackpot-text-details"
                    />
                    <div className="jackpot-result-details">
                        {jackpot.map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                size="large"
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            )}
        </CardLayout>
    );
};

LotoPlus.propTypes = {
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    jackpot: PropTypes.string,
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

LotoPlus.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    jackpot: ''
};

export default LotoPlus;
