import React from 'react';
import BallLotteries from '../BallLotteries';

const ExtraResults = ({
    isQuiniela,
    hasJackpot,
    boxResultClass,
    isDetail,
    isQuini6,
    name,
    result,
    results
}) => {
    return (
        !isQuiniela &&
        !hasJackpot && (
            <div
                className={`${boxResultClass}${
                    isDetail && isQuini6 ? ' --detail' : ''
                }${name === 'Pozo extra' ? ' --extra-pot' : ''}`}
            >
                {(!isDetail ? result : results).map(number => (
                    <BallLotteries
                        key={number}
                        number={number}
                        size={isQuini6 && !isDetail ? 'small' : ''}
                    />
                ))}
            </div>
        )
    );
};

export default ExtraResults;
