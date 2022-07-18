import React from 'react';
import PropTypes from 'prop-types';
import BallLotteries from '../BallLotteries';

const BallsResults = ({
    isDetail,
    hasJackpot,
    boxResultClass,
    result,
    results,
    firstResultJackpot
}) => {
    return (
        <>
            {isDetail && hasJackpot && (
                <div
                    className={`${boxResultClass}${isDetail ? '-detail' : ''}`}
                >
                    {(!isDetail ? result : results).map(number => (
                        <BallLotteries key={number} number={number} />
                    ))}
                </div>
            )}
            {!isDetail && hasJackpot && (
                <div className="traditional">
                    <div className={boxResultClass}>
                        {(!isDetail ? result : results).map(number => (
                            <BallLotteries key={number} number={number} />
                        ))}
                    </div>
                    <div className="jackpot-result">
                        {firstResultJackpot.map(number => (
                            <BallLotteries
                                key={number}
                                number={number}
                                color="blue"
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

BallsResults.propTypes = {
    isDetail: PropTypes.bool,
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    firstResultJackpot: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    hasJackpot: PropTypes.bool,
    boxResultClass: PropTypes.string,
    result: PropTypes.arrayOf(PropTypes.string)
};
BallsResults.defaultProps = {
    isDetail: false,
    results: [],
    firstResultJackpot: [],
    hasJackpot: false,
    boxResultClass: '',
    result: []
};

export default BallsResults;
