import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import BallLotteries from './BallLoteries';
import LabelText from './LabelText';
import ResultItem from './ResultItem';

const LotoPlus = ({ name, jackpot, date, results, isDetail, link }) => {
    const resultsTomap = results;
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
            {!isDetail && results && (
                <div className="extra-results --loto-plus">
                    {results.map(
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
    jackpot: PropTypes.arrayOf(PropTypes.string),
    isDetail: PropTypes.bool,
    link: PropTypes.string
};

LotoPlus.defaultProps = {
    results: [],
    name: '',
    date: '',
    isDetail: false,
    link: '',
    jackpot: []
};

export default LotoPlus;
