import React from 'react';
import BallLotteries from '../BallLotteries';

function BallsResults({
    isDetail,
    hasJackpot,
    boxResultClass = '',
    result = [],
    results = [],
    firstResultJackpot = []
}) {
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
}

export default BallsResults;
